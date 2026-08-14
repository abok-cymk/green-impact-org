import { Resend } from "resend"
import { RESEND_API_KEY } from "../infrastructure/resend.js"

const resend = new Resend(RESEND_API_KEY)

export type SendContactEmailParams = {
  from: string
  to: string | string[]
  replyTo?: string
  subject: string
  html: string
}

export async function sendContactEmail(
  params: SendContactEmailParams
): Promise<Awaited<ReturnType<typeof resend.emails.send>>> {
  return resend.emails.send(params)
}