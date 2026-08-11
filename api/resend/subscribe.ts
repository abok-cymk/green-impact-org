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

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

function buildContactPayload(email: string) {
  return {
    email,
    unsubscribed: false,
    ...(segmentAudienceId ? { audienceId: segmentAudienceId } : {}),
  }
}

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown"
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown"
}

export async function POST(request: Request) {
  if (!apiKey) {
    return jsonResponse({ error: "Missing RESEND_API_KEY" }, 500)
  }

  if (!rateLimiter) {
    return jsonResponse(
      { error: "Missing Upstash rate limit configuration" },
      500
    )
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return jsonResponse({ error: "Invalid request body" }, 400)
  }

  const parsedBody = SubscribeSchema.safeParse(body)

  if (!parsedBody.success) {
    return jsonResponse({ error: "Invalid email address" }, 400)
  }

  const { email } = parsedBody.data
  const clientIp = getClientIp(request)

  try {
    const rateLimitResult = await rateLimiter.limit(clientIp)

    if (!rateLimitResult.success) {
      return jsonResponse(
        {
          error: "Too many subscription attempts. Please try again later.",
        },
        429
      )
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
        return jsonResponse({ success: false, alreadySubscribed: true }, 200)
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
      // RFC 8058 header for one-click email client unsubscribe (Gmail/Apple Mail)
      headers: {
        "List-Unsubscribe": "<{{{RESEND_UNSUBSCRIBE_URL}}}>",
      },
    })

    return jsonResponse({ success: true }, 200)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)

    console.error("Subscribe error:", error)

    return jsonResponse({ error: message }, 500)
  }
}
