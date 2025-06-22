export default function Hero() {
  return (
    <section className="text-center py-20">
      <h1 className="text-4xl font-bold">Elevating Stories Through the Lens</h1>
      <p className="mt-4 max-w-xl mx-auto">
        I'm Javier Llarena, filmmaker, creative director and storyteller. Helping brands, creators and productions craft high-end visual experiences.
      </p>
      <button
        onClick={() => {
          document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
        }}
        className="mt-6 px-6 py-2 bg-black text-white rounded-full"
      >
        View Work
      </button>

    </section>
  );
}
