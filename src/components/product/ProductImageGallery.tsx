// import { useState, useRef } from "react";
// import ImageZoom from "./ImageZoom";
// import pantheonImage from "@/assets/pantheon.jpg";
// import eclipseImage from "@/assets/eclipse.jpg";
// import haloImage from "@/assets/halo.jpg";
// import organicEarring from "@/assets/organic-earring.png";
// import linkBracelet from "@/assets/link-bracelet.png";

// const productImages = [
//   pantheonImage,
//   organicEarring,
//   eclipseImage,
//   linkBracelet,
//   haloImage,
// ];

// const ProductImageGallery = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isZoomOpen, setIsZoomOpen] = useState(false);
//   const [zoomInitialIndex, setZoomInitialIndex] = useState(0);
//   const touchStartX = useRef<number | null>(null);
//   const touchEndX = useRef<number | null>(null);

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
//   };

//   const handleImageClick = (index: number) => {
//     setZoomInitialIndex(index);
//     setIsZoomOpen(true);
//   };

//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX;
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     touchEndX.current = e.touches[0].clientX;
//   };

//   const handleTouchEnd = () => {
//     if (!touchStartX.current || !touchEndX.current) return;

//     const difference = touchStartX.current - touchEndX.current;
//     const minSwipeDistance = 50;

//     if (Math.abs(difference) > minSwipeDistance) {
//       if (difference > 0) {
//         // Swipe left - next image
//         nextImage();
//       } else {
//         // Swipe right - previous image
//         prevImage();
//       }
//     }

//     touchStartX.current = null;
//     touchEndX.current = null;
//   };

//   return (
//     <div className="w-full">
//       {/* Desktop: Vertical scrolling gallery (1024px and above) */}
//       <div className="hidden lg:block">
//         <div className="space-y-4">
//           {productImages.map((image, index) => (
//             <div 
//               key={index} 
//               className="w-full aspect-square overflow-hidden cursor-pointer group"
//               onClick={() => handleImageClick(index)}
//             >
//               <img
//                 src={image}
//                 alt={`Product view ${index + 1}`}
//                 className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Tablet/Mobile: Image slider (below 1024px) */}
//       <div className="lg:hidden">
//         <div className="relative">
//           <div 
//             className="w-full aspect-square overflow-hidden cursor-pointer group touch-pan-y"
//             onClick={() => handleImageClick(currentImageIndex)}
//             onTouchStart={handleTouchStart}
//             onTouchMove={handleTouchMove}
//             onTouchEnd={handleTouchEnd}
//           >
//             <img
//               src={productImages[currentImageIndex]}
//               alt={`Product view ${currentImageIndex + 1}`}
//               className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 select-none"
//             />
//           </div>

//           {/* Dots indicator */}
//           <div className="flex justify-center mt-4 gap-2">
//             {productImages.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentImageIndex(index)}
//                 className={`w-2 h-2 rounded-full transition-colors ${
//                   index === currentImageIndex ? 'bg-foreground' : 'bg-muted'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Image Zoom Modal */}
//       <ImageZoom
//         images={productImages}
//         initialIndex={zoomInitialIndex}
//         isOpen={isZoomOpen}
//         onClose={() => setIsZoomOpen(false)}
//       />
//     </div>
//   );
// };

// export default ProductImageGallery;
import { useState, useRef, useEffect } from "react";
import ImageZoom from "./ImageZoom";

interface ProductImageGalleryProps {
  product: any;
}

const ProductImageGallery = ({ product }: ProductImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [desktopCurrentIndex, setDesktopCurrentIndex] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const desktopSliderRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const desktopAutoplayRef = useRef<NodeJS.Timeout | null>(null);

  // Extract product images from product data
  const productImages = product?.images_full_url?.map((img: any) => img.path) || [];

  // Autoplay configuration
  const AUTOPLAY_INTERVAL = 3000; // 3 seconds between slides

  /* ================= MOBILE/TABLET AUTOPLAY ================= */
  useEffect(() => {
    // Only enable autoplay if there are multiple images and not paused
    if (productImages.length <= 1 || isAutoplayPaused || isZoomOpen) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const startAutoplay = () => {
      autoplayIntervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % productImages.length;

          // Scroll to next image on mobile/tablet
          if (sliderRef.current) {
            sliderRef.current.scrollTo({
              left: nextIndex * (sliderRef.current.clientWidth || 0),
              behavior: "smooth",
            });
          }

          return nextIndex;
        });
      }, AUTOPLAY_INTERVAL);
    };

    startAutoplay();

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [productImages.length, isAutoplayPaused, isZoomOpen]);

  /* ================= DESKTOP AUTOPLAY ================= */
  useEffect(() => {
    // Only enable autoplay if there are multiple images and not paused
    if (productImages.length <= 1 || isAutoplayPaused || isZoomOpen) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const startDesktopAutoplay = () => {
      desktopAutoplayRef.current = setInterval(() => {
        setDesktopCurrentIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % productImages.length;

          // Horizontal smooth scroll on desktop
          if (desktopSliderRef.current) {
            desktopSliderRef.current.scrollTo({
              left: nextIndex * (desktopSliderRef.current.clientWidth || 0),
              behavior: "smooth",
            });
          }

          return nextIndex;
        });
      }, AUTOPLAY_INTERVAL);
    };

    startDesktopAutoplay();

    return () => {
      if (desktopAutoplayRef.current) {
        clearInterval(desktopAutoplayRef.current);
      }
    };
  }, [productImages.length, isAutoplayPaused, isZoomOpen]);

  /* ================= SYNC DOTS ON SCROLL - MOBILE ================= */
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const index = Math.round(
        slider.scrollLeft / slider.clientWidth
      );
      setCurrentIndex(index);
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= SYNC DOTS ON SCROLL - DESKTOP ================= */
  useEffect(() => {
    const slider = desktopSliderRef.current;
    if (!slider) return;

    const handleScroll = () => {
      const index = Math.round(
        slider.scrollLeft / slider.clientWidth
      );
      setDesktopCurrentIndex(index);
    };

    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, []);

  const openZoom = (index: number) => {
    setZoomIndex(index);
    setIsZoomOpen(true);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    sliderRef.current?.scrollTo({
      left: index * (sliderRef.current?.clientWidth || 0),
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ================= DESKTOP - HORIZONTAL CAROUSEL ================= */}
      <div className="hidden lg:block">
        <div
          ref={desktopSliderRef}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth"
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
        >
          {productImages.map((img, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 snap-center cursor-pointer overflow-hidden"
              style={{ aspectRatio: '3/4', maxHeight: '580px' }}
              onClick={() => openZoom(index)}
            >
              <img
                src={img}
                alt={`Product ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* Desktop Dots Navigation */}
        <div className="mt-4 flex justify-center gap-2">
          {productImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDesktopCurrentIndex(index);
                desktopSliderRef.current?.scrollTo({
                  left: index * (desktopSliderRef.current?.clientWidth || 0),
                  behavior: "smooth",
                });
              }}
              className={`h-2 w-2 rounded-full transition-colors ${desktopCurrentIndex === index
                ? "bg-foreground"
                : "bg-muted"
                }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ================= MOBILE / TABLET ================= */}
      <div className="lg:hidden">
        <div
          ref={sliderRef}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth"
          onMouseEnter={() => setIsAutoplayPaused(true)}
          onMouseLeave={() => setIsAutoplayPaused(false)}
          onTouchStart={() => setIsAutoplayPaused(true)}
          onTouchEnd={() => setIsAutoplayPaused(false)}
        >
          {productImages.map((img, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 snap-center"
              style={{ aspectRatio: '3/4', maxHeight: '480px' }}
              onClick={() => openZoom(index)}
            >
              <img
                src={img}
                alt={`Product ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {productImages.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-2 w-2 rounded-full transition-colors ${currentIndex === index
                ? "bg-foreground"
                : "bg-muted"
                }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ================= ZOOM ================= */}
      <ImageZoom
        images={productImages}
        initialIndex={zoomIndex}
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
      />
    </div>
  );
};

export default ProductImageGallery;
