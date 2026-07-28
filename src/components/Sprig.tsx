export default function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 12H50"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M70 12H116"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      <g stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" fill="none">
        <path d="M60 20C60 20 60 12 60 5" />
        <path d="M60 16C60 16 54 13 52 8" />
        <path d="M60 16C60 16 66 13 68 8" />
        <path d="M60 11C60 11 55 8.5 54 5" />
        <path d="M60 11C60 11 65 8.5 66 5" />
      </g>
      <circle cx="60" cy="4" r="1.4" fill="currentColor" />
    </svg>
  );
}
