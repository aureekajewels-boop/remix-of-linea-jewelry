import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

/* 👉 Header & Footer */
import AureekaHeader from "@/components/header/AureekaHeader";
import Footer from "@/components/footer/Footer";

const NewArrivals = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const fetchProducts = async () => {
    try {
      const res = await api.get(
        `/api/v1/products/latest?guest_id=1&limit=12&offset=${page}`
      );

      setProducts((prev) => [...prev, ...(res.data?.products || [])]);
    } catch (err) {
      console.error("Failed to load new arrivals", err);
    }
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* ✅ HEADER */}
      <AureekaHeader />

      <section className="py-12 px-4">
        <div className="container mx-auto">

          {/* Page Header */}
          <div className="mb-12 text-center">
            <p className="text-primary text-sm uppercase tracking-widest">
              New Collection
            </p>
            <h1 className="text-4xl font-display font-medium mt-2">
              New Arrivals
            </h1>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const image =
                product.thumbnail_full_url?.path || "/placeholder.jpg";

              const finalPrice =
                product.discount_type === "percent"
                  ? Math.round(
                      product.unit_price -
                        (product.unit_price * product.discount) / 100
                    )
                  : product.unit_price - product.discount;

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
                >
                  {/* Image */}
                  <div className="relative group">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={image}
                        alt={product.name}
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform"
                      />
                    </Link>

                    {product.discount > 0 && (
                      <Badge className="absolute top-3 left-3">
                        {product.discount}% OFF
                      </Badge>
                    )}

                    {/* ❤️ Wishlist */}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          wishlist.includes(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-4 text-center">
                    {/* ✅ CENTER NAME */}
                    <h3 className="text-sm font-medium line-clamp-1">
                      {product.name}
                    </h3>

                    {/* ✅ CENTER PRICE */}
                    <div className="flex justify-center gap-2 mt-2">
                      <span className="text-primary font-semibold">
                        ₹{finalPrice}
                      </span>

                      {product.discount > 0 && (
                        <span className="text-xs line-through text-gray-400">
                          ₹{product.unit_price}
                        </span>
                      )}
                    </div>

                    {/* ✅ SMALL ADD TO CART */}
                    <Button
                      size="sm"
                      className="mt-4 px-6 mx-auto flex items-center gap-2"
                      onClick={() => console.log("Add to cart", product.id)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More */}
          <div className="flex justify-center mt-12">
            <Button onClick={() => setPage((p) => p + 1)}>
              Load More
            </Button>
          </div>
        </div>
      </section>

      {/* ✅ FOOTER */}
      <Footer />
    </>
  );
};

export default NewArrivals;
