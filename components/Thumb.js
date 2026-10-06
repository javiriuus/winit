import { useState } from "react";
import { thumbFor } from "../lib/content";

// Same thumbnail the video shows on YouTube or Vimeo. YouTube's HD version only
// exists for some uploads (it answers with a 120px placeholder otherwise), so
// step down through the sizes until one exists.
const ORDER = ["maxresdefault", "sddefault", "hqdefault"];

export default function Thumb({ work, eager = false, alt = "" }) {
  const [step, setStep] = useState(0);
  const [failed, setFailed] = useState(false);
  const steps = work.platform === "youtube" ? ORDER.length : 1;
  const next = () => (step < steps - 1 ? setStep(step + 1) : setFailed(true));

  if (failed || !thumbFor(work)) {
    // No image available (e.g. Instagram without a still set): show the platform name instead.
    return work.platform === "instagram" ? (
      <span className="thumb-type" aria-hidden="true">
        Instagram
      </span>
    ) : null;
  }

  return (
    <img
      src={thumbFor(work, ORDER[step])}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onLoad={(e) => {
        if (step < steps - 1 && e.currentTarget.naturalWidth <= 120) next();
      }}
      onError={next}
    />
  );
}
