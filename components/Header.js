import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/50 text-white px-6 py-4 flex justify-between items-center">
      {/* Logo + Nombre */}
      <div className="flex items-center space-x-4">
        <Image src="/logo.png" alt="Logo" width={80} height={80} />
        <span className="text-xl font-bold">WinitMoney</span>
      </div>

      {/* Navegación */}
      <nav className="hidden md:flex space-x-6">
        <a href="#hero" className="hover:underline scroll-smooth">Home</a>
        <a href="#services" className="hover:underline scroll-smooth">Services</a>
        <a href="#portfolio" className="hover:underline scroll-smooth">Work</a>
        <a href="#contact" className="hover:underline scroll-smooth">Contact</a>
      </nav>

      {/* Redes sociales */}
      <div className="flex space-x-4">
        <a href="https://www.instagram.com/javierllarenafilms/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-xl hover:scale-110 transition" />
        </a>
        <a href="https://www.youtube.com/@javirius5294" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="text-xl hover:scale-110 transition" />
        </a>
        <a href="https://www.linkedin.com/in/javier-llarena-s%C3%A1nchez-33b7371b9/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin className="text-xl hover:scale-110 transition" />
        </a>
      </div>
    </header>
  );
}
