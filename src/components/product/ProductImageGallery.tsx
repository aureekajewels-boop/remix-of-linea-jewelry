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

import pantheonImage from "@/assets/pantheon.jpg";
import eclipseImage from "@/assets/eclipse.jpg";
import haloImage from "@/assets/halo.jpg";
import organicEarring from "@/assets/organic-earring.png";
import linkBracelet from "@/assets/link-bracelet.png";

const productImages = [
  pantheonImage,
  organicEarring,
  eclipseImage,
  linkBracelet,
  haloImage,
];

const ProductImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  /* ================= SYNC DOTS ON SCROLL ================= */
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

  const openZoom = (index: number) => {
    setZoomIndex(index);
    setIsZoomOpen(true);
  };

  return (
    <div className="w-full">
      {/* ================= DESKTOP ================= */}
      <div className="hidden lg:block space-y-4">
        {productImages.map((img, index) => (
          <div
            key={index}
            className="aspect-square cursor-pointer overflow-hidden"
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

      {/* ================= MOBILE / TABLET ================= */}
      <div className="lg:hidden">
        <div
          ref={sliderRef}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth"
        >
          {productImages.map((img, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 snap-center"
              onClick={() => openZoom(index)}
            >
              <img
                src={img}
                alt={`Product ${index + 1}`}
                className="aspect-square w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-4 flex justify-center gap-2">
          {productImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                sliderRef.current?.scrollTo({
                  left:
                    index *
                    (sliderRef.current?.clientWidth || 0),
                  behavior: "smooth",
                });
              }}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentIndex === index
                  ? "bg-foreground"
                  : "bg-muted"
              }`}
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
