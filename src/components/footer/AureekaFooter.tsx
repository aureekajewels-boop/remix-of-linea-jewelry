
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { fetchHomeCategories } from "@/lib/controller/OrnamentHubController";

const AureekaFooter = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchHomeCategories();
        // Filter only top-level categories (parent_id === 0)
        const topLevelCategories = (Array.isArray(data) ? data : [])
          .filter(cat => cat.parent_id === 0)
          .sort((a, b) => a.priority - b.priority)
          .map(cat => ({
            name: cat.name,
            href: `/category/${cat.slug}`,
            id: cat.id
          }));

        setCategories(topLevelCategories);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    loadCategories();
  }, []);
  return (
    <footer className="bg-[#2a231d] text-[#f5efe6] pt-14 pb-6">
      <div className="container mx-auto px-6">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* BRAND */}
          <div>
            <h3 className="font-serif text-2xl text-[#d4af37] mb-4">
              Aureeka Jewels
            </h3>
            <p className="text-sm text-[#e6dccf] leading-relaxed mb-4">
              Affordable fashion jewellery for the modern woman.
            </p>

            <div className="flex gap-3">
              {[Instagram, Facebook].map((Icon, i) => {
                const links = [
                  "https://www.instagram.com/aureekajewels/",
                  "https://www.facebook.com/profile.php",
                  "#"
                ];
                return (
                  <a
                    key={i}
                    href={links[i]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-[#3a312a] flex items-center justify-center hover:bg-[#d4af37] hover:text-[#2a231d] transition"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* SHOP - Dynamic Categories */}
          <div>
            <h4 className="font-medium mb-4 text-[#f0e6d8]">Shop</h4>
            <ul className="space-y-2 text-sm text-[#d8cfc2]">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={category.href}
                    className="hover:text-[#d4af37] transition"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* HELP */}
          <div>
            <h4 className="font-medium mb-4 text-[#f0e6d8]">Help</h4>
            <ul className="space-y-2 text-sm text-[#d8cfc2]">
              {[
                ["Contact Us", "/contact"],
                ["FAQ", "/faq"],
                ["Shipping Policy", "/shipping"],
                ["Returns & Refunds", "/returns"],
                ["About Us", "/about"],
              ].map(([label, path]) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="hover:text-[#d4af37] transition"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-medium mb-4 text-[#f0e6d8]">Contact</h4>
            <ul className="space-y-3 text-sm text-[#d8cfc2]">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-[#d4af37]" />
                +91 9179518505
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#d4af37]" />
                info@aureekajewels.com
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-[#d4af37] mt-0.5" />
                Indore, Madhya Pradesh, India
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-[#d4af37]/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#cfc4b6]">
          <p>© 2024 Aureeka Jewels. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-[#d4af37] transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#d4af37] transition">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default AureekaFooter;
