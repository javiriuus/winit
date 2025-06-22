import { FaVideo, FaCamera, FaEdit, FaPalette, FaBriefcase, FaCogs, FaUserTie, FaPenNib, FaFilm } from "react-icons/fa";

export default function Services() {
  const services = [
    {
      icon: <FaFilm size={24} />,
      title: "Film Director",
      description: "Creative direction of cinematic projects from concept to final delivery.",
    },
    {
      icon: <FaCamera size={24} />,
      title: "Director of Photography",
      description: "Mastery of visual aesthetics: framing, lighting, and image composition.",
    },
    {
      icon: <FaEdit size={24} />,
      title: "Video Editor",
      description: "Crafting smooth, compelling edits with strong narrative rhythm.",
    },
    {
      icon: <FaPalette size={24} />,
      title: "Colorist",
      description: "Professional color grading to achieve cinematic tone and visual style.",
    },
    {
      icon: <FaCamera size={24} />,
      title: "Photographer",
      description: "Capturing impactful stills for campaigns, portraits, and artistic projects.",
    },
    {
      icon: <FaUserTie size={24} />,
      title: "Producer",
      description: "Coordinating teams, schedules and resources to ensure smooth productions.",
    },
    {
      icon: <FaPenNib size={24} />,
      title: "Screenwriter",
      description: "Developing stories, scripts and screenplays with a strong narrative foundation.",
    },
    {
      icon: <FaBriefcase size={24} />,
      title: "Industry Experience",
      description: "Years of experience with brands, artists, and high-end productions.",
    },
    {
      icon: <FaCogs size={24} />,
      title: "Engineer",
      description: "Technical background applied to visual media: precision and structure.",
    },
  ];

  return (
    <section id="services" className="px-6 md:px-20 py-12 text-white">
      <h2 className="text-3xl font-bold text-center mb-12">Professional Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-start gap-4 transform transition-transform duration-300 hover:scale-105"
          >
            <div className="mt-1">{service.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-sm text-gray-300">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
