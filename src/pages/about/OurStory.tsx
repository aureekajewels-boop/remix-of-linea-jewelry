import { useEffect } from "react";
import AureekaHeader from "../../components/header/AureekaHeader";
import AureekaFooter from "../../components/footer/AureekaFooter";

import heroBanner from "@/assets/aureeka/hero-banner.jpg";

const OurStory = () => {
  useEffect(() => {
    document.title = "About Us - Aureeka Jewels";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AureekaHeader />
      
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              About Aureeka Jewels
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bringing elegance to every woman through affordable fashion jewellery
            </p>
          </div>

          {/* Image & Story */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-cream-100">
              <img 
                src={heroBanner} 
                alt="Aureeka Jewels Story" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Our Journey
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Aureeka Jewels was born from a simple belief: every woman deserves to feel beautiful and confident without breaking the bank. We curate stunning fashion jewellery that combines traditional Indian craftsmanship with modern trends.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From intricate Kundan pieces to sleek Korean designs, from statement oxidised jewellery to sparkling American Diamond collections – we bring you the best of fashion jewellery, handpicked for quality and style.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="bg-cream-50 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="font-display text-2xl font-semibold text-foreground text-center mb-10">
              What We Stand For
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Quality First</h3>
                <p className="text-sm text-muted-foreground">
                  Every piece is carefully inspected to ensure premium quality at affordable prices.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💜</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Customer Love</h3>
                <p className="text-sm text-muted-foreground">
                  Your satisfaction is our priority. We're here to help you find your perfect piece.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌸</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Trendy Designs</h3>
                <p className="text-sm text-muted-foreground">
                  Stay fashionable with our constantly updated collection of trending styles.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-cream-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-1">10K+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="bg-cream-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Unique Designs</div>
            </div>
            <div className="bg-cream-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-1">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="bg-cream-50 rounded-xl p-6">
              <div className="text-3xl font-bold text-primary mb-1">Pan India</div>
              <div className="text-sm text-muted-foreground">Delivery</div>
            </div>
          </div>
        </div>
      </main>
      
      <AureekaFooter />
    </div>
  );
};

export default OurStory;
