import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Header from "@/components/header/Header";
import AureekaFooter from "@/components/footer/AureekaFooter";
import WishlistButton from "@/components/product/WishlistButton";

const Brand = () => {
  const { brandSlug: brandId } = useParams();
  const [products, setProducts] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadBrandProducts = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("auth_token");
        
        // Fetch products filtered by brand_id
        const response = await api.get("/api/v1/products", {
          params: {
            brand_id: brandId,
            guest_id: token ? undefined : 1
          },
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        console.log("🔍 Brand Products API Response:", response.data);

        const responseData = response.data?.data || response.data;
        const productList = Array.isArray(responseData) ? responseData : [];
        
        if (productList.length === 0) {
          // Try to get brand name from brands API
          const brandsResponse = await api.get("/api/v1/brands", {
            params: { guest_id: token ? undefined : 1 },
            headers: token ? { Authorization: `Bearer ${token}` } : {}
          });
          
          const brand = brandsResponse.data?.brands?.find(b => b.id === parseInt(brandId));
          setBrandName(brand?.name || "Brand");
        } else {
          // Get brand name from first product
          setBrandName(productList[0]?.brand?.name || "Brand");
        }
        
        setProducts(productList);
      } catch (err) {
        console.error("Failed to load brand products:", err);
        navigate("/404", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    if (brandId) {
      loadBrandProducts();
    }
  }, [brandId, navigate]);


  if (loading) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-16 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading products...</p>
        </div>
        <AureekaFooter />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-2">
            {brandName}
          </h1>
          <p className="text-muted-foreground">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products available in this brand.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => {
              const imageUrl = product.images_full_url?.[0]?.path || "/placeholder.svg";
              const price = product.selling_price || product.price || "0";

              return (
                <div
                  key={product.id}
                  className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link to={`/product/${product.id}`}>
                    {/* Image */}
                    <div className="aspect-square overflow-hidden bg-muted/10">
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => (e.currentTarget.src = "/placeholder.svg")}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-3">
                      <h3 className="font-medium text-sm mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-lg font-semibold text-primary">
                        ₹{price}
                      </p>
                    </div>
                  </Link>

                  {/* Wishlist Button */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <WishlistButton
                      productId={product.id}
                      className="bg-white/80 backdrop-blur-sm hover:bg-white"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <AureekaFooter />
    </div>
  );
};

export default Brand;