// src/components/BrandSection.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api"; // ✅ Assumes you have axios instance at "@/lib/api"

const BrandSection = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch brands from API - Pure API data, no fallback
  const fetchBrandsForHomepage = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const response = await api.get("/api/v1/brands", {
        params: {
          guest_id: token ? undefined : 1,
        },
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      console.log("🔍 Brands API Response:", response.data);

      const brandList = Array.isArray(response.data?.brands)
        ? response.data.brands
        : [];

      // ✅ Pure API mapping - using actual API structure
      const mappedBrands = brandList
        .filter(brand => brand.status === 1)
        .map(brand => ({
          id: brand.id,
          name: brand.name,
          image: brand.image_full_url?.path || "/placeholder.svg",
          productCount: brand.brand_products_count || 0,
        }));

      console.log("✅ Mapped Brands:", mappedBrands);
      return mappedBrands;
    } catch (error) {
      console.error("❌ Failed to load brands:", error);
      return [];
    }
  };

  // ✅ Load brands on mount
  useEffect(() => {
    const loadBrands = async () => {
      setLoading(true);
      const data = await fetchBrandsForHomepage();
      setBrands(data);
      setLoading(false);
    };
    loadBrands();
  }, []);

  // ✅ Loading State
  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-medium">Elegance by Aureeka</h2>
            <p className="text-muted-foreground font-light max-w-xl mx-auto">Loading brands...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card rounded-xl h-[320px] animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ✅ Empty State - Hide section if no brands
  if (brands.length === 0) {
    return null;
  }

  // ✅ Render Brands
  return (
    <section className="py-12 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">
            Shop by Style
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-medium text-foreground mb-3">
            Elegance by Aureeka
          </h2>
          <p className="text-muted-foreground font-light max-w-xl mx-auto">
            From traditional kundan to trendy Korean styles, find your perfect match
          </p>
        </div>

        {/* Brand Grid - Similar to OrnamentHub */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {brands.map((brand, index) => (
            <Link
              key={brand.id}
              to={`/brand/${brand.id}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/5]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-lg font-medium mb-1">{brand.name}</h3>
                {brand.productCount > 0 && (
                  <p className="text-xs text-white/80">{brand.productCount}+ designs</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;