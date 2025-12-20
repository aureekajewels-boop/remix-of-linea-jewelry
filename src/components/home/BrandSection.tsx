import { Link } from "react-router-dom";
import kundanImg from "@/assets/aureeka/kundan-necklace.jpg";
import adImg from "@/assets/aureeka/ad-bracelet.jpg";
import koreanImg from "@/assets/aureeka/korean-earrings.jpg";
import oxidisedImg from "@/assets/aureeka/oxidised-earrings.jpg";

const brands = [
  {
    name: "Kundan Jewellery",
    description: "Traditional elegance with precious stones",
    image: kundanImg,
    href: "/brand/kundan",
    accent: "from-amber-500/20",
  },
  {
    name: "American Diamond",
    description: "Sparkle like diamonds at affordable prices",
    image: adImg,
    href: "/brand/american-diamond",
    accent: "from-blue-500/20",
  },
  {
    name: "Korean Jewellery",
    description: "Minimalist designs for modern style",
    image: koreanImg,
    href: "/brand/korean",
    accent: "from-pink-500/20",
  },
  {
    name: "Oxidised Jewellery",
    description: "Vintage charm with antique finish",
    image: oxidisedImg,
    href: "/brand/oxidised",
    accent: "from-gray-500/20",
  },
];

const BrandSection = () => {
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">
            Shop by Style
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-3">
            Jewellery Brands
          </h2>
          <p className="text-muted-foreground font-light max-w-xl mx-auto">
            From traditional kundan to trendy Korean styles, find your perfect match
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <Link
              key={brand.name}
              to={brand.href}
              className="group relative bg-card rounded-xl overflow-hidden shadow-soft hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image Container */}
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-t ${brand.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
                <h3 className="font-display text-xl text-white font-medium mb-1">
                  {brand.name}
                </h3>
                <p className="text-white/70 text-sm font-light">
                  {brand.description}
                </p>
              </div>

              {/* Hover arrow indicator */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
