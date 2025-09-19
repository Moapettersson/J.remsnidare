import { useState, useRef, useEffect } from "react";

const Carousel = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const slideRef = useRef(null);
  const total = slides.length;

  const nextSlide = () => setCurrent(current === total - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? total - 1 : current - 1);

  const [slideWidth, setSlideWidth] = useState(0);

  // Beräkna slide-bredd dynamiskt
  useEffect(() => {
    if (slideRef.current) {
      setSlideWidth(slideRef.current.offsetWidth + 16); // 16px = gap
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${current * slideWidth}px)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={index === 1 ? slideRef : null}
            className="flex-shrink-0 w-[35%] mr-4 relative"
            style={{
              filter: index === current ? "none" : "blur(5px)",
              transform: index === current ? "scale(1)" : "scale(0.95)",
              transition: "all 0.5s ease",
            }}
          >
            <img
              src={slide.src}
              alt={slide.title}
              className="w-full aspect-square object-cover rounded-lg shadow-lg"
            />
            <div className="absolute bottom-2 left-2 text-white text-left">
              <h3 className="text-lg md:text-xl font-bold">{slide.title}</h3>
              <p className="text-sm md:text-lg">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 z-10"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 z-10"
      >
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
