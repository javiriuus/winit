import { useEffect, useState } from "react";
import { useLang } from "../lib/i18n";
import { featuredWork, stills } from "../lib/content";
import { PlayIcon } from "./Icons";
import Thumb from "./Thumb";

const INTERVAL = 5200;

export default function Hero({ onPlay }) {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  // Frames are mounted progressively and kept, so a fading-out frame never disappears mid-fade.
  const [reached, setReached] = useState(1);

  useEffect(() => {
    setReached((r) => Math.max(r, Math.min(active + 1, stills.length - 1)));
  }, [active]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let id = setInterval(() => setActive((i) => (i + 1) % stills.length), INTERVAL);
    const onVisibility = () => {
      clearInterval(id);
      if (!document.hidden) id = setInterval(() => setActive((i) => (i + 1) % stills.length), INTERVAL);
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <section className="hero" id="top" aria-label="Javier Llarena">
      <div className="hero-media" aria-hidden="true">
        {stills.map((s, i) => {
          return (
            <div className="hero-frame" data-active={i === active} key={s.src}>
              {i <= reached && (
                <img
                  src={s.src}
                  alt=""
                  style={{ objectPosition: s.pos }}
                  fetchpriority={i === 0 ? "high" : "low"}
                  decoding="async"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="hero-inner">
        <div>
          <h1 className="hero-name">
            <span className="line">
              <span>Javier</span>
            </span>
            <span className="line">
              <span>Llarena</span>
            </span>
          </h1>
          <div className="hero-sub">
            <p className="hero-line">{t.heroLine}</p>
            <span className="meta hero-roles">{t.heroRoles}</span>
          </div>
        </div>

        <button type="button" className="featured" onClick={() => onPlay(featuredWork)}>
          <span className="featured-thumb">
            <Thumb id={featuredWork.id} eager />
            <span className="play-chip">
              <PlayIcon />
              <span className="play-text">{t.play}</span>
            </span>
          </span>
          <span className="featured-meta">
            <span className="featured-title">{featuredWork.title}</span>
            <span className="meta featured-kicker">{t.latest}</span>
          </span>
        </button>
      </div>
    </section>
  );
}
