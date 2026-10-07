// Small authored icon set: one stroke weight, used everywhere on the site.

export function PlayIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path d="M3 1.6v8.8a.5.5 0 0 0 .76.43l7.04-4.4a.5.5 0 0 0 0-.86L3.76 1.17A.5.5 0 0 0 3 1.6Z" fill="currentColor" />
    </svg>
  );
}

export function ArrowIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function CloseIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ChevronIcon({ size = 16, dir = "right" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={dir === "left" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}
