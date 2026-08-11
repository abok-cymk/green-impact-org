import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/resend/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json().catch(() => null) as
        | { success?: boolean; alreadySubscribed?: boolean; error?: string }
        | null;

      if (response.ok && data?.alreadySubscribed) {
        setStatus("duplicate");
        return;
      }

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-xl space-y-2">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-emerald-700 tracking-tight">Stay connected</h2>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          Get the latest updates on our climate projects, eco-schools, and community farming initiatives.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-lg items-center">
        <Input
          type="email"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          required
          className="h-11 bg-white border-gray-300 placeholder:text-gray-400 focus-visible:ring-1"
        />
        <Button
          type="submit"
          disabled={status === "loading"}
          className="h-11 px-6 uppercase italic font-bold tracking-wider rounded-r-md bg-emerald-600 text-white hover:bg-emerald-700 shrink-0"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </Button>
      </form>

      {status === "success" && <p className="text-xs text-green-600 font-medium">Successfully subscribed!</p>}
      {status === "duplicate" && <p className="text-xs text-amber-700 font-medium">You&apos;re already subscribed.</p>}
      {status === "error" && <p className="text-xs text-destructive font-medium">Something went wrong. Try again.</p>}
    </div>
  );
}