import { Link } from "react-router-dom";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook,
  MessageCircle
} from "lucide-react";

const AureekaFooter = () => {
  return (
    <footer className="bg-foreground text-background pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-display text-2xl font-semibold text-gold-400 mb-4">
              Aureeka Jewels
            </h3>
            <p className="text-cream-400 text-sm font-light mb-4">
              Affordable fashion jewellery for the modern woman.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-cream-400/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-cream-400/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-cream-400/10 flex items-center justify-center hover:bg-primary transition-colors">
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-medium mb-4 text-cream-200">Shop</h4>
            <ul className="space-y-2 text-sm text-cream-400 font-light">
              <li><Link to="/category/earrings" className="hover:text-primary transition-colors">Earrings</Link></li>
              <li><Link to="/category/necklaces" className="hover:text-primary transition-colors">Necklaces</Link></li>
              <li><Link to="/category/mangalsutra" className="hover:text-primary transition-colors">Mangalsutra</Link></li>
              <li><Link to="/category/rings" className="hover:text-primary transition-colors">Rings</Link></li>
              <li><Link to="/category/bangles" className="hover:text-primary transition-colors">Bangles</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h4 className="font-medium mb-4 text-cream-200">Help</h4>
            <ul className="space-y-2 text-sm text-cream-400 font-light">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium mb-4 text-cream-200">Contact</h4>
            <ul className="space-y-3 text-sm text-cream-400 font-light">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                hello@aureekajewels.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-cream-400/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cream-500">
          <p>© 2024 Aureeka Jewels. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AureekaFooter;
