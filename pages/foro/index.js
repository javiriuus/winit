import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilmicDefs from "../../components/FilmicDefs";
import PostDate from "../../components/PostDate";
import { useLang } from "../../lib/i18n";
import { getAllPosts } from "../../lib/posts";

export async function getStaticProps() {
  const posts = getAllPosts().map(({ slug, date, cover, es, en }) => ({
    slug,
    date,
    cover,
    es: { title: es.title, excerpt: es.excerpt },
    en: en ? { title: en.title, excerpt: en.excerpt } : null,
  }));
  return { props: { posts } };
}

export default function Forum({ posts }) {
  const { lang, t } = useLang();

  return (
    <>
      <Head>
        <title>{`${t.forumTitle} — Javier Llarena`}</title>
        <meta name="description" content={t.forumIntro} />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0b0b0a" />
        <link rel="canonical" href="https://javierllarenafilms.com/foro" />
      </Head>
      <FilmicDefs />
      <Header alwaysSolid />
      <main id="top" className="page">
        <section className="section forum" aria-labelledby="forum-title">
          <div className="section-head">
            <h1 id="forum-title" className="section-title">
              {t.forumTitle}
            </h1>
          </div>
          <p className="forum-intro">{t.forumIntro}</p>

          {posts.length === 0 ? (
            <p className="forum-empty">{t.forumEmpty}</p>
          ) : (
            <ul className="post-list">
              {posts.map((p) => {
                const v = (lang === "en" && p.en) || p.es;
                return (
                  <li key={p.slug}>
                    <a className="post-card" href={`/foro/${p.slug}`}>
                      {p.cover && (
                        <span className="post-card-cover">
                          <img src={p.cover} alt="" loading="lazy" decoding="async" />
                        </span>
                      )}
                      <span className="post-card-text">
                        <PostDate date={p.date} className="post-date" />
                        <span className="post-card-title">{v.title}</span>
                        <span className="post-card-excerpt">{v.excerpt}</span>
                        <span className="meta post-card-more">{t.readPost} →</span>
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
