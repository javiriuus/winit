export default function Portfolio() {
  const videos = [
    "https://www.youtube.com/watch?v=Waf-QiBDYzk",
    "https://youtu.be/yJXVszisGY8",
    "https://youtu.be/ARZivn1zl1w",
    "https://www.youtube.com/watch?v=aluL0g5vKYo",
    "https://www.youtube.com/watch?v=J74Wtc5tvGA",
    "https://www.youtube.com/watch?v=6oN7p1lFUac",
    "https://www.youtube.com/watch?v=lCZf0F5PbqY",
  ];

  return (
    <section id="portfolio" className="py-12 px-6">
      <h2 className="text-3xl font-bold mb-6 text-white">Selected Work</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {videos.map((url, index) => (
          <div key={index} className="aspect-video rounded overflow-hidden shadow-lg">
            <iframe
              src={url}
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
