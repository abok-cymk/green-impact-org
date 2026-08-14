import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Resend } from "resend"
import { z } from "zod"
import { RESEND_API_KEY } from "../infrastructure/resend.js"
import {
  generateFormToken,
  decryptFormToken,
  sanitizeInput,
} from "../lib/helpers.js"
import { TOKEN_EXPIRY_MS } from "../lib/constants.js"

const resend = new Resend(RESEND_API_KEY)

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .pipe(z.email("Invalid email address"))
    .transform((v) => v.toLowerCase()),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(5000, "Message is too long"),
  website: z.string().optional(),
  formToken: z.string().min(1, "Security token missing"),
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const token = generateFormToken()
    return res.status(200).json({ token })
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const parsedBody = contactSchema.safeParse(req.body)

    if (!parsedBody.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsedBody.error.flatten().fieldErrors,
      })
    }

    const { name, email, message, website, formToken } = parsedBody.data

    if (website && website.trim() !== "") {
      console.warn(`Honeypot triggered by: ${email}`)
      return res.status(200).json({ success: true, id: "honeypot-triggered" })
    }

    // Token integrity check
    const initialTime = decryptFormToken(formToken)
    if (initialTime == null) {
      console.warn("Invalid or tampered security token received.")
      return res.status(400).json({ error: "Security validation failed." })
    }
    const currentTime = Date.now()

    if (!initialTime) {
      console.warn("Invalid or tampered security token received.")
      res.status(400).json({ error: "Security validation failed." })
    }

    const msElapsed = currentTime - initialTime
    const secondsElapsed = msElapsed / 1000

    if (secondsElapsed < 3) {
      console.warn(
        `Backend timer triggered. Submitted too fast (${secondsElapsed}s) by ${email}`
      )
      return res.status(200).json({ success: true, id: "timer-triggered" })
    }

    // 5. Upper-bound expiry check (Too slow = Expired)
    if (msElapsed > TOKEN_EXPIRY_MS) {
      console.warn(`Expired token used by ${email}`)
      return res.status(400).json({
        error: "Form session expired. Please refresh the page and try again.",
      })
    }

    // 6. Security Measure: Sanitize inputs to block Email XSS / Layout Breaking
    const safeName = sanitizeInput(name)
    const safeMessage = sanitizeInput(message)

    const { data, error } = await resend.emails.send({
      from: "Green Impact Innovators <info@greenimpactinnovators.works>",
      to: "greenimpactinnovators@gmail.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2>New Message Received</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${safeMessage.replace(/\n/g, "<br/>")}
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">
            This email was sent from the contact form on greenimpactinnovators.works
          </p>
        </div>
      `,
    })

    if (error) {
      console.error("Resend Error:", error)
      return res
        .status(500)
        .json({ error: "Failed to send email", details: error })
    }

    return res.status(200).json({ success: true, id: data?.id })
  } catch (error: any) {
    console.error("Contact Form Exception:", error.message || error)
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    })
  }
}
