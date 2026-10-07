import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FilmicDefs from "../components/FilmicDefs";
import Lightbox from "../components/Lightbox";
import { useLang } from "../lib/i18n";
import { getPhotos } from "../lib/photos";

export async function getStaticProps() {
  return { props: { photos: getPhotos() } };
}

// 4 columns on desktop, 3 on tablets, 2 on phones (matches the CSS breakpoints).
function useColumns() {
  const [cols, setCols] = useState(4);
  useEffect(() => {
    const pick = () => setCols(window.innerWidth <= 560 ? 2 : window.innerWidth <= 1100 ? 3 : 4);
    pick();
    window.addEventListener("resize", pick);
    return () => window.removeEventListener("resize", pick);
  }, []);
  return cols;
}

export default function Photography({ photos }) {
  const { t } = useLang();
  const order = photos;
  const [open, setOpen] = useState(null);
  const cols = useColumns();

  // Masonry that reads left to right: photo i goes to column i % cols,
  // so the first photos sit across the top row.
  const columns = Array.from({ length: cols }, () => []);
  order.forEach((p, i) => columns[i % cols].push({ ...p, i }));

  const close = useCallback(() => setOpen(null), []);

  return (
    <>
      <Head>
        <title>{`${t.photoTitle} — Javier Llarena`}</title>
        <meta name="description" content={t.photoIntro} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0b0b0a" />
        <link rel="canonical" href="https://javierllarenafilms.com/fotografia" />
        {photos[0] && <meta property="og:image" content={`https://javierllarenafilms.com${photos[0].src}`} />}
      </Head>
      <FilmicDefs />
      <Header alwaysSolid />
      <main id="top" className="page">
        <section className="section photos" aria-labelledby="photo-title">
          <div className="section-head">
            <h1 id="photo-title" className="section-title">
              {t.photoTitle}
            </h1>
            <div className="section-aside">
              <span className="meta">{t.photoCount(photos.length)}</span>
            </div>
          </div>
          <p className="forum-intro">{t.photoIntro}</p>

          <div className="mosaic" style={{ "--cols": cols }}>
            {columns.map((col, c) => (
              <ul className="mosaic-col" key={c}>
                {col.map((p) => (
                  <li key={p.src}>
                    <button
                      type="button"
                      className="mosaic-item"
                      onClick={() => setOpen(p.i)}
                      aria-label={t.photoOpen(p.i + 1)}
                    >
                      <Image
                        src={p.src}
                        width={p.w}
                        height={p.h}
                        alt=""
                        sizes="(max-width: 560px) 50vw, (max-width: 1100px) 33vw, 25vw"
                        loading={p.i < 8 ? "eager" : "lazy"}
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <Lightbox photos={order} index={open} onIndex={setOpen} onClose={close} />
    </>
  );
}
