import { useEffect, useRef, useState } from "react";

function ImageCarousel() {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "./src/assets/Ceilng-fan.jpg",
    "./src/assets/Switches.jpg",
    "./src/assets/Irons.jpg",
    "./src/assets/Bulbs.webp",
    "./src/assets/Wires.jpg",
  ];

  const totalSlides = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === totalSlides ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      if (currentIndex === totalSlides) {
        // Reset to first slide instantly (no animation)
        slider.style.transition = "none";
        slider.style.transform = `translateX(0%)`;
        setCurrentIndex(0);
      } else {
        // Animate to next slide
        slider.style.transition = "transform 0.7s linear";
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
      }
    }
  }, [currentIndex, totalSlides]);

  return (
    <div className="w-full h-60 sm:h-120 border-y-[0.5px] relative overflow-hidden transition-all">
      <div
        ref={sliderRef}
        className="flex w-full h-full transition-transform duration-700 ease-linear absolute"
      >
        {[...images, ...images].map((src, index) => (
          <div className="w-full flex-shrink-0" key={index}>
            <img
              src={src}
              alt={`Slide-${index + 1}`}
              className="w-full h-full object-fill md:object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageCarousel;
