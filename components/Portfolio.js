export default function Portfolio() {
  const videoIds = [
    "xUCmm-Ok4Bc",
    "Waf-QiBDYzk",
    "yJXVszisGY8",
    "ARZivn1zl1w",
    "aluL0g5vKYo",
    "J74Wtc5tvGA",
    "6oN7p1lFUac",
    "lCZf0F5PbqY",
  ];

  const titles = [
    "La belleza del caos",
    "Valdo - Me gustas más que dormir",
    "Aún Recuerdo",
    "TÓXICO",
    "Te he vuelto a ver",
    "PRENDE EL BLON",
    "Miénteme Como Sabes",
  ];

  return (
    <section id="portfolio" className="py-12 px-6 md:px-16 lg:px-24">
      <h2 className="text-3xl font-bold mb-6 text-white">Selected Work</h2>
      <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-2">
        {videoIds.map((id, index) => (
          <div key={index} className="rounded-lg bg-black/60 backdrop-blur-md p-4 shadow-xl">
            <div className="aspect-video overflow-hidden rounded">
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title={`Video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <p className="text-white text-center mt-2 text-sm">{titles[index]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
