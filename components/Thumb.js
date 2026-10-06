import { useState } from "react";
import { thumb } from "../lib/content";

// YouTube only generates the high-resolution frame for some uploads; when it is
// missing it returns a 120px placeholder, so fall back to the always-present one.
export default function Thumb({ id, eager = false, alt = "" }) {
  const [quality, setQuality] = useState("maxresdefault");
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <img
      src={thumb(id, quality)}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onLoad={(e) => {
        if (quality === "maxresdefault" && e.currentTarget.naturalWidth <= 120) setQuality("hqdefault");
      }}
      onError={() => (quality === "hqdefault" ? setFailed(true) : setQuality("hqdefault"))}
    />
  );
}
