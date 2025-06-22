import Hero from "../components/Hero";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Credits from "../components/Credits";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import BackgroundSlideshow from "../components/BackgroundSlideshow";


export default function Home() {
  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden">
      <BackgroundSlideshow />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Services />
        <Portfolio />
        <Credits />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
