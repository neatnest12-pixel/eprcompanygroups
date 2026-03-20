import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function ImageGallery({ images = [], title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const safeImages = images.length ? images : ["/logo.png"];

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  const activeImage = safeImages[activeIndex] || safeImages[0];

  const showPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? safeImages.length - 1 : current - 1
    );
  };

  const showNext = () => {
    setActiveIndex((current) =>
      current === safeImages.length - 1 ? 0 : current + 1
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-xl shadow-md">
        <img
          src={activeImage}
          alt={`${title} property image ERP Group Company`}
          loading="lazy"
          className="h-[420px] w-full object-cover"
        />

        {safeImages.length > 1 ? (
          <>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-4 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-black/45 p-2 text-white transition hover:bg-black/65"
              aria-label="Show previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-4 top-1/2 inline-flex -translate-y-1/2 items-center justify-center rounded-full bg-black/45 p-2 text-white transition hover:bg-black/65"
              aria-label="Show next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/35 px-3 py-1.5">
              {safeImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    index === activeIndex ? "bg-white" : "bg-white/40"
                  }`}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {safeImages.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`overflow-hidden rounded-lg border-2 transition-all duration-300 ${
              activeIndex === index ? "border-orange-500" : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt={`${title} property image ${index + 1} ERP Group Company`}
              loading="lazy"
              className="h-24 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
