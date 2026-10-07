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

function shuffle(list) {
  const a = list.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Photography({ photos }) {
  const { t } = useLang();
  // Order is settled after hydration, so server and client render the same list first.
  const [order, setOrder] = useState(photos);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(null);

  // Dated photos keep their date order; undated ones are shuffled after them.
  useEffect(() => {
    const dated = photos.filter((p) => p.date);
    const undated = photos.filter((p) => !p.date);
    setOrder([...dated, ...shuffle(undated)]);
    setReady(true);
  }, [photos]);

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

          <ul className="mosaic" data-ready={ready}>
            {order.map((p, i) => (
              <li key={p.src}>
                <button type="button" className="mosaic-item" onClick={() => setOpen(i)} aria-label={t.photoOpen(i + 1)}>
                  <Image
                    src={p.src}
                    width={p.w}
                    height={p.h}
                    alt=""
                    sizes="(max-width: 560px) 50vw, (max-width: 1100px) 33vw, 25vw"
                    loading={i < 8 ? "eager" : "lazy"}
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
      <Lightbox photos={order} index={open} onIndex={setOpen} onClose={close} />
    </>
  );
}
