import crypto from "crypto"
import { ALGORITHM, ENCRYPTION_KEY } from "../lib/constants.js"
import dns from "dns/promises"

// Helper to escape dangerous characters and prevent HTML/XSS injection in emails
export function sanitizeInput(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
}

export function generateFormToken(): string {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv)
  const timestamp = Date.now().toString()
  let encrypted = cipher.update(timestamp, "utf8", "hex")
  encrypted += cipher.final("hex")
  return `${iv.toString("hex")}:${encrypted}`
}

export function decryptFormToken(token: string): number | null {
  try {
    const [ivHex, encryptedHex] = token.split(":")
    if (!ivHex || !encryptedHex) return null
    
    const iv = Buffer.from(ivHex, "hex")
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv)
    let decrypted = decipher.update(encryptedHex, "hex", "utf8")
    decrypted += decipher.final("utf8")
    return parseInt(decrypted, 10)
  } catch (err) {
    return null
  }
}

// 1. Helper function to check if the email provider actually exists
export async function hasValidMailServer(email: string): Promise<boolean> {
  try {
    const domain = email.split("@")[1]
    if (!domain) return false

    // Resolve the active Mail Exchange (MX) records for the domain
    const mxRecords = await dns.resolveMx(domain)
    return mxRecords && mxRecords.length > 0
  } catch (error) {
    // In non-production environments (development/testing), bypass strict MX failures
    // to allow testing with mock domains like example.com or local addresses.
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[DEV] Bypassing missing MX records for domain: ${email}`)
      return true
    }
    // If the domain has no email server, it will throw an error
    return false
  }
}