import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from "resend"
import { render } from "@react-email/render"
import { z } from "zod"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"
import WelcomeEmail from "@/emails/WelcomeEmail"

const apiKey = process.env.RESEND_API_KEY
const segmentAudienceId = process.env.RESEND_SEGMENT_AUDIENCE_ID
const topicsID = process.env.RESEND_TOPICS_ID
const upstashRedisUrl = process.env.UPSTASH_REDIS_REST_URL
const upstashRedisToken = process.env.UPSTASH_REDIS_REST_TOKEN

const resend = new Resend(apiKey)

const rateLimitStore =
  upstashRedisUrl && upstashRedisToken
    ? new Redis({ url: upstashRedisUrl, token: upstashRedisToken })
    : null

const rateLimiter = rateLimitStore
  ? new Ratelimit({
      redis: rateLimitStore,
      limiter: Ratelimit.slidingWindow(5, "1 m"),
      prefix: "green-impact:newsletter",
    })
  : null

const SubscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email())
    .transform((value) => value.toLowerCase()),
})

function buildContactPayload(email: string) {
  return {
    email,
    unsubscribed: false,
    ...(segmentAudienceId ? { audienceId: segmentAudienceId } : {}),
  }
}

function getClientIp(req: VercelRequest) {
  const forwardedFor = req.headers["x-forwarded-for"]
  if (forwardedFor) {
    return Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor.split(",")[0]?.trim() || "unknown"
  }
  return (req.headers["x-real-ip"] as string)?.trim() || "unknown"
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!apiKey) {
    console.error("Newsletter Error: RESEND_API_KEY is missing");
    return res.status(500).json({ error: "Newsletter service configuration missing" })
  }

  const body = req.body;
  const parsedBody = SubscribeSchema.safeParse(body)

  if (!parsedBody.success) {
    return res.status(400).json({ error: "Invalid email address" })
  }

  const { email } = parsedBody.data
  const clientIp = getClientIp(req)

  try {
    if (rateLimiter) {
      const rateLimitResult = await rateLimiter.limit(clientIp)
      if (!rateLimitResult.success) {
        return res.status(429).json({
          error: "Too many subscription attempts. Please try again later.",
        })
      }
    }

    // 1. Manage Contact in Resend
    try {
      const existingContact = await resend.contacts.get({ email });
      
      if (existingContact.data && existingContact.data.unsubscribed === false) {
        return res.status(200).json({ success: true, alreadySubscribed: true });
      }

      if (existingContact.data) {
        await resend.contacts.update(buildContactPayload(email));
      } else {
        await resend.contacts.create(buildContactPayload(email));
      }
    } catch (contactError: any) {
      // If 404, it's fine, we create it. Otherwise, log it.
      if (contactError.statusCode !== 404) {
        console.warn("Resend Contact Management Warning:", contactError.message || contactError);
      }
      // Fallback: try to create anyway if get failed
      await resend.contacts.create(buildContactPayload(email)).catch(() => {});
    }

    // 2. Manage Topics
    if (topicsID) {
      await resend.contacts.topics.update({
        email,
        topics: [{ id: topicsID, subscription: "opt_in" }],
      }).catch(err => console.warn("Topic update failed:", err.message));
    }

    // 3. Send Welcome Email
    const emailHtml = await render(
      <WelcomeEmail unsubscribeUrl="{{{RESEND_UNSUBSCRIBE_URL}}}" />
    )

    const { error: sendError } = await resend.emails.send({
      from: "Green Impact Innovators <info@greenimpactinnovators.works>",
      to: email,
      bcc: "greenimpactinnovators@gmail.com",
      subject: "Welcome to Green Impact Innovators! 🎉",
      html: emailHtml,
      headers: {
        "List-Unsubscribe": "<{{{RESEND_UNSUBSCRIBE_URL}}}>",
      },
    })

    if (sendError) {
      console.error("Resend Email Send Error:", sendError);
      // We still return success if the contact was added but email failed (e.g. domain not verified)
    }

    return res.status(200).json({ success: true })
  } catch (error: any) {
    console.error("Newsletter Subscription Exception:", error.message || error);
    return res.status(500).json({ 
      error: "Subscription failed", 
      message: error.message 
    })
  }
}
