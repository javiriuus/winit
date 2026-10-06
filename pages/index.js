import { useCallback, useState } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Portfolio from "../components/Portfolio";
import About from "../components/About";
import Services from "../components/Services";
import OnSet from "../components/OnSet";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Player from "../components/Player";
import { useLang } from "../lib/i18n";
import { featuredOf } from "../lib/content";
import { resolveWorks } from "../lib/resolve-works";

export async function getStaticProps() {
  return { props: { works: await resolveWorks() }, revalidate: 86400 };
}

export default function Home({ works }) {
  const { t } = useLang();
  const [playing, setPlaying] = useState(null);
  const close = useCallback(() => setPlaying(null), []);

  return (
    <>
      <Head>
        <title>Javier Llarena — Director</title>
        <meta
          name="description"
          content="Javier Llarena, cineasta, director creativo y director de fotografía. Videoclips, cortometrajes y contenido de marca."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0b0b0a" />
        <meta property="og:title" content="Javier Llarena — Director" />
        <meta property="og:image" content="/images/000026.JPG" />
      </Head>

      <a className="skip" href="#work">
        {t.skip}
      </a>
      <Header />
      <main>
        <Hero featured={featuredOf(works)} onPlay={setPlaying} />
        <Portfolio works={works} onPlay={setPlaying} />
        <About />
        <Services />
        <OnSet />
        <Contact />
      </main>
      <Footer />
      <Player work={playing} onClose={close} />
    </>
  );
}
