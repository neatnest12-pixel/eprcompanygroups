import { useState } from "react";

export default function ImageGallery({ images = [], title }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      <img
        src={activeImage}
        alt={title}
        loading="lazy"
        className="h-[420px] w-full rounded-xl object-cover shadow-md"
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`overflow-hidden rounded-lg border-2 transition-all duration-300 ${
              activeImage === image ? "border-orange-500" : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt={title}
              loading="lazy"
              className="h-24 w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
