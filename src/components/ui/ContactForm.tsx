import { Heart, CheckCircle2, AlertCircle } from "lucide-react"
import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import { fetchToken, sendForm } from "@/lib/helpers"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactForm() {
  // 3. Retrieve token with security overrides to prevent caching
  const { data: formToken, isLoading: isLoadingToken } = useSWR(
    "/api/resend/contact",
    fetchToken,
    {
      revalidateOnFocus: true, // Refreshes token automatically if the user shifts tabs and returns
      revalidateIfStale: true,
      dedupingInterval: 0, // Guarantees Vite always requests a fresh token, bypassing browser cache
    }
  )

  // 4. Set up the SWR mutation trigger for the form data submission
  const {
    trigger,
    isMutating,
    error: submitError,
    data: submitResult,
  } = useSWRMutation("/api/resend/contact", sendForm)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formToken) return

    const formData = new FormData(e.currentTarget)
    formData.append("formToken", formToken)
    const payload = Object.fromEntries(formData.entries())

    trigger(payload)
  }

  if (submitResult) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center gap-4 rounded-2xl border bg-white p-4 text-center text-slate-900 shadow-sm sm:p-8">
        <CheckCircle2 className="h-16 w-16 animate-bounce text-emerald-500" />
        <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
        <p className="max-w-sm text-slate-600">
          Thank you for reaching out to Green Impact Innovators. We will get
          back to you shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="w-full min-w-0 rounded-2xl bg-white p-4 text-slate-900 shadow-lg sm:p-8">
      <h3 className="mb-6 text-xl font-bold text-slate-900">Get in Touch</h3>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Honeypot Field wrapper */}
        <div
          className="absolute top-[-9999px] left-[-9999px]"
          aria-hidden="true"
        >
          <label htmlFor="website">Leave this field blank</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 transition-all focus:ring-2 focus:ring-brand-green focus:outline-none"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 transition-all focus:ring-2 focus:ring-brand-green focus:outline-none"
            placeholder="your@email.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="mb-1 block text-sm font-medium text-slate-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2 transition-all focus:ring-2 focus:ring-brand-green focus:outline-none"
            placeholder="How can we help?"
            required
          ></textarea>
        </div>

        {submitError && (
          <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-1 duration-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Submission Error</AlertTitle>
            <AlertDescription>
              {submitError.message}
            </AlertDescription>
          </Alert>
        )}

        <button
          type="submit"
          disabled={isMutating || isLoadingToken || !formToken}
          className="hover:bg-opacity-90 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-green px-6 py-3 text-base font-medium text-white transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Heart
            className={`h-5 w-5 fill-current ${isMutating ? "animate-pulse" : ""}`}
          />
          {isMutating ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  )
}
