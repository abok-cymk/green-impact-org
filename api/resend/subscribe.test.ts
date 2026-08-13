/**
 * Bug 2 — Newsletter API Preservation Tests
 *
 * These tests capture existing CORRECT behaviors in the subscribe handler that
 * must remain unchanged after the Bug 2 fixes (vercel.json, alias fix,
 * audienceId guard) are applied.
 *
 * All tests run on UNFIXED code and should PASS — they encode baseline behaviors.
 *
 * Validates: Requirements 3.4, 3.5, 3.6, 3.7, 3.8
 */
import { describe, it, expect, vi, beforeEach } from "vitest"
import * as fc from "fast-check"

// ---------------------------------------------------------------------------
// Mock all heavy external dependencies at the module level
// ---------------------------------------------------------------------------

// Mock WelcomeEmail (resolves the @/ alias via vitest's alias config)
vi.mock("@/emails/WelcomeEmail", () => ({
  default: () => null,
  WelcomeEmail: () => null,
}))

// Mock @react-email/render
vi.mock("@react-email/render", () => ({
  render: vi.fn().mockResolvedValue("<html>mock email</html>"),
}))

// Mutable Resend mock state — allows per-test configuration
const mockContactsGet = vi.fn()
const mockContactsCreate = vi.fn()
const mockContactsUpdate = vi.fn()
const mockTopicsUpdate = vi.fn()
const mockEmailsSend = vi.fn()

vi.mock("resend", () => {
  return {
    Resend: function MockResend() {
      return {
        contacts: {
          get: mockContactsGet,
          create: mockContactsCreate,
          update: mockContactsUpdate,
          topics: {
            update: mockTopicsUpdate,
          },
        },
        emails: {
          send: mockEmailsSend,
        },
      }
    },
  }
})

// Mock Upstash Redis and Ratelimit
const mockRateLimitFn = vi.fn()
vi.mock("@upstash/redis", () => ({
  Redis: function MockRedis() {
    return {}
  },
}))
vi.mock("@upstash/ratelimit", () => {
  function MockRatelimit() {
    return {
      limit: mockRateLimitFn,
    }
  }
  MockRatelimit.slidingWindow = vi.fn().mockReturnValue("sliding-window-config")
  return {
    Ratelimit: MockRatelimit,
  }
})

// ---------------------------------------------------------------------------
// Helpers to build mock VercelRequest / VercelResponse
// ---------------------------------------------------------------------------
function makeReq(overrides: {
  method?: string
  body?: Record<string, unknown>
  headers?: Record<string, string>
}) {
  return {
    method: overrides.method ?? "POST",
    body: overrides.body ?? {},
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "1.2.3.4",
      ...overrides.headers,
    },
  }
}

interface MockRes {
  statusCode: number
  body: unknown
  status: (code: number) => MockRes
  json: (body: unknown) => MockRes
}

function makeRes(): MockRes {
  const res: MockRes = {
    statusCode: 0,
    body: undefined,
    status(code: number) {
      this.statusCode = code
      return this
    },
    json(body: unknown) {
      this.body = body
      return this
    },
  }
  return res
}

// ---------------------------------------------------------------------------
// Import handler AFTER all mocks are registered
// ---------------------------------------------------------------------------
// NOTE: We use a dynamic import inside beforeEach so we can re-set env vars
// per test. Vitest caches modules, so we isolate via vi.resetModules().

async function loadHandler(envOverrides: Record<string, string | undefined> = {}) {
  // Set env vars before importing
  const defaults = {
    RESEND_API_KEY: "test-api-key",
    RESEND_SEGMENT_AUDIENCE_ID: "test-audience-id",
    RESEND_TOPICS_ID: "test-topics-id",
    UPSTASH_REDIS_REST_URL: "https://test.upstash.io",
    UPSTASH_REDIS_REST_TOKEN: "test-token",
  }
  const merged = { ...defaults, ...envOverrides }
  for (const [key, value] of Object.entries(merged)) {
    if (value === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = value
    }
  }
  vi.resetModules()
  const mod = await import("./subscribe.js")
  return mod.default as (req: unknown, res: unknown) => Promise<unknown>
}

describe("Bug 2 — Newsletter API Preservation Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default: rate limiter passes
    mockRateLimitFn.mockResolvedValue({ success: true })
    // Default: contacts.get returns null (new subscriber)
    mockContactsGet.mockResolvedValue({ data: null })
    mockContactsCreate.mockResolvedValue({ data: { id: "contact-1" } })
    mockContactsUpdate.mockResolvedValue({ data: { id: "contact-1" } })
    mockTopicsUpdate.mockResolvedValue({ data: {} })
    mockEmailsSend.mockResolvedValue({ data: { id: "email-1" }, error: null })
  })

  // -------------------------------------------------------------------------
  // Req 3.5 — Non-POST methods return HTTP 405
  // -------------------------------------------------------------------------
  describe("Req 3.5 — HTTP 405 for non-POST methods", () => {
    it("should return 405 for GET request", async () => {
      const handler = await loadHandler()
      const req = makeReq({ method: "GET" })
      const res = makeRes()

      await handler(req, res)

      expect(res.statusCode).toBe(405)
      expect(res.body).toEqual({ error: "Method Not Allowed" })
    })

    it("should return 405 for PUT request", async () => {
      const handler = await loadHandler()
      const req = makeReq({ method: "PUT" })
      const res = makeRes()

      await handler(req, res)

      expect(res.statusCode).toBe(405)
    })

    it("should return 405 for DELETE request", async () => {
      const handler = await loadHandler()
      const req = makeReq({ method: "DELETE" })
      const res = makeRes()

      await handler(req, res)

      expect(res.statusCode).toBe(405)
    })
  })

  // -------------------------------------------------------------------------
  // Req 3.8 — Missing RESEND_API_KEY returns HTTP 500
  // -------------------------------------------------------------------------
  describe("Req 3.8 — HTTP 500 when RESEND_API_KEY is missing", () => {
    it("should return 500 with configuration error when RESEND_API_KEY is absent", async () => {
      const handler = await loadHandler({ RESEND_API_KEY: undefined })
      const req = makeReq({ body: { email: "test@example.com" } })
      const res = makeRes()

      await handler(req, res)

      expect(res.statusCode).toBe(500)
      expect(res.body).toEqual({
        error: "Newsletter service configuration missing",
      })
    })
  })

  // -------------------------------------------------------------------------
  // Req 3.4 — Invalid email returns HTTP 400
  // -------------------------------------------------------------------------
  describe("Req 3.4 — HTTP 400 for invalid email (Zod validation)", () => {
    it('should return 400 for "not-an-email"', async () => {
      const handler = await loadHandler()
      const req = makeReq({ body: { email: "not-an-email" } })
      const res = makeRes()

      await handler(req, res)

      expect(res.statusCode).toBe(400)
      expect(res.body).toEqual({ error: "Invalid email address" })
    })

    it("should return 400 for empty email string", async () => {
      const handler = await loadHandler()
      const req = makeReq({ body: { email: "" } })
      const res = makeRes()

      await handler(req, res)

      expect(res.statusCode).toBe(400)
    })

    it("should return 400 for missing email field", async () => {
      const handler = await loadHandler()
      const req = makeReq({ body: {} })
      const res = makeRes()

      await handler(req, res)

      expect(res.statusCode).toBe(400)
    })
  })

  // -------------------------------------------------------------------------
  // Req 3.7 — Rate limit exceeded returns HTTP 429
  // -------------------------------------------------------------------------
  describe("Req 3.7 — HTTP 429 when rate limit is exceeded", () => {
    it("should return 429 when rateLimiter.limit() returns { success: false }", async () => {
      mockRateLimitFn.mockResolvedValue({ success: false })

      const handler = await loadHandler()
      const req = makeReq({ body: { email: "test@example.com" } })
      const res = makeRes()

      await handler(req, res)

      expect(res.statusCode).toBe(429)
      expect((res.body as { error: string }).error).toMatch(/Too many/i)
    })
  })

  // -------------------------------------------------------------------------
  // Req 3.6 — Already subscribed contact returns { success: true, alreadySubscribed: true }
  // -------------------------------------------------------------------------
  describe("Req 3.6 — Already subscribed returns { success: true, alreadySubscribed: true }", () => {
    it("should return 200 alreadySubscribed when contact exists with unsubscribed: false and segmentAudienceId is set", async () => {
      // Contact exists and is active
      mockContactsGet.mockResolvedValue({
        data: { id: "contact-1", email: "test@example.com", unsubscribed: false },
      })

      const handler = await loadHandler({
        RESEND_SEGMENT_AUDIENCE_ID: "audience-123",
      })
      const req = makeReq({ body: { email: "test@example.com" } })
      const res = makeRes()

      await handler(req, res)

      expect(res.statusCode).toBe(200)
      expect(res.body).toEqual({ success: true, alreadySubscribed: true })
      // Should NOT send another welcome email
      expect(mockEmailsSend).not.toHaveBeenCalled()
    })
  })

  // -------------------------------------------------------------------------
  // Property-based test: random valid emails → always 200 { success: true }
  // Validates: Req 3.4 (positive case) — handler succeeds for any valid email
  // -------------------------------------------------------------------------
  describe("Property: valid emails always yield HTTP 200 { success: true }", () => {
    /**
     * Validates: Requirements 3.4
     *
     * For any email address that passes Zod validation (standard format
     * user@domain.tld) with all env vars set, the handler must return
     * HTTP 200 { success: true }.
     *
     * We constrain the generator to emails that Zod's z.email() accepts:
     * alphanumeric local parts and standard domain segments (no RFC-5321
     * special characters that Zod would reject).
     */
    it("should return 200 for any Zod-valid email format [PBT]", async () => {
      const handler = await loadHandler()

      // Generator: produce emails of the form <localPart>@<domain>.<tld>
      // that Zod's stricter validation will accept.
      // Constraints: no consecutive dots, no leading/trailing dots or hyphens
      const safeLocalPart = fc
        .array(fc.stringMatching(/^[a-z0-9]{1,5}$/), { minLength: 1, maxLength: 4 })
        .map((parts) => parts.join("."))
        .filter((s) => s.length >= 1 && s.length <= 30)

      const safeDomain = fc
        .array(fc.stringMatching(/^[a-z0-9]{1,6}$/), { minLength: 1, maxLength: 3 })
        .map((parts) => parts.join("-"))
        .filter((s) => s.length >= 1 && s.length <= 20)

      const safeTld = fc.stringMatching(/^[a-z]{2,5}$/)

      const zodSafeEmail = fc
        .tuple(safeLocalPart, safeDomain, safeTld)
        .map(([local, domain, tld]) => `${local}@${domain}.${tld}`)

      await fc.assert(
        fc.asyncProperty(zodSafeEmail, async (email) => {
          vi.clearAllMocks()
          mockRateLimitFn.mockResolvedValue({ success: true })
          mockContactsGet.mockResolvedValue({ data: null })
          mockContactsCreate.mockResolvedValue({ data: { id: "c1" } })
          mockEmailsSend.mockResolvedValue({ data: { id: "e1" }, error: null })
          mockTopicsUpdate.mockResolvedValue({ data: {} })

          const req = makeReq({ body: { email } })
          const res = makeRes()

          await handler(req, res)

          return res.statusCode === 200 && (res.body as { success: boolean }).success === true
        }),
        { numRuns: 50 }
      )
    })
  })

  // -------------------------------------------------------------------------
  // Property-based test: all non-POST methods → always 405
  // Validates: Req 3.5
  // -------------------------------------------------------------------------
  describe("Property: all non-POST HTTP methods return 405 [PBT]", () => {
    /**
     * Validates: Requirements 3.5
     *
     * For every HTTP method that is not POST, the handler must return 405.
     * Only POST returns non-405.
     */
    it("should return 405 for any non-POST method [PBT]", async () => {
      const handler = await loadHandler()

      const nonPostMethods = ["GET", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]

      await fc.assert(
        fc.asyncProperty(fc.constantFrom(...nonPostMethods), async (method) => {
          const req = makeReq({ method, body: { email: "test@example.com" } })
          const res = makeRes()

          await handler(req, res)

          return res.statusCode === 405
        }),
        { numRuns: nonPostMethods.length }
      )
    })
  })
})
