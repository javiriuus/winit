import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLang } from "../lib/i18n";
import { ChevronIcon, CloseIcon } from "./Icons";

// Full-screen photo viewer: arrows / keys to move, Esc or backdrop to close.
export default function Lightbox({ photos, index, onIndex, onClose }) {
  const { t } = useLang();
  const closeRef = useRef(null);
  const touch = useRef(null);
  const open = index !== null && index !== undefined;
  const n = photos.length;
  const go = (d) => onIndex((index + d + n) % n);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((i) => (i + 1) % n);
      if (e.key === "ArrowLeft") onIndex((i) => (i - 1 + n) % n);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [open, n, onClose, onIndex]);

  if (!open) return null;
  const p = photos[index];

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={t.photoTitle}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const dx = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <figure className="lightbox-figure" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <Image key={p.src} src={p.src} width={p.w} height={p.h} alt="" sizes="100vw" priority />
      </figure>
      <div className="lightbox-bar">
        <span className="meta lightbox-count">
          {index + 1} / {n}
        </span>
        <div className="lightbox-controls">
          <button type="button" className="player-close" onClick={() => go(-1)} aria-label={t.prev}>
            <ChevronIcon dir="left" />
          </button>
          <button type="button" className="player-close" onClick={() => go(1)} aria-label={t.next}>
            <ChevronIcon />
          </button>
          <button type="button" className="player-close" onClick={onClose} ref={closeRef}>
            <CloseIcon />
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
