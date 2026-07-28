import { ReactNode } from "react";
import Sprig from "./Sprig";

export default function EmptyState({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl2 border border-dashed border-line bg-paper-alt/60 px-8 py-20 text-center">
      <Sprig className="mb-6 h-6 w-28 text-line" />
      <h3 className="font-display text-2xl text-ink">{title}</h3>
      <div className="mt-3 max-w-md font-body text-sm leading-relaxed text-ink-soft">
        {children}
      </div>
    </div>
  );
}
