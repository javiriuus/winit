import { useEffect, useRef, useState } from "react";
import { useLang } from "../lib/i18n";
import { thumbFor } from "../lib/content";
import { ArrowIcon, PlayIcon } from "./Icons";
import Thumb from "./Thumb";
import Roles from "./Roles";

export default function Portfolio({ works, onPlay }) {
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

      {view === "grid" ? <WorkGrid works={works} onPlay={onPlay} t={t} /> : <WorkList works={works} onPlay={onPlay} />}
    </section>
  );
}

// One large frame per row, in a single column (Samba-style reel).
function WorkGrid({ works, onPlay, t }) {
  const total = String(works.length).padStart(2, "0");
  return (
    <ul className="work-reel">
      {works.map((w, i) => (
        <li key={w.id} data-vertical={!!w.vertical}>
          <WorkCard w={w} i={i} total={total} onPlay={onPlay} t={t} />
          <WorkDetails w={w} />
        </li>
      ))}
    </ul>
  );
}

function WorkCard({ w, i, total, onPlay, t }) {
  return (
    <button type="button" className="work-card" onClick={() => onPlay(w)}>
      <span className="work-frame">
        <Thumb work={w} />
        <span className="work-watch" aria-hidden="true">
          <PlayIcon />
          <span className="play-text">{t.watch}</span>
        </span>
      </span>
      <span className="work-cap">
        <span className="work-cap-main">
          <span className="work-title">{w.title}</span>
          <Roles roles={w.roles} />
        </span>
        <span className="meta work-count">
          {String(i + 1).padStart(2, "0")} / {total}
        </span>
      </span>
    </button>
  );
}

// Extended sheet for works that have it (synopsis, festival selections, stills).
function WorkDetails({ w }) {
  const { lang, t } = useLang();
  if (!w.synopsis && !w.selections && !w.stills) return null;
  return (
    <div className="work-details">
      <div className="work-details-text">
        {w.synopsis && (
          <div className="work-synopsis">
            <h3 className="meta">{t.synopsisLabel}</h3>
            <p>{w.synopsis[lang]}</p>
          </div>
        )}
        {w.selections && (
          <div className="work-selections">
            <h3 className="meta">{t.selectionsLabel}</h3>
            <ul>
              {w.selections.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {w.stills && (
        <ul className="work-stills" aria-label={t.stillsLabel(w.title)}>
          {w.stills.map((src) => (
            <li key={src}>
              <img src={src} alt="" loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Title list with a preview frame that follows the pointer (fine pointers only).
function WorkList({ works, onPlay }) {
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
              <span className="work-row-main">
                <span className="work-row-title">{w.title}</span>
                <Roles roles={w.roles} />
              </span>
              <span className="arrow">
                <ArrowIcon size={22} />
              </span>
            </button>
          </li>
        ))}
      </ul>
      <div className="cursor-preview" ref={previewRef} data-on={hovered !== null} aria-hidden="true">
        {works.map((w) => (
          <img key={w.id} src={thumbFor(w, "hqdefault")} alt="" data-on={hovered === w.id} loading="lazy" />
        ))}
      </div>
    </>
  );
}
