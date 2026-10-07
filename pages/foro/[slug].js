import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilmicDefs from "../../components/FilmicDefs";
import PostDate from "../../components/PostDate";
import { useLang } from "../../lib/i18n";
import { getAllPosts, getPost } from "../../lib/posts";

export async function getStaticPaths() {
  return { paths: getAllPosts().map((p) => ({ params: { slug: p.slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { post: getPost(params.slug) } };
}

export default function Post({ post }) {
  const { lang, t } = useLang();
  const v = (lang === "en" && post.en) || post.es;
  const fellBack = lang === "en" && !post.en;

  return (
    <>
      <Head>
        <title>{`${v.title} — Javier Llarena`}</title>
        <meta name="description" content={v.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0b0b0a" />
        <link rel="canonical" href={`https://javierllarenafilms.com/foro/${post.slug}`} />
        <meta property="og:title" content={v.title} />
        <meta property="og:description" content={v.excerpt} />
        <meta property="og:type" content="article" />
        {post.cover && <meta property="og:image" content={`https://javierllarenafilms.com${post.cover}`} />}
      </Head>
      <FilmicDefs />
      <Header alwaysSolid />
      <main id="top" className="page">
        <article className="section post">
          <a href="/foro" className="meta post-back link-line">
            ← {t.backToForum}
          </a>
          <header className="post-head">
            <PostDate date={post.date} className="post-date" />
            <h1 className="post-title">{v.title}</h1>
          </header>
          {post.cover && (
            <figure className="post-cover">
              <img src={post.cover} alt="" decoding="async" />
            </figure>
          )}
          {fellBack && <p className="meta post-note">{t.onlySpanish}</p>}
          <div className="post-body" dangerouslySetInnerHTML={{ __html: v.html }} />
          <a href="/foro" className="meta post-back post-back-end link-line">
            ← {t.backToForum}
          </a>
        </article>
      </main>
      <Footer />
    </>
  );
}
