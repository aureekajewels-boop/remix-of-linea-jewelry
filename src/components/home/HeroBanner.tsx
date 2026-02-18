import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/aureeka/hero-banner.jpg";

const HeroBanner = () => {
  return (
    <section className="relative w-full">
      {/* Main Hero */}
      <div className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <img
          src={heroBanner}
          alt="Elegant woman wearing Aureeka Jewels collection"
          className="w-full h-full object-cover object-top"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-xl animate-fade-in-up">
              {/* <p className="text-primary-foreground/80 font-light tracking-widest text-sm mb-4 uppercase">
                New Collection 2024
              </p> */}
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-medium leading-tight mb-6">
                Daily Shine
                <span className="block text-gold-300">Elegance by Aureeka</span>
              </h1>
              <p className="text-white/80 text-lg font-light mb-8 max-w-md">
                Discover affordable luxury jewellery crafted for the modern woman.
                Trendy designs for daily wear and special occasions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-hover text-primary-foreground group"
                  asChild
                >
                  <Link to="/new-arrivals">
                    Shop Latest Sparkles
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-primary hover:bg-primary-hover text-primary-foreground group"
                  asChild
                >
                  <Link to="/collections">
                    View Collections
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom info strip */}
      <div className="bg-secondary py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span className="text-foreground font-light">100% Quality Assured</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span className="text-foreground font-light">Easy  Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span className="text-foreground font-light">Cash on Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span className="text-foreground font-light">Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
