import { describe, it, expect, vi } from "vitest"

// Mock the Resend client so tests do not perform network calls
vi.mock("resend", () => {
  // Use a constructable function so `new Resend(...)` works in the module under test
  const send = vi.fn(async function (params: any) {
    return { id: "test-id", to: params.to }
  })

  function ResendMock() {
    // Return the same shape the real client provides
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - test-only mock
    return { emails: { send } }
  }

  return { Resend: vi.fn().mockImplementation(ResendMock) }
})

import { sendContactEmail } from "./mailer.js"

describe("mailer", () => {
  it("sends email via Resend and returns result", async () => {
    const params = {
      from: "from@example.com",
      to: "to@example.com",
      replyTo: "reply@example.com",
      subject: "hello",
      html: "<p>hi</p>",
    }

    const result = await sendContactEmail(params)
    expect(result).toHaveProperty("id", "test-id")
    expect((result as any).to).toEqual(params.to)
  })
})
