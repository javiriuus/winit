import { useEffect, useState } from "react";
import Image from "next/image";

const images = [
  "/images/000012.JPG",
  "/images/000026.JPG",
  "/images/000032.JPG",
  "/images/000063.JPG",
  "/images/000075.JPG",
  "/images/f28347648.jpg",
  "/images/f37777664.jpg",
  "/images/f51642112.jpg",
  "/images/f54933248.jpg",
  "/images/f63414272.jpg",
];

export default function BackgroundSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
      {/* Fondo de imágenes */}
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Slide ${index}`}
          fill
          className={`object-cover absolute transition-opacity duration-[3000ms] ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Capa negra encima */}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 z-10" />
    </div>
  );
}
