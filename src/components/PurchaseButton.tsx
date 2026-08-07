"use client";

import { useEffect, useState } from "react";

type PurchaseButtonProps = {
  purchaseUrl: string;
  purchaseUrlIndia?: string;
  title: string;
};

const buttonClass =
  "rounded-full bg-ink px-7 py-3.5 font-body text-sm font-medium text-paper transition-transform duration-300 ease-gentle hover:-translate-y-0.5 hover:bg-wood-deep";

export default function PurchaseButton({
  purchaseUrl,
  purchaseUrlIndia,
  title,
}: PurchaseButtonProps) {
  const [showAlt, setShowAlt] = useState(false);

  useEffect(() => {
    if (!purchaseUrlIndia) return;
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timeZone === "Asia/Calcutta" || timeZone === "Asia/Kolkata") {
        setShowAlt(true);
      }
    } catch {
      // if detection fails for any reason, just keep the default link
    }
  }, [purchaseUrlIndia]);

  if (!purchaseUrl) {
    return (
      <span className="font-body text-sm italic text-ink-soft">
        On its way soon — check back shortly.
      </span>
    );
  }

  const activeUrl = showAlt && purchaseUrlIndia ? purchaseUrlIndia : purchaseUrl;
  const fallbackUrl = showAlt ? purchaseUrl : purchaseUrlIndia;

  return (
    <div className="flex flex-col items-start gap-2">
      <a
        href={activeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
      >
        Get {title}
      </a>
      {fallbackUrl && (
        <a
          href={fallbackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-xs text-ink-soft underline-offset-2 hover:underline"
        >
          Trouble with this payment link? Try an alternate option
        </a>
      )}
    </div>
  );
}