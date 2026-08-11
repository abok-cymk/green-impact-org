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
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!apiKey) {
    return res.status(500).json({ error: "Missing RESEND_API_KEY" })
  }

  if (!rateLimiter) {
    return res.status(500).json({ error: "Missing Upstash rate limit configuration" })
  }

  const parsedBody = SubscribeSchema.safeParse(req.body)

  if (!parsedBody.success) {
    return res.status(400).json({ error: "Invalid email address" })
  }

  const { email } = parsedBody.data
  const clientIp = getClientIp(req)

  try {
    const rateLimitResult = await rateLimiter.limit(clientIp)

    if (!rateLimitResult.success) {
      return res.status(429).json({
        error: "Too many subscription attempts. Please try again later.",
      })
    }

    const existingContactResult = await resend.contacts.get({ email })
    const existingContactError = existingContactResult?.error as
      { statusCode?: number; message?: string } | undefined

    if (
      existingContactError?.statusCode &&
      existingContactError.statusCode !== 404
    ) {
      throw new Error(
        existingContactError.message ?? "Unable to verify contact"
      )
    }

    if (existingContactResult?.data) {
      if (existingContactResult.data.unsubscribed === false) {
        return res.status(200).json({ success: false, alreadySubscribed: true })
      }

      await resend.contacts.update(buildContactPayload(email))
    } else {
      await resend.contacts.create(buildContactPayload(email))
    }

    if (topicsID) {
      await resend.contacts.topics.update({
        email,
        topics: [
          {
            id: topicsID,
            subscription: "opt_in",
          },
        ],
      })
    }

    const emailHtml = await render(
      WelcomeEmail({ unsubscribeUrl: "{{{RESEND_UNSUBSCRIBE_URL}}}" })
    )

    await resend.emails.send({
      from: "Green Impact Innovators <info@greenimpactinnovators.works>",
      to: email,
      bcc: "greenimpactinnovators@gmail.com",
      subject: "Welcome to Green Impact Innovators! 🎉",
      html: emailHtml,
      headers: {
        "List-Unsubscribe": "<{{{RESEND_UNSUBSCRIBE_URL}}}>",
      },
    })

    return res.status(200).json({ success: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error("Subscribe error:", error)
    return res.status(500).json({ error: message })
  }
}
