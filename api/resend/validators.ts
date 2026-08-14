import isEmail from "isemail"
import disposableDomains from "disposable-email-domains"

import { hasValidMailServer as checkMailServer } from "../lib/helpers.js"

/**
 * Validate structural email syntax using `isemail`.
 * Returns `true` when the email is syntactically valid.
 */
export function isSyntaxValid(email: string): boolean {
  return isEmail.validate(email)
}

/**
 * Returns `true` when the email's domain is a known disposable provider.
 */
export function isDisposable(email: string): boolean {
  const domain = (email.split("@")[1] ?? "").toLowerCase()
  return disposableDomains.includes(domain)
}

/**
 * Checks whether the email's domain has mail routing (MX/A) records.
 * Delegates to the shared helper which performs the DNS/MX checks.
 * Returns a typed `Promise<boolean>`.
 */
export async function hasMailServer(email: string): Promise<boolean> {
  return await checkMailServer(email)
}
