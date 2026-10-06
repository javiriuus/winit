import { useEffect, useRef } from "react";
import { useLang } from "../lib/i18n";
import { CloseIcon } from "./Icons";
import { embedFor } from "../lib/content";
import Roles from "./Roles";

// Full-screen cinema player. Esc or the close button returns focus to the trigger.
export default function Player({ work, onClose }) {
  const { t } = useLang();
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!work) return;
    const previous = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll("button, iframe");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      if (previous && previous.focus) previous.focus();
    };
  }, [work, onClose]);

  if (!work) return null;

  return (
    <div
      className="player"
      role="dialog"
      aria-modal="true"
      aria-label={t.playerLabel(work.title)}
      ref={dialogRef}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="player-stage" data-vertical={!!work.vertical}>
        <div className="player-video">
          <iframe
            src={embedFor(work)}
            title={work.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
        <div className="player-bar">
          <span className="player-meta">
            <span className="player-title">{work.title}</span>
            <Roles roles={work.roles} />
          </span>
          <button type="button" className="player-close" onClick={onClose} ref={closeRef}>
            <CloseIcon />
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
