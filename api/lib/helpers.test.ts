import { describe, it, expect, vi, beforeEach } from "vitest"

// 1. Setup your environment and mocks early inside vi.hoisted
const { resolveMxMock } = vi.hoisted(() => {
  // Fix the environment variable error before constants.js reads it
  process.env.ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET ?? "test-secret-32-bytes-long-here!!"
  
  return {
    resolveMxMock: vi.fn()
  }
})

// 2. Mock dns/promises using the hoisted mock reference
vi.mock("dns/promises", () => ({
  default: { resolveMx: resolveMxMock },
}))

// 3. Normal static imports work perfectly now with 100% type safety!
import {
  sanitizeInput,
  generateFormToken,
  decryptFormToken,
  hasValidMailServer,
} from "./helpers.js"

describe("helpers", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("sanitizeInput escapes dangerous characters", () => {
    const raw = `<script>alert('x')</script> & " / '`
    const escaped = sanitizeInput(raw)
    expect(escaped).toContain("&lt;script&gt;")
    expect(escaped).toContain("&amp;")
    expect(escaped).toContain("&quot;")
  })

  it("generateFormToken -> decryptFormToken roundtrips to a timestamp number", () => {
    const token = generateFormToken()
    const ts = decryptFormToken(token)
    expect(typeof ts).toBe("number")
    expect(Date.now() - (ts as number)).toBeLessThan(10_000) // 10s tolerance
  })

  it("hasValidMailServer returns true when MX records exist", async () => {
    resolveMxMock.mockResolvedValue([{ exchange: "mx1.example", priority: 10 }])
    const ok = await hasValidMailServer("user@example.com")
    expect(ok).toBe(true)
    expect(resolveMxMock).toHaveBeenCalledWith("example.com")
  })

  it("hasValidMailServer returns false when resolveMx throws or returns empty in production, but true in development", async () => {
    const originalEnv = process.env.NODE_ENV
    
    // Test production behavior
    process.env.NODE_ENV = "production"
    resolveMxMock.mockRejectedValue(new Error("ENOTFOUND"))
    const okProd = await hasValidMailServer("user@no-such-domain.test")
    expect(okProd).toBe(false)

    // Test development behavior (fallback)
    process.env.NODE_ENV = "development"
    const okDev = await hasValidMailServer("user@no-such-domain.test")
    expect(okDev).toBe(true)

    process.env.NODE_ENV = originalEnv
  })
})
