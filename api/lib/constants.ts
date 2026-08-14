import crypto from "crypto"
import { ENCRYPTION_SECRET } from "../infrastructure/honeypot.js"

export const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000 // 24 hours upper-bound

export const ALGORITHM = "aes-256-cbc"

export const  ENCRYPTION_KEY = crypto.createHash("sha256").update(ENCRYPTION_SECRET).digest()