import { useEffect, useRef, useState } from "react";
import { useLang } from "../lib/i18n";
import { thumbFor } from "../lib/content";
import { ArrowIcon, ChevronIcon, PlayIcon } from "./Icons";
import Thumb from "./Thumb";
import Roles from "./Roles";
import WorkDetails from "./WorkDetails";

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

// The latest short gets the large frame with its sheet; every other work slides
// past in a horizontal reel below it.
function WorkGrid({ works, onPlay, t }) {
  const { path } = useLang();
  const total = String(works.length).padStart(2, "0");
  const featured = works.filter((w) => w.latestShort);
  const rest = works.filter((w) => !w.latestShort);
  return (
    <>
      {featured.length > 0 && (
        <ul className="work-reel">
          {featured.map((w, i) => (
            <li key={w.id} data-vertical={!!w.vertical}>
              <WorkCard w={w} i={i} total={total} onPlay={onPlay} t={t} />
              <WorkDetails w={w} />
              <a className="meta work-sheet-link link-line" href={path(`/trabajo/${w.slug}`)}>
                {t.workSheet} →
              </a>
            </li>
          ))}
        </ul>
      )}
      <WorkCarousel works={rest} offset={featured.length} total={total} onPlay={onPlay} t={t} />
    </>
  );
}

const ADVANCE_MS = 4500;

// Horizontal reel that moves one work at a time on its own. It pauses while the
// pointer or keyboard focus is on it and while it is off screen, and stops for good
// once someone scrolls it, uses the arrows or opens a video, so it stays where they left it.
function WorkCarousel({ works, offset, total, onPlay, t }) {
  const { path } = useLang();
  const trackRef = useRef(null);
  const [stopped, setStopped] = useState(false);
  const paused = useRef(false);
  const visible = useRef(false);

  const items = () => [...(trackRef.current?.children || [])];
  const currentIndex = () => {
    const track = trackRef.current;
    const left = track.scrollLeft;
    let best = 0;
    items().forEach((el, i) => {
      if (Math.abs(el.offsetLeft - track.offsetLeft - left) < Math.abs(items()[best].offsetLeft - track.offsetLeft - left)) best = i;
    });
    return best;
  };
  const goTo = (i) => {
    const track = trackRef.current;
    const list = items();
    if (!track || !list.length) return;
    const n = (i + list.length) % list.length;
    track.scrollTo({ left: list[n].offsetLeft - track.offsetLeft, behavior: "smooth" });
  };
  const atEnd = () => {
    const track = trackRef.current;
    return track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
  };

  useEffect(() => {
    if (stopped) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const track = trackRef.current;
    const io = new IntersectionObserver(([e]) => (visible.current = e.isIntersecting), { threshold: 0.4 });
    io.observe(track);
    const id = setInterval(() => {
      if (paused.current || !visible.current || document.hidden) return;
      goTo(atEnd() ? 0 : currentIndex() + 1);
    }, ADVANCE_MS);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [stopped]);

  const stop = () => setStopped(true);
  const play = (w) => {
    stop();
    onPlay(w);
  };

  if (!works.length) return null;

  return (
    <div className="work-carousel">
      <div className="work-carousel-head">
        <span className="meta">{t.moreWork}</span>
        <div className="work-carousel-arrows">
          <button
            type="button"
            className="player-close"
            aria-label={t.prev}
            onClick={() => {
              stop();
              goTo(currentIndex() - 1);
            }}
          >
            <ChevronIcon dir="left" />
          </button>
          <button
            type="button"
            className="player-close"
            aria-label={t.next}
            onClick={() => {
              stop();
              goTo(atEnd() ? 0 : currentIndex() + 1);
            }}
          >
            <ChevronIcon />
          </button>
        </div>
      </div>
      <ul
        className="work-carousel-track"
        ref={trackRef}
        onPointerEnter={(e) => e.pointerType === "mouse" && (paused.current = true)}
        onPointerLeave={() => (paused.current = false)}
        onFocus={() => (paused.current = true)}
        onBlur={() => (paused.current = false)}
        onWheel={(e) => Math.abs(e.deltaX) > Math.abs(e.deltaY) && stop()}
        onTouchStart={stop}
        onPointerDown={(e) => e.pointerType !== "mouse" && stop()}
      >
        {works.map((w, i) => (
          <li key={w.id} data-vertical={!!w.vertical}>
            <WorkCard w={w} i={i + offset} total={total} onPlay={play} t={t} />
            <a className="meta work-sheet-link link-line" href={path(`/trabajo/${w.slug}`)}>
              {t.workSheet} →
            </a>
          </li>
        ))}
      </ul>
    </div>
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
