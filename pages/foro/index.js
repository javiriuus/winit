import Seo from "../../components/Seo";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import FilmicDefs from "../../components/FilmicDefs";
import PostDate from "../../components/PostDate";
import { useLang } from "../../lib/i18n";
import { getAllPosts } from "../../lib/posts";
import { responsive } from "../../lib/img";

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
  const { lang, t, path } = useLang();

  return (
    <>
      <Seo
        title={`${t.forumTitle} — Javier Llarena`}
        description={t.forumIntro}
        path="/foro"
        image={posts[0] && posts[0].cover}
      />
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
                    <a className="post-card" href={path(`/foro/${p.slug}`)}>
                      {p.cover && (
                        <span className="post-card-cover">
                          <img {...responsive(p.cover, "(max-width: 760px) 100vw, 40vw", [640, 1080])} alt="" loading="lazy" decoding="async" />
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
