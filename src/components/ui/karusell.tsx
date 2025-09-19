import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative max-w-6xl mx-auto px-4">
      {/* Bild */}
      <div className="relative">
        <img
          src={slides[current].src}
          alt={slides[current].title}
          className="w-full h-[500px] md:h-[700px] object-cover rounded-lg shadow-lg transition-all duration-500"
        />
        {/* Text-overlay */}
        {slides[current].title && (
          <div className="absolute bottom-8 left-8 bg-black/50 p-4 rounded">
            <h3 className="text-white text-2xl font-semibold">{slides[current].title}</h3>
            {slides[current].subtitle && (
              <p className="text-white text-sm">{slides[current].subtitle}</p>
            )}
          </div>
        )}
      </div>

      {/* Pilar */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
      >
        <ArrowLeft className="text-white h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full"
      >
        <ArrowRight className="text-white h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
