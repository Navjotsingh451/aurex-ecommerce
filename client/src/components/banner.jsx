import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Banner() {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:45690/api/hero"
        );

        const activeSlides = data
          .filter((slide) => slide.isActive)
          .sort((a, b) => a.order - b.order);

        setSlides(activeSlides);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  if (slides.length === 0) return null;

  return (
    <section className="relative h-[90vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide._id}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={`http://localhost:45690/uploads/${slide.image}`}
            alt={slide.title}
            className="w-full h-full object-cover"
            
          />

          <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center text-white px-6">
            <p className="text-lg mb-3 tracking-wide text-gray-200">
              {slide.subtitle}
            </p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {slide.title}
            </h1>

            <button className="mt-8 bg-white text-black px-8 py-3 font-semibold rounded-md hover:bg-gray-200 transition">
              SHOP NOW
            </button>
          </div>
        </div>
      ))}

      {/* Left Arrow */}
      <button
        onClick={() =>
          setCurrentSlide(
            currentSlide === 0
              ? slides.length - 1
              : currentSlide - 1
          )
        }
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-3 rounded-full hover:bg-black/80 transition"
      >
        {<ChevronLeft size={20} />}
      </button>

      {/* Right Arrow */}
      <button
        onClick={() =>
          setCurrentSlide(
            currentSlide === slides.length - 1
              ? 0
              : currentSlide + 1
          )
        }
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-3 rounded-full hover:bg-black/80 transition"
      >
      {<ChevronRight size={20} />}
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white scale-125"
                : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default Banner;