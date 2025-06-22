export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-white text-center px-4 py-32">
      <h1 className="text-5xl md:text-5xl font-bold mb-6">Elevating Stories Through the Lens</h1>
      <p className="mt-4 md:text-xl max-w-xl mx-auto">
        I'm Javier Llarena, filmmaker, creative director and storyteller. Helping brands, creators and productions craft high-end visual experiences.
      </p>
      <button
        onClick={() => {
          document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="mt-6 px-6 py-2 bg-white text-black rounded-full"
      >
        View my work
      </button>

    </section>
  );
}
