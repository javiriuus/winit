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

// Speech bubble with a handset, drawn in the set's stroke (not the WhatsApp logo).
export function WhatsAppIcon({ size = 16 }) {
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
      <path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6Z" />
      <path d="M9.2 8.6c.2-.4.5-.5.8-.5h.4c.2 0 .3.1.4.3l.7 1.6c.1.2 0 .4-.1.5l-.5.6c.6 1.1 1.4 1.9 2.5 2.5l.6-.5c.2-.1.4-.2.6-.1l1.6.7c.2.1.3.2.3.4v.4c0 .3-.2.6-.5.8-.6.4-1.5.5-2.4.1-1.9-.8-3.4-2.3-4.2-4.2-.4-.9-.3-1.8.1-2.4Z" />
    </svg>
  );
}
