
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";

const CATEGORY_IMAGE_BASE =
  "https://aureekajewels.com/storage/app/public/category/";

const OrnamentHub = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get(
          "/api/v1/products/home-categories?guest_id=1"
        );

        setCategories(res.data || []);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return null;

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-medium">
            Ornament Hub
          </h2>
          <p className="text-muted-foreground font-light max-w-xl mx-auto">
            Explore our curated collections of exquisite jewellery for every occasion
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category, index) => {
            const imageUrl = category.icon
              ? `${CATEGORY_IMAGE_BASE}${category.icon}`
              : "/placeholder.jpg"; // fallback

            return (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group relative overflow-hidden rounded-lg aspect-square"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* IMAGE */}
                <img
                  src={imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "/placeholder.jpg";
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Text */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-medium">
                    {category.name}
                  </h3>
                  <p className="text-xs text-white/80">
                    {category.products?.length || 0}+ designs
                  </p>
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
