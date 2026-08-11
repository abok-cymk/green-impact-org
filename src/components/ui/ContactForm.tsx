import { useForm } from "@formspree/react";
import { Heart, CheckCircle2 } from "lucide-react";

interface ContactFormProps {
  formId: string;
}

export function ContactForm({ formId }: ContactFormProps) {
  // useForm handles loading, errors, and validation states automatically
  const [state, handleSubmit] = useForm(formId);

  if (state.succeeded) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center text-slate-900 min-h-100 flex flex-col items-center justify-center gap-4 border shadow-sm">
        <CheckCircle2 className="h-16 w-16 text-emerald-500 animate-bounce" />
        <h3 className="text-2xl font-bold text-slate-900">Message Sent!</h3>
        <p className="text-slate-600 max-w-sm">
          Thank you for reaching out to Green Impact Innovators. We will get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-8 text-slate-900 shadow-lg">
      <h3 className="text-xl font-bold mb-6 text-slate-900">Get in Touch</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-green"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-6 py-3 text-base font-medium text-white hover:bg-opacity-90 transition-colors disabled:opacity-50"
        >
          <Heart className="h-5 w-5 fill-current" />
          {state.submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
