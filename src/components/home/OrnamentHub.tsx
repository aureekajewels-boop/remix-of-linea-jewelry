// src/components/OrnamentHub.jsx

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchHomeCategories } from "@/lib/controller/OrnamnetHubController.js";

const OrnamentHub = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      try {
        const data = await fetchHomeCategories();
        console.log("📦 Raw API Response:", data);
        console.log("📦 Is Array?", Array.isArray(data));
        
        // Filter only top-level categories (parent_id === 0) and with home_status = 1
        const topLevelCategories = (Array.isArray(data) ? data : [])
          .filter(cat => {
            console.log(`Checking category: ${cat.name}, parent_id: ${cat.parent_id}, home_status: ${cat.home_status}`);
            return cat.parent_id === 0 && cat.home_status === 1;
          })
          .sort((a, b) => a.priority - b.priority); // Optional: sort by priority

        console.log("✅ Filtered categories count:", topLevelCategories.length);
        console.log("✅ Filtered categories:", topLevelCategories);
        
        setCategories(topLevelCategories);
      } catch (error) {
        console.error("❌ Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-medium">
              Ornament Hub
            </h2>
            <p className="text-muted-foreground font-light max-w-xl mx-auto">
              Loading categories...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return (
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-medium">
              Ornament Hub
            </h2>
            <p className="text-muted-foreground font-light max-w-xl mx-auto">
              No categories available
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-medium">
            Ornament Hub
          </h2>
          <p className="text-muted-foreground font-light max-w-xl mx-auto">
            Explore our curated collections of exquisite jewellery for every occasion
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => {
            // Safely get image URL
            const imageUrl = category.icon_full_url?.path || "/placeholder.jpg";

            // ✅ Use "product" (not "products") — as per your JSON
            const productCount = Array.isArray(category.product)
              ? category.product.length
              : category.product_count || 0;

            return (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-lg aspect-square"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={imageUrl}
                  alt={category.name || "Category"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-medium">{category.name}</h3>
                  <p className="text-xs text-white/80">{productCount}+ designs</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OrnamentHub;