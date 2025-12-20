import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Import product images
import earringsKundan from "@/assets/aureeka/earrings-kundan.jpg";
import necklaces from "@/assets/aureeka/necklaces.jpg";
import ringsAd from "@/assets/aureeka/rings-ad.jpg";
import bangles from "@/assets/aureeka/bangles.jpg";
import koreanEarrings from "@/assets/aureeka/korean-earrings.jpg";
import oxidisedEarrings from "@/assets/aureeka/oxidised-earrings.jpg";
import kundanNecklace from "@/assets/aureeka/kundan-necklace.jpg";
import adBracelet from "@/assets/aureeka/ad-bracelet.jpg";

const products = [
  {
    id: 1,
    name: "Royal Kundan Jhumkas",
    category: "Earrings",
    price: 1299,
    originalPrice: 1899,
    image: earringsKundan,
    badge: "Bestseller",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Pearl Layered Necklace",
    category: "Necklaces",
    price: 899,
    originalPrice: 1499,
    image: necklaces,
    badge: "New",
    rating: 4.6,
  },
  {
    id: 3,
    name: "AD Cocktail Ring",
    category: "Rings",
    price: 599,
    originalPrice: 999,
    image: ringsAd,
    badge: null,
    rating: 4.7,
  },
  {
    id: 4,
    name: "Traditional Gold Bangles Set",
    category: "Bangles",
    price: 1499,
    originalPrice: 2199,
    image: bangles,
    badge: "Limited",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Korean Pearl Drops",
    category: "Earrings",
    price: 349,
    originalPrice: 599,
    image: koreanEarrings,
    badge: "Trending",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Oxidised Jhumka Earrings",
    category: "Earrings",
    price: 449,
    originalPrice: 799,
    image: oxidisedEarrings,
    badge: null,
    rating: 4.4,
  },
  {
    id: 7,
    name: "Kundan Bridal Choker",
    category: "Necklaces",
    price: 2499,
    originalPrice: 3999,
    image: kundanNecklace,
    badge: "Premium",
    rating: 4.9,
  },
  {
    id: 8,
    name: "AD Tennis Bracelet",
    category: "Bracelets",
    price: 799,
    originalPrice: 1299,
    image: adBracelet,
    badge: "New",
    rating: 4.7,
  },
];

const LatestSparkles = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const getBadgeVariant = (badge: string | null) => {
    switch (badge) {
      case "Bestseller": return "default";
      case "New": return "secondary";
      case "Trending": return "outline";
      case "Premium": return "default";
      case "Limited": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">
              Fresh Picks
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground">
              Latest Sparkles
            </h2>
          </div>
          <Link 
            to="/new-arrivals"
            className="mt-4 md:mt-0 text-primary hover:text-primary-hover font-medium text-sm flex items-center gap-1 transition-colors"
          >
            View All New Arrivals →
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group relative bg-card rounded-lg overflow-hidden shadow-soft hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {/* Image Container */}
              <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Badge */}
                {product.badge && (
                  <Badge 
                    variant={getBadgeVariant(product.badge)}
                    className="absolute top-3 left-3 text-xs"
                  >
                    {product.badge}
                  </Badge>
                )}

                {/* Quick actions overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <Button size="sm" variant="secondary" className="h-9 px-3">
                    <Eye className="h-4 w-4 mr-1" />
                    Quick View
                  </Button>
                  <Button size="sm" className="h-9 px-3">
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                </div>
              </Link>

              {/* Wishlist button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
              >
                <Heart 
                  className={`h-4 w-4 transition-colors ${
                    wishlist.includes(product.id) 
                      ? "fill-red-500 text-red-500" 
                      : "text-gray-600"
                  }`}
                />
              </button>

              {/* Product Info */}
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
                <Link to={`/product/${product.id}`}>
                  <h3 className="font-medium text-foreground text-sm mb-2 line-clamp-1 hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-primary">₹{product.price}</span>
                  <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice}</span>
                  <span className="text-xs text-green-600 font-medium">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Promotional Banner */}
        <div className="mt-10 bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 rounded-xl p-6 md:p-10 text-center">
          <p className="text-sm text-primary font-medium mb-2">Limited Time Offer</p>
          <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">
            Get 20% Off on Your First Order
          </h3>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            Use code <span className="font-semibold text-primary">AUREEKA20</span> at checkout
          </p>
          <Button asChild>
            <Link to="/shop">Shop Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestSparkles;
