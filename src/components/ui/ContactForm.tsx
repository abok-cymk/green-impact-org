import React, { useRef, useState } from "react"
import { useForm, ValidationError } from "@formspree/react"
import { Heart, CheckCircle2 } from "lucide-react"
import ReCAPTCHA from "react-google-recaptcha"

interface ContactFormProps {
  formId: string
}

export default function ContactForm({ formId }: ContactFormProps) {
  const [state, handleSubmit] = useForm(formId)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)

  const googleSiteKey = import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY

  const onCaptchaChange = (token: string | null) => {
    setRecaptchaToken(token)
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!recaptchaToken) {
      alert("Please check the 'I am not a robot' reCAPTCHA box.")
      return
    }

    // Submit form along with the g-recaptcha-response token to Formspree
    await handleSubmit(e)

    // Reset captcha on completion
    recaptchaRef.current?.reset()
    setRecaptchaToken(null)
  }

  if (state.succeeded) {
    return (
      <div className="flex min-h-100 flex-col items-center justify-center gap-4 rounded-2xl border bg-white p-8 text-center text-slate-900 shadow-sm">
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
    <div className="rounded-2xl bg-white p-8 text-slate-900 shadow-lg">
      <h3 className="mb-6 text-xl font-bold text-slate-900">Get in Touch</h3>
      <form onSubmit={handleFormSubmit} className="space-y-4">
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
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-brand-green focus:outline-none"
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
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-brand-green focus:outline-none"
            required
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />
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
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-brand-green focus:outline-none"
            required
          ></textarea>
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
        </div>

        {/* Hidden input to pass the reCAPTCHA token to Formspree */}
        <input
          type="hidden"
          name="g-recaptcha-response"
          value={recaptchaToken || ""}
        />

        {/* Google reCAPTCHA v2 Checkbox */}
        <div className="pt-2">
          {googleSiteKey ? (
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={googleSiteKey}
              onChange={onCaptchaChange}
            />
          ) : (
            <p className="text-xs text-red-500">
              Missing reCAPTCHA site key. Check your .env file.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={state.submitting || !recaptchaToken}
          className="hover:bg-opacity-90 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-green px-6 py-3 text-base font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Heart className="h-5 w-5 fill-current" />
          {state.submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  )
}
