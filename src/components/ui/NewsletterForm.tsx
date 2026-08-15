import React from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { fetchToken, sendForm } from "@/lib/helpers";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export default function NewsletterForm() {
  const { data: formToken, isLoading: isLoadingToken } = useSWR(
    "/api/resend/subscribe",
    fetchToken,
    {
      revalidateOnFocus: true,
      revalidateIfStale: true,
      dedupingInterval: 0,
    }
  );

  const {
    trigger,
    isMutating,
    error: submitError,
    data: submitResult,
  } = useSWRMutation("/api/resend/subscribe", sendForm);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formToken) return;

    const formData = new FormData(e.currentTarget);
    formData.append("formToken", formToken);
    const payload = Object.fromEntries(formData.entries());

    trigger(payload);
  };

  const isAlreadySubscribed = submitResult && (submitResult as any).alreadySubscribed;

  return (
    <div className="w-full max-w-xl space-y-2">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-emerald-700 tracking-tight">Stay connected</h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          Get the latest updates on our climate projects, eco-schools, and community farming initiatives.
        </p>
      </div>

      <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 w-full max-w-lg">
        {/* Honeypot Field wrapper */}
        <div className="absolute top-[-9999px] left-[-9999px]" aria-hidden="true">
          <label htmlFor="website-newsletter">Leave this field blank</label>
          <input
            type="text"
            id="website-newsletter"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="flex gap-2 w-full items-center">
          <Input
            type="email"
            name="email"
            placeholder="email@example.com"
            disabled={isMutating || isLoadingToken}
            required
            className="h-11 bg-white border-gray-300 placeholder:text-gray-400 focus-visible:ring-1"
          />
          <Button
            type="submit"
            disabled={isMutating || isLoadingToken || !formToken}
            className="h-11 px-6 uppercase italic font-bold tracking-wider rounded-r-md bg-brand-green text-white hover:bg-emerald-700 shrink-0"
          >
            {isMutating ? "..." : "Subscribe"}
          </Button>
        </div>

        {submitError && (
          <Alert variant="destructive" className="animate-in fade-in slide-in-from-top-1 duration-200 mt-2">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Subscription Error</AlertTitle>
            <AlertDescription>{submitError.message}</AlertDescription>
          </Alert>
        )}

        {submitResult && !isAlreadySubscribed && (
          <p className="text-xs text-green-600 font-medium flex items-center gap-1 mt-1">
            <CheckCircle2 className="h-4 w-4" /> Successfully subscribed!
          </p>
        )}

        {isAlreadySubscribed && (
          <p className="text-xs text-amber-700 font-medium mt-1">
            You&apos;re already subscribed.
          </p>
        )}
      </form>
    </div>
  );
}
