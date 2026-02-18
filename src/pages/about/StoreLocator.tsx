import { useEffect } from "react";
import { MapPin, Clock, Phone } from "lucide-react";
import AureekaHeader from "../../components/header/AureekaHeader";
import AureekaFooter from "../../components/footer/AureekaFooter";
import { Button } from "../../components/ui/button";

const StoreLocator = () => {
  useEffect(() => {
    document.title = "Store Locator - Aureeka Jewels";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <AureekaHeader />

      <main className="pt-6 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Visit Us
            </h1>
            <p className="text-muted-foreground">
              Aureeka Jewels is currently an online-only store
            </p>
          </div>

          {/* Online Store Info */}
          <div className="bg-gradient-to-br from-gold-100 to-cream-100 rounded-2xl p-8 md:p-12 text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-gold-200 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🛍️</span>
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              Shop Online, Deliver Pan India
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-6">
              We deliver beautiful jewellery right to your doorstep across India.
              Browse our collection online and enjoy free shipping on orders above ₹999.
            </p>
            <Button className="rounded-full" size="lg">
              Start Shopping
            </Button>
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-cream-50 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Our Location</h3>
              <p className="text-sm text-muted-foreground">
                Indore, Madhya Pradesh<br />India
              </p>
            </div>
            <div className="bg-cream-50 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Support Hours</h3>
              <p className="text-sm text-muted-foreground">
                Mon - Sat: 10AM - 7PM<br />Sunday: Closed
              </p>
            </div>
            <div className="bg-cream-50 rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Contact</h3>
              <p className="text-sm text-muted-foreground">
                +91 9179518505<br />info@aureekajewels.com
              </p>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="bg-cream-50 rounded-2xl p-8 text-center">
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Physical Stores Coming Soon! 🎉
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              We're working on opening physical stores in major cities.
              Subscribe to our newsletter to be the first to know when we launch!
            </p>
          </div>
        </div>
      </main>

      <AureekaFooter />
    </div>
  );
};

export default StoreLocator;
