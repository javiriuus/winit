import { useCallback, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import About from "../components/About";
import Services from "../components/Services";
import Studio, { faqSchema } from "../components/Studio";
import OnSet from "../components/OnSet";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Player from "../components/Player";
import FilmicDefs from "../components/FilmicDefs";
import Seo from "../components/Seo";
import { graph, organization, person, website } from "../lib/schema";
import { useLang } from "../lib/i18n";
import { featuredOf } from "../lib/content";
import { resolveWorks } from "../lib/resolve-works";

export async function getStaticProps() {
  return { props: { works: await resolveWorks() }, revalidate: 86400 };
}

export default function Home({ works }) {
  const { lang, t } = useLang();
  const [playing, setPlaying] = useState(null);
  const close = useCallback(() => setPlaying(null), []);

  return (
    <>
      <Seo
        title={t.homeTitle}
        description={t.homeDescription}
        path="/"
        jsonLd={graph(website(), organization(lang), person(lang), faqSchema(t))}
      />

      <FilmicDefs />
      <a className="skip" href="#work">
        {t.skip}
      </a>
      <Header />
      <main>
        <Hero featured={featuredOf(works)} onPlay={setPlaying} />
        <Portfolio works={works} onPlay={setPlaying} />
        <About />
        <Services />
        <Studio />
        <OnSet />
        <Contact />
      </main>
      <Footer />
      <Player work={playing} onClose={close} />
    </>
  );
}
