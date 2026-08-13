/**
 * Bug 3 — Mobile Nav Scroll Preservation Tests
 *
 * These tests capture existing CORRECT behaviors in SmoothScrollProvider that
 * must remain unchanged after the Bug 3 fix (deferred scroll in Navbar.tsx)
 * is applied.
 *
 * The fix is in Navbar.tsx — SmoothScrollProvider itself is not modified.
 * These tests verify the component's current correct behavior is preserved.
 *
 * Validates: Requirements 3.9, 3.10, 3.11
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { render, act } from "@testing-library/react"
import * as fc from "fast-check"
import { SmoothScrollProvider } from "./SmoothScrollProvider"

// ---------------------------------------------------------------------------
// Test Helpers
// ---------------------------------------------------------------------------

/**
 * Create a mock DOM element with a stable getBoundingClientRect().top value.
 * This simulates desktop behavior where no menu animation is in progress.
 */
function createMockElement(rectTop: number): HTMLElement {
  const el = document.createElement("div")
  el.id = "mock-section"
  vi.spyOn(el, "getBoundingClientRect").mockReturnValue({
    top: rectTop,
    bottom: rectTop + 500,
    left: 0,
    right: 800,
    width: 800,
    height: 500,
    x: 0,
    y: rectTop,
    toJSON: () => ({}),
  })
  return el
}

/**
 * Create a mock anchor element pointing to a given href.
 */
function createAnchor(href: string): HTMLAnchorElement {
  const a = document.createElement("a")
  a.href = href
  a.textContent = "Link"
  return a
}

/**
 * Simulate a click event that bubbles up through the document,
 * matching how SmoothScrollProvider intercepts events.
 */
function simulateClick(target: HTMLElement): void {
  const event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
  })
  target.dispatchEvent(event)
}

// ---------------------------------------------------------------------------
// Setup: Mock window.scrollTo and document.querySelector globally
// ---------------------------------------------------------------------------
let scrollToSpy: ReturnType<typeof vi.spyOn>
let querySelectorSpy: ReturnType<typeof vi.spyOn>

beforeEach(() => {
  scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {})
  querySelectorSpy = vi.spyOn(document, "querySelector")
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe("Bug 3 — Mobile Nav Scroll Preservation Tests", () => {
  // -------------------------------------------------------------------------
  // Req 3.9 — Desktop anchor click scrolls to correct position
  // -------------------------------------------------------------------------
  describe("Req 3.9 — Desktop anchor click scrolls to correct 80px-offset position", () => {
    it("should call window.scrollTo with { top: elementTop + pageYOffset - 80 } for a valid hash anchor", () => {
      // Arrange: stable layout (desktop, no menu animation in progress)
      const mockElement = createMockElement(500)
      document.body.appendChild(mockElement)
      querySelectorSpy.mockReturnValue(mockElement)

      // pageYOffset = 100
      Object.defineProperty(window, "pageYOffset", {
        value: 100,
        writable: true,
        configurable: true,
      })

      const anchor = createAnchor("#mock-section")
      document.body.appendChild(anchor)

      render(
        <SmoothScrollProvider>
          <div />
        </SmoothScrollProvider>
      )

      // Act: simulate desktop click
      act(() => {
        simulateClick(anchor)
      })

      // Assert: scroll called with correct offset = 500 + 100 - 80 = 520
      expect(scrollToSpy).toHaveBeenCalledWith({
        top: 520,
        behavior: "smooth",
      })

      // Cleanup
      document.body.removeChild(mockElement)
      document.body.removeChild(anchor)
    })

    /**
     * Validates: Requirements 3.9
     *
     * Property-based test: for any desktop/menu-closed context (¬isBugCondition_mobileNav),
     * the scroll target always equals sectionTop + pageYOffset - 80.
     *
     * We test this by generating random (sectionTop, pageYOffset) pairs and
     * verifying the formula holds in the stable (non-animated) layout case.
     */
    it("should always compute scroll target as sectionTop + pageYOffset - 80 for any stable position [PBT]", async () => {
      render(
        <SmoothScrollProvider>
          <div />
        </SmoothScrollProvider>
      )

      await fc.assert(
        fc.asyncProperty(
          // sectionTop: 0–5000px
          fc.integer({ min: 0, max: 5000 }),
          // pageYOffset: 0–5000px
          fc.integer({ min: 0, max: 5000 }),
          async (sectionTop, pageYOffset) => {
            vi.clearAllMocks()
            scrollToSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {})

            // Stable layout element (desktop, no animation)
            const el = createMockElement(sectionTop)
            const anchor = createAnchor("#test-section")
            document.body.appendChild(el)
            document.body.appendChild(anchor)

            querySelectorSpy = vi
              .spyOn(document, "querySelector")
              .mockReturnValue(el)

            Object.defineProperty(window, "pageYOffset", {
              value: pageYOffset,
              writable: true,
              configurable: true,
            })

            act(() => {
              simulateClick(anchor)
            })

            const expectedTop = sectionTop + pageYOffset - 80

            const wasCalledCorrectly =
              scrollToSpy.mock.calls.length === 1 &&
              (scrollToSpy.mock.calls[0][0] as ScrollToOptions).top === expectedTop &&
              (scrollToSpy.mock.calls[0][0] as ScrollToOptions).behavior === "smooth"

            document.body.removeChild(el)
            document.body.removeChild(anchor)

            return wasCalledCorrectly
          }
        ),
        { numRuns: 30 }
      )
    })
  })

  // -------------------------------------------------------------------------
  // Req 3.11 — Non-anchor clicks do nothing
  // -------------------------------------------------------------------------
  describe("Req 3.11 — Non-anchor element click does not trigger scroll", () => {
    it("should NOT call window.scrollTo when clicking a <div> (non-anchor)", () => {
      render(
        <SmoothScrollProvider>
          <div />
        </SmoothScrollProvider>
      )

      const div = document.createElement("div")
      div.textContent = "Not a link"
      document.body.appendChild(div)

      act(() => {
        simulateClick(div)
      })

      expect(scrollToSpy).not.toHaveBeenCalled()

      document.body.removeChild(div)
    })
  })

  // -------------------------------------------------------------------------
  // Req 3.11 — Anchors with non-hash or length-1 href do nothing
  // -------------------------------------------------------------------------
  describe("Req 3.11 — Anchor with href='#' (length 1) or external href does nothing", () => {
    it("should NOT call window.scrollTo for <a href='#'>", () => {
      render(
        <SmoothScrollProvider>
          <div />
        </SmoothScrollProvider>
      )

      const anchor = document.createElement("a")
      anchor.setAttribute("href", "#")
      anchor.textContent = "Home"
      document.body.appendChild(anchor)

      act(() => {
        simulateClick(anchor)
      })

      expect(scrollToSpy).not.toHaveBeenCalled()

      document.body.removeChild(anchor)
    })

    it("should NOT call window.scrollTo for <a href='https://example.com'>", () => {
      render(
        <SmoothScrollProvider>
          <div />
        </SmoothScrollProvider>
      )

      const anchor = document.createElement("a")
      anchor.setAttribute("href", "https://example.com")
      anchor.textContent = "External"
      document.body.appendChild(anchor)

      act(() => {
        simulateClick(anchor)
      })

      expect(scrollToSpy).not.toHaveBeenCalled()

      document.body.removeChild(anchor)
    })
  })

  // -------------------------------------------------------------------------
  // Req 3.10 — Unmatched hash anchor does nothing
  // -------------------------------------------------------------------------
  describe("Req 3.10 — Anchor with unmatched hash does nothing", () => {
    it("should NOT call window.scrollTo when <a href='#nonexistent'> has no matching DOM element", () => {
      // querySelector returns null — no element with this id
      querySelectorSpy.mockReturnValue(null)

      render(
        <SmoothScrollProvider>
          <div />
        </SmoothScrollProvider>
      )

      const anchor = document.createElement("a")
      anchor.setAttribute("href", "#nonexistent")
      anchor.textContent = "Nonexistent section"
      document.body.appendChild(anchor)

      act(() => {
        simulateClick(anchor)
      })

      expect(scrollToSpy).not.toHaveBeenCalled()

      document.body.removeChild(anchor)
    })
  })
})
