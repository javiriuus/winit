import { useEffect, useRef, useState } from "react";
import { useLang } from "../lib/i18n";
import { works, thumb } from "../lib/content";
import { ArrowIcon, PlayIcon } from "./Icons";
import Thumb from "./Thumb";

export default function Portfolio({ onPlay }) {
  const { t } = useLang();
  const [view, setView] = useState("grid");

  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="section-head">
        <h2 id="work-title" className="section-title">
          {t.workTitle}
        </h2>
        <div className="section-aside">
          <span className="meta">{t.workCount(works.length)}</span>
          <div className="view-toggle" role="group" aria-label={t.viewLabel}>
            <button type="button" aria-pressed={view === "grid"} onClick={() => setView("grid")}>
              {t.viewGrid}
            </button>
            <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")}>
              {t.viewList}
            </button>
          </div>
        </div>
      </div>

      {view === "grid" ? <WorkGrid onPlay={onPlay} t={t} /> : <WorkList onPlay={onPlay} />}
    </section>
  );
}

function WorkGrid({ onPlay, t }) {
  return (
    <ul className="work-grid">
      {works.map((w) => (
        <li key={w.id}>
          <button type="button" className="work-card" onClick={() => onPlay(w)}>
            <span className="work-frame">
              <Thumb id={w.id} />
              <span className="work-watch" aria-hidden="true">
                <PlayIcon />
                <span className="play-text">{t.watch}</span>
              </span>
            </span>
            <span className="work-cap">
              <span className="work-title">{w.title}</span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

// Title list with a preview frame that follows the pointer (fine pointers only).
function WorkList({ onPlay }) {
  const previewRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const w = el.offsetWidth;
        const h = el.offsetHeight;
        const x = Math.min(e.clientX + 24, window.innerWidth - w - 16);
        const y = Math.min(Math.max(e.clientY - h / 2, 16), window.innerHeight - h - 16);
        el.style.setProperty("--x", `${x}px`);
        el.style.setProperty("--y", `${y}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <>
      <ul className="work-list" onPointerLeave={() => setHovered(null)}>
        {works.map((w) => (
          <li key={w.id}>
            <button
              type="button"
              className="work-row"
              onClick={() => onPlay(w)}
              onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(w.id)}
              onFocus={() => setHovered(null)}
            >
              <span className="work-row-title">{w.title}</span>
              <span className="arrow">
                <ArrowIcon size={22} />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="cursor-preview" ref={previewRef} data-on={hovered !== null} aria-hidden="true">
        {works.map((w) => (
          <img key={w.id} src={thumb(w.id, "hqdefault")} alt="" data-on={hovered === w.id} loading="lazy" />
        ))}
      </div>
    </>
  );
}
