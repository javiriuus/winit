import { useCallback, useState } from "react";
import Seo from "../../components/Seo";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilmicDefs from "../../components/FilmicDefs";
import PostDate from "../../components/PostDate";
import Lightbox from "../../components/Lightbox";
import { useLang } from "../../lib/i18n";
import { getAllPosts, getPost } from "../../lib/posts";
import { responsive } from "../../lib/img";
import { SITE, PERSON_ID, ORG_ID, graph } from "../../lib/schema";

export async function getStaticPaths({ locales = ["es"] }) {
  return {
    paths: getAllPosts().flatMap((p) => locales.map((locale) => ({ params: { slug: p.slug }, locale }))),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return { props: { post: getPost(params.slug) } };
}

export default function Post({ post }) {
  const { lang, t, path } = useLang();
  const v = (lang === "en" && post.en) || post.es;
  const fellBack = lang === "en" && !post.en;
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  // Any photo in the body opens the lightbox, with every body photo in order.
  const onBodyClick = (e) => {
    const img = e.target.closest("img");
    if (!img) return;
    const imgs = [...e.currentTarget.querySelectorAll("img[width][height]")];
    const i = imgs.indexOf(img);
    if (i < 0) return;
    setPhotos(imgs.map((el) => ({ src: el.dataset.full || el.getAttribute("src"), w: +el.getAttribute("width"), h: +el.getAttribute("height") })));
    setOpen(i);
  };

  return (
    <>
      <Seo
        title={`${v.title} — Javier Llarena`}
        description={v.excerpt}
        path={`/foro/${post.slug}`}
        image={post.cover}
        imageAlt={v.title}
        type="article"
        english={!!post.en}
        jsonLd={graph({
          "@type": "BlogPosting",
          headline: v.title,
          description: v.excerpt,
          datePublished: post.date,
          inLanguage: fellBack ? "es" : lang,
          image: post.cover ? SITE + post.cover : undefined,
          url: SITE + path(`/foro/${post.slug}`),
          author: { "@id": PERSON_ID },
          publisher: { "@id": ORG_ID },
        })}
      />
      <FilmicDefs />
      <Header alwaysSolid />
      <main id="top" className="page">
        <article className="section post">
          <a href={path("/foro")} className="meta post-back link-line">
            ← {t.backToForum}
          </a>
          <header className="post-head">
            <PostDate date={post.date} className="post-date" />
            <h1 className="post-title">{v.title}</h1>
          </header>
          {post.cover && (
            <figure className="post-cover">
              <img {...responsive(post.cover, "(max-width: 1100px) 100vw, 64rem", [828, 1200, 1920])} alt="" decoding="async" />
            </figure>
          )}
          {fellBack && <p className="meta post-note">{t.onlySpanish}</p>}
          <div className="post-body" onClick={onBodyClick} dangerouslySetInnerHTML={{ __html: v.html }} />
          <a href={path("/foro")} className="meta post-back post-back-end link-line">
            ← {t.backToForum}
          </a>
        </article>
      </main>
      <Footer />
      <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={close} />
    </>
  );
}
