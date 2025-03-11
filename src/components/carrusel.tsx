import Image from "next/image";
import { useEffect, useState } from "react";

const CARRUSEL_DURATION = 5 * 1000; // 5s

export default function Carousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, CARRUSEL_DURATION);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute w-[60vw] h-[60vh] transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img}
            alt={`Slide ${index + 1}`}
            layout="fill"
            objectFit="contain"
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      ))}

      {/* Indicadores */}
      <div className="absolute bottom-4 flex space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 mx-1! rounded-full bg-[var(--foreground)] transition ${
              index === currentIndex ? "opacity-100" : "opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
