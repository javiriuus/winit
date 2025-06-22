export default function Services() {
  const services = [
    {
      title: "Tech meets artistry",
      description: "High-end production meets narrative clarity and compelling visuals.",
    },
    {
      title: "Social & cinematic",
      description: "From social media content to cinematic pieces for campaigns and films.",
    },
    {
      title: "Full production support",
      description: "From concept to postproduction, including directing, shooting, editing, color & sound.",
    },
  ];

  return (
    <section className="grid md:grid-cols-3 gap-8 px-6 py-12">
      {services.map((s, i) => (
        <div key={i} className="border p-4 rounded-xl shadow">
          <h3 className="font-bold text-xl mb-2">{s.title}</h3>
          <p>{s.description}</p>
        </div>
      ))}
    </section>
  );
}
