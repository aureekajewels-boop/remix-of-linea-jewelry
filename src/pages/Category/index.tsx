// src/pages/Category.jsx
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchHomeCategories } from "@/lib/controller/OrnamentHubController";
import { Button } from "@/components/ui/button";
import Header from "@/components/header/Header";
import AureekaFooter from "@/components/footer/AureekaFooter";
import WishlistButton from "@/components/product/WishlistButton";
import { useCart } from "@/contexts/CartContext";

const Category = () => {
  const { category: categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchHomeCategories();
        const category = (Array.isArray(data) ? data : []).find(
          (cat) => cat.slug === categorySlug && cat.parent_id === 0
        );

        if (!category) {
          navigate("/404", { replace: true });
          return;
        }

        setCategoryName(category.name);
        const productList = Array.isArray(category.product) ? category.product : [];
        setProducts(productList);
      } catch (err) {
        console.error("Failed to load category:", err);
        navigate("/404", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      loadProducts();
    }
  }, [categorySlug, navigate]);

  const handleAddToCart = (product) => {
    console.log("🛒 Added to cart:", product.name);
    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-16 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading collection...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center md:text-left">
          {categoryName}
        </h1>
        <p className="text-muted-foreground text-center md:text-left mb-8">
          Discover our curated collection of {categoryName.toLowerCase()}s
        </p>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No products available in this collection.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col"
              >
                {/* Image + Wishlist Icon */}
                <Link to={`/product/${product.id}`} className="block relative">
                  <img
                    src={product.thumbnail_full_url?.path || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.jpg";
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <WishlistButton
                      productId={product.id}
                      className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm"
                    />
                  </div>
                </Link>

                {/* Info & Add to Cart */}
                <div className="p-4 flex flex-col flex-grow">
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-medium text-sm text-gray-800 line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-primary font-semibold mt-2">₹{product.unit_price}</p>

                  <Button
                    onClick={async () => { try { await addToCart(product.id); } catch (error) { console.error(error); } }}
                    variant="default"
                    className="mt-3 w-full bg-[#D49B3E] hover:bg-[#C08A2F] text-white font-medium py-2 rounded-md transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10v8a2 2 0 002 2H5a2 2 0 002-2v-8zm5-1a2 2 0 110-4 2 2 0 010 4z"
                      />
                    </svg>
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <AureekaFooter />
    </div>
  );
};

export default Category;