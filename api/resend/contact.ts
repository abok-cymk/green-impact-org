import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Resend } from "resend"
import { z } from "zod"
import { RESEND_API_KEY } from "../infrastructure/resend"

const resend = new Resend(RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .pipe(z.email("Invalid email address"))
    .transform((v) => v.toLowerCase()),
  message: z.string().min(1, "Message is required"),
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Method Check
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" })
  }

  try {
    // 2. Validation
    const parsedBody = contactSchema.safeParse(req.body)
    if (!parsedBody.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: parsedBody.error.flatten().fieldErrors,
      })
    }

    const { name, email, message } = parsedBody.data

    // 3. Send Email via Resend
    const { data, error } = await resend.emails.send({
      from: "Green Impact Innovators <info@greenimpactinnovators.works>",
      to: "greenimpactinnovators@gmail.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2>New Message Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 8px;">
            ${message.replace(/\n/g, "<br/>")}
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
