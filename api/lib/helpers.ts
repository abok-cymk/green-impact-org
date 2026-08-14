import crypto from "crypto"
import { ALGORITHM, ENCRYPTION_KEY } from "../lib/constants.js"

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