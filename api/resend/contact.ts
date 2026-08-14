import type { VercelRequest, VercelResponse } from "@vercel/node"
import { z } from "zod"
import {
  generateFormToken,
  decryptFormToken,
  sanitizeInput,
} from "../../server/lib/helpers.js"
import { TOKEN_EXPIRY_MS } from "../../server/lib/constants.js"
import { contactSchema } from "../../server/resend/schema.js"
import { hasMailServer, isDisposable, isSyntaxValid } from "../../server/resend/validators.js"
import { sendContactEmail } from "../../server/resend/mailer.js"

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
      const tree = z.treeifyError(parsedBody.error)
      return res.status(400).json({
        error: "Validation failed",
        details: tree,
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

    const msElapsed = currentTime - initialTime
    const secondsElapsed = msElapsed / 1000

    if (secondsElapsed < 3) {
      console.warn(
        `Backend timer triggered. Submitted too fast (${secondsElapsed}s) by ${email}`
      )
      return res.status(200).json({ success: true, id: "timer-triggered" })
    }

    if (!isSyntaxValid(email)) {
      return res
        .status(400)
        .json({ error: "The email formatting is invalid or unsupported." })
    }

    if (isDisposable(email)) {
      console.warn(
        `Blocked registration request using disposable email domain: ${email}`
      )
      return res.status(400).json({
        error:
          "Temporary or disposable email addresses are not allowed. Please provide a standard email account.",
      })
    }

    const activeProvider = await hasMailServer(email)
    if (!activeProvider) {
      return res.status(400).json({
        errorCode: "NO_MX",
        message:
          "We couldn't verify that email address. Please check the address or try a different email.",
      })
    }

    if (msElapsed > TOKEN_EXPIRY_MS) {
      console.warn(`Expired token used by ${email}`)
      return res.status(400).json({
        error: "Form session expired. Please refresh the page and try again.",
      })
    }

    const safeName = sanitizeInput(name)
    const safeMessage = sanitizeInput(message)

    const { data, error } = await sendContactEmail({
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
