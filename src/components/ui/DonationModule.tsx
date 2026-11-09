import { useEffect, useRef, useState } from "react"
import { Check, Copy, Heart, Mail, PhoneCall, Wallet, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type Bank = "kcb" | "im"

const paymentDetails: Record<Bank, { label: string; businessNumber: string; accountNumber: string }> = {
  kcb: {
    label: "KCB Bank",
    businessNumber: "522533",
    accountNumber: "8161574",
  },
  im: {
    label: "I&M Bank",
    businessNumber: "542542",
    accountNumber: "00110779611250",
  },
}

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy payment detail:", error)
    }
  }

  return (
    <div className="flex flex-col gap-1.5 border border-slate-200 bg-slate-50 p-3 transition-colors hover:bg-slate-100">
      <span className="text-xs font-medium tracking-wider text-slate-500 uppercase">
        {label}
      </span>
      <div className="flex items-center justify-between gap-2">
        <span className="break-all font-mono text-sm font-semibold text-slate-900">
          {value}
        </span>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0 hover:bg-white"
          onClick={handleCopy}
          aria-label={`Copy ${label}`}
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-700" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4 text-slate-500" aria-hidden="true" />
          )}
        </Button>
      </div>
      {copied && <span className="text-xs text-emerald-700" role="status">Copied</span>}
    </div>
  )
}

export function DonationModule() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeBank, setActiveBank] = useState<Bank>("kcb")
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <p className="mb-3 text-sm font-semibold tracking-widest text-emerald-800 uppercase">
          Grow the impact
        </p>
        <h2 className="mb-6 text-3xl font-bold text-slate-900 md:text-4xl">
          Support Our Mission
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-slate-700">
          Every contribution helps us expand climate education, establish more forest gardens, and equip young people to lead sustainable change in their communities.
        </p>

        <div className="mb-8" aria-label="Funding progress: 15 percent">
          <div className="mb-2 flex justify-between text-sm font-medium text-slate-700">
            <span>Funding Progress</span>
            <span>15% / 100%</span>
          </div>
          <div className="h-2.5 w-full bg-slate-200">
            <div className="h-full bg-emerald-700 transition-all duration-1000" style={{ width: "15%" }} />
          </div>
        </div>

        <Button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex h-auto w-full items-center justify-center gap-2 rounded-full bg-emerald-800 px-6 py-4 text-base font-semibold text-white shadow-md transition-colors hover:bg-emerald-900 sm:w-auto"
        >
          <Heart className="h-5 w-5 fill-current" aria-hidden="true" />
          Donate via M-Pesa Paybill
        </Button>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-6">
        <a
          href="mailto:odimambrose@greenimpactinnovators.works"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-800 px-6 py-3 text-base font-medium text-emerald-900 transition-colors hover:bg-emerald-50"
        >
          <Mail className="h-5 w-5" aria-hidden="true" />
          Partner With Us <span className="max-sm:hidden">(Corporate / NGO)</span>
        </a>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="donation-sheet-title"
        aria-describedby="donation-sheet-description"
        onClose={() => setIsOpen(false)}
        className="fixed inset-y-0 right-0 m-0 h-dvh w-full max-w-md overflow-y-auto border-0 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-black/50"
      >
        <div className="flex min-h-full flex-col px-6 py-7 sm:px-8">
          <div className="mb-6 flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <h3 id="donation-sheet-title" className="flex items-center gap-2 text-xl font-bold">
                <Wallet className="h-5 w-5 text-emerald-700" aria-hidden="true" />
                M-Pesa Paybill Donation
              </h3>
              <p id="donation-sheet-description" className="mt-2 text-sm leading-relaxed text-slate-600">
                Use the details for your selected bank in the Lipa na M-Pesa menu.
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close donation details"
              className="shrink-0"
            >
              <X aria-hidden="true" />
            </Button>
          </div>

          <div role="tablist" aria-label="Choose bank" className="grid grid-cols-2 gap-1 bg-slate-100 p-1">
            {(Object.keys(paymentDetails) as Bank[]).map((bank) => (
              <button
                key={bank}
                id={`bank-tab-${bank}`}
                type="button"
                role="tab"
                aria-selected={activeBank === bank}
                aria-controls={`bank-panel-${bank}`}
                onClick={() => setActiveBank(bank)}
                className={`min-h-10 px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
                  activeBank === bank
                    ? "bg-white text-emerald-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {paymentDetails[bank].label}
              </button>
            ))}
          </div>

          {(Object.keys(paymentDetails) as Bank[]).map((bank) => (
            <div
              key={bank}
              id={`bank-panel-${bank}`}
              role="tabpanel"
              aria-labelledby={`bank-tab-${bank}`}
              hidden={activeBank !== bank}
              className="mt-5 flex flex-col gap-3"
            >
              <CopyField label="Business Number (Paybill)" value={paymentDetails[bank].businessNumber} />
              <CopyField label="Account Number" value={paymentDetails[bank].accountNumber} />
            </div>
          ))}

          <div className="mt-6 border border-emerald-100 bg-emerald-50/70 p-4">
            <h4 className="mb-2 text-xs font-bold tracking-wider text-emerald-900 uppercase">
              Quick Instructions
            </h4>
            <ol className="list-decimal space-y-2 pl-4 text-xs leading-relaxed text-emerald-950/85">
              <li>Open M-Pesa and choose <strong>Lipa na M-Pesa</strong>.</li>
              <li>Select <strong>Pay Bill</strong>.</li>
              <li>Enter the business number shown above.</li>
              <li>Enter the account number shown above.</li>
              <li>Enter your contribution amount and confirm with your PIN.</li>
            </ol>
          </div>
        </div>
      </dialog>
    </div>
  )
}
