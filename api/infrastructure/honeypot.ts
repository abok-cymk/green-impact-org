const secretKey = process.env.ENCRYPTION_SECRET

if (!secretKey) {
  console.warn("[HONEYPOT] Missing ENCRYPTION_SECRET")
}

export const ENCRYPTION_SECRET = secretKey || ""