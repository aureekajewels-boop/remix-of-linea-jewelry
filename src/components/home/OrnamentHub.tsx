import { Link } from "react-router-dom";
import earringsImg from "@/assets/aureeka/earrings-kundan.jpg";
import necklacesImg from "@/assets/aureeka/necklaces.jpg";
import mangalsutraImg from "@/assets/aureeka/mangalsutra.jpg";
import ringsImg from "@/assets/aureeka/rings-ad.jpg";
import banglesImg from "@/assets/aureeka/bangles.jpg";
import ankletsImg from "@/assets/aureeka/anklets.jpg";

const categories = [
  { name: "Earrings", image: earringsImg, href: "/category/earrings", count: 250 },
  { name: "Necklaces", image: necklacesImg, href: "/category/necklaces", count: 180 },
  { name: "Mangalsutra", image: mangalsutraImg, href: "/category/mangalsutra", count: 95 },
  { name: "Rings", image: ringsImg, href: "/category/rings", count: 320 },
  { name: "Bangles", image: banglesImg, href: "/category/bangles", count: 150 },
  { name: "Anklets", image: ankletsImg, href: "/category/anklets", count: 75 },
];

const OrnamentHub = () => {
  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-3">
            Ornament Hub
          </h2>
          <p className="text-muted-foreground font-light max-w-xl mx-auto">
            Explore our curated collections of exquisite jewellery for every occasion
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative overflow-hidden rounded-lg aspect-square hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-display text-lg md:text-xl font-medium">
                  {category.name}
                </h3>
                <p className="text-xs text-white/80 font-light">
                  {category.count}+ designs
                </p>
              </div>

              {/* Hover shimmer effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shimmer" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrnamentHub;
