"use client";

const CATEGORIES = [
  "Life Transitions",
  "Mental & Emotional",
  "Creative Survival",
  "Body & Health",
  "Hyper-Specific Human Experiences",
];

export default function AnimatedShelf() {
  return (
    <div className="mx-auto mt-16 w-full max-w-4xl px-4 sm:mt-20">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center">
          {/* Battery body */}
          <div className="relative flex h-32 flex-1 rounded-2xl border-[3px] border-[#667066] bg-[#a6534a] p-2 shadow-sm sm:h-40 sm:p-3">
            <div className="flex h-full w-full gap-1.5 overflow-hidden rounded-xl sm:gap-2">
              {CATEGORIES.map((category, index) => (
                <div
                  key={category}
                  className="battery-cell relative flex-1 overflow-hidden rounded-md bg-[#a6534a]"
                >
                  <div
                    className="battery-fill absolute inset-y-0 left-0 flex w-full items-center justify-center bg-[#58785f] px-1.5 text-center"
                    style={{
                      animationDelay: `${index * 1.1}s`,
                    }}
                  >
                    <span className="battery-label font-body text-[8px] font-medium leading-tight text-[#f4eee1] sm:text-[10px]">
                      {category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Battery terminal */}
          <div className="h-12 w-3 rounded-r-md bg-[#667066] sm:h-16 sm:w-4" />
        </div>

        <p className="mt-6 text-center font-body text-xs uppercase tracking-[0.18em] text-ink-soft/60">
          BECAUSE LIFE DOESN&rsquo;T COME IN ONE CATEGORY.
        </p>
      </div>

      <style jsx>{`
        .battery-fill {
          transform: scaleX(0);
          transform-origin: left center;
          animation: charge 7.5s ease-in-out infinite;
        }

        .battery-label {
          opacity: 0;
          transform: translateX(-8px);
          animation: label 7.5s ease-in-out infinite;
        }

        @keyframes charge {
          0%,
          8% {
            transform: scaleX(0);
          }

          18%,
          82% {
            transform: scaleX(1);
          }

          92%,
          100% {
            transform: scaleX(0);
          }
        }

        @keyframes label {
          0%,
          15% {
            opacity: 0;
            transform: translateX(-8px);
          }

          22%,
          82% {
            opacity: 1;
            transform: translateX(0);
          }

          90%,
          100% {
            opacity: 0;
            transform: translateX(8px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .battery-fill {
            animation: none;
            transform: scaleX(1);
          }

          .battery-label {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}