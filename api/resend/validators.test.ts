import { describe, it, expect, vi } from "vitest"

// Mock the helper that performs DNS/MX checks so tests are deterministic
vi.mock("../lib/helpers.js", () => ({
  hasValidMailServer: vi.fn(async (email: string) => email.endsWith("@example.com")),
}))

import { isSyntaxValid, isDisposable, hasMailServer } from "./validators.js"

describe("validators", () => {
  it("validates email syntax correctly", () => {
    expect(isSyntaxValid("user@example.com")).toBe(true)
    expect(isSyntaxValid("not-an-email")).toBe(false)
  })

  it("detects disposable domains", () => {
    expect(isDisposable("user@mailinator.com")).toBe(true)
    expect(isDisposable("user@example.com")).toBe(false)
  })

  it("hasMailServer delegates and returns a boolean", async () => {
    expect(await hasMailServer("user@example.com")).toBe(true)
    expect(await hasMailServer("user@otherdomain.test")).toBe(false)
  })
})
