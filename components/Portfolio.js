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

  return (
    <section id="portfolio" className="py-12 px-6">
      <h2 className="text-3xl font-bold mb-6 text-white">Selected Work</h2>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {videoIds.map((id, index) => (
          <div key={index} className="aspect-video rounded-lg overflow-hidden shadow-2xl transform transition-transform hover:scale-105">
            <iframe
              src={`https://www.youtube.com/embed/${id}`}
              title={`Video ${index + 1}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        ))}
      </div>
    </section>
  );
}
