import { useCallback, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilmicDefs from "../../components/FilmicDefs";
import Seo from "../../components/Seo";
import Thumb from "../../components/Thumb";
import Roles from "../../components/Roles";
import WorkDetails from "../../components/WorkDetails";
import Lightbox from "../../components/Lightbox";
import { PlayIcon, ArrowIcon } from "../../components/Icons";
import { useLang } from "../../lib/i18n";
import { embedFor, thumbFor, watchUrlFor } from "../../lib/content";
import { resolveWorks, uploadDateOf } from "../../lib/resolve-works";
import { SITE, PERSON_ID, ORG_ID, graph, breadcrumbs } from "../../lib/schema";

export async function getStaticPaths({ locales = ["es"] }) {
  const works = await resolveWorks();
  return {
    paths: works.flatMap((w) => locales.map((locale) => ({ params: { slug: w.slug }, locale }))),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const works = await resolveWorks();
  const i = works.findIndex((w) => w.slug === params.slug);
  if (i < 0) return { notFound: true };
  const work = { ...works[i], uploadDate: (await uploadDateOf(works[i])) || null };
  const pick = (w) => ({ slug: w.slug, title: w.title });
  return {
    props: {
      work,
      prev: pick(works[(i - 1 + works.length) % works.length]),
      next: pick(works[(i + 1) % works.length]),
    },
    revalidate: 86400,
  };
}

// The stills are 3:2 exports at 1600 px.
const stillSize = { w: 1600, h: 1067 };

export default function WorkPage({ work, prev, next }) {
  const { lang, t, path } = useLang();
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  const roles = work.roles.map((r) => t.roles[r] || r).join(", ");
  const description = work.synopsis ? work.synopsis[lang] : t.workDescription(work.title, roles);
  const url = SITE + path(`/trabajo/${work.slug}`);
  const image = thumbFor(work) || undefined;
  const photos = (work.stills || []).map((src) => ({ src, ...stillSize }));

  // Short films are described as films; everything else as the video itself.
  const creative = work.synopsis
    ? {
        "@type": "Movie",
        name: work.title,
        description,
        image,
        url,
        director: { "@id": PERSON_ID },
        productionCompany: { "@id": ORG_ID },
        ...(work.selections ? { award: work.selections.map((f) => (lang === "en" ? `Official selection, ${f}` : `Selección oficial, ${f}`)) } : {}),
        ...(work.uploadDate ? { dateCreated: work.uploadDate } : {}),
        trailer: video(),
      }
    : video();

  function video() {
    if (!work.uploadDate) return { "@type": "CreativeWork", name: work.title, description, image, url, creator: { "@id": PERSON_ID } };
    return {
      "@type": "VideoObject",
      name: work.title,
      description,
      thumbnailUrl: image,
      uploadDate: work.uploadDate,
      embedUrl: embedFor(work).split("?")[0],
      url: watchUrlFor(work),
      creator: { "@id": PERSON_ID },
    };
  }

  return (
    <>
      <Seo
        title={`${work.title} — Javier Llarena`}
        description={description}
        path={`/trabajo/${work.slug}`}
        image={image}
        imageAlt={work.title}
        type={work.synopsis ? "video.movie" : "video.other"}
        jsonLd={graph(
          creative,
          breadcrumbs([
            { name: "Javier Llarena", url: SITE + path("/") },
            { name: t.workTitle, url: SITE + path("/#work") },
            { name: work.title, url },
          ])
        )}
      />
      <FilmicDefs />
      <Header alwaysSolid />
      <main id="top" className="page">
        <article className="section work-page">
          <a href={path("/#work")} className="meta post-back link-line">
            ← {t.backToWork}
          </a>
          <header className="work-page-head">
            <h1 className="work-page-title">{work.title}</h1>
            <p className="work-page-roles">
              <span className="meta">{t.rolesLabel}</span>
              <Roles roles={work.roles} />
            </p>
          </header>

          <div className="work-page-frame" data-vertical={!!work.vertical}>
            {playing ? (
              <iframe
                src={embedFor(work)}
                title={work.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
              />
            ) : (
              <button type="button" className="work-page-play" onClick={() => setPlaying(true)}>
                <Thumb work={work} eager alt="" />
                <span className="play-chip">
                  <PlayIcon />
                  <span className="play-text">{t.play}</span>
                </span>
              </button>
            )}
          </div>

          <WorkDetails w={work} onStill={(src) => setOpen(work.stills.indexOf(src))} />

          <aside className="work-cta" aria-labelledby="work-cta-title">
            <h2 id="work-cta-title" className="work-cta-title">
              {t.workCtaTitle}
            </h2>
            <p>{t.workCtaText}</p>
            <a className="btn" href={path("/#contact")}>
              {t.workCtaButton}
              <ArrowIcon size={16} />
            </a>
          </aside>

          <nav className="work-pager" aria-label={t.moreWork}>
            <a href={path(`/trabajo/${prev.slug}`)} className="work-pager-link">
              <span className="meta">← {t.prev}</span>
              <span className="work-pager-title">{prev.title}</span>
            </a>
            <a href={path(`/trabajo/${next.slug}`)} className="work-pager-link work-pager-next">
              <span className="meta">{t.next} →</span>
              <span className="work-pager-title">{next.title}</span>
            </a>
          </nav>
        </article>
      </main>
      <Footer />
      <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={close} />
    </>
  );
}
