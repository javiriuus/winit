import { useState } from "react";
import { thumb } from "../lib/content";

// Same thumbnail the video shows on YouTube. The HD version only exists for some
// uploads (YouTube answers with a 120px placeholder otherwise), so step down
// through the sizes until one exists.
const ORDER = ["maxresdefault", "sddefault", "hqdefault"];

export default function Thumb({ id, eager = false, alt = "" }) {
  const [step, setStep] = useState(0);
  const [failed, setFailed] = useState(false);
  const quality = ORDER[step];
  const next = () => (step < ORDER.length - 1 ? setStep(step + 1) : setFailed(true));

  if (failed) return null;

  return (
    <img
      src={thumb(id, quality)}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onLoad={(e) => {
        if (step < ORDER.length - 1 && e.currentTarget.naturalWidth <= 120) next();
      }}
      onError={next}
    />
  );
}
