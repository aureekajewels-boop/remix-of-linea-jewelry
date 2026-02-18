
import { Heart, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import AureekaHeader from "@/components/header/AureekaHeader";
import AureekaFooter from "@/components/footer/AureekaFooter";
import { fetchWishlist, removeFromWishlist } from "@/lib/controller/WishlistController";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch wishlist items from API
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        setLoading(true);
        const data = await fetchWishlist();
        console.log("💖 Wishlist items loaded:", data);
        setWishlistItems(data);
        setError(null);
      } catch (err) {
        console.error("Failed to load wishlist:", err);
        setError("Failed to load wishlist. Please try again later.");
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  const handleRemoveFromWishlist = async (wishlistId) => {
    try {
      await removeFromWishlist(wishlistId);
      // Remove the item from local state
      setWishlistItems(wishlistItems.filter(item => item.id !== wishlistId));
    } catch (err) {
      console.error("Failed to remove from wishlist:", err);
      setError("Failed to remove item. Please try again.");
    }
  };

  if (loading) {
    return (
      <>
        <AureekaHeader />
        <main className="min-h-[70vh] flex items-center justify-center bg-[#fffaf4] px-4">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading your wishlist...</p>
          </div>
        </main>
        <AureekaFooter />
      </>
    );
  }

  if (error) {
    return (
      <>
        <AureekaHeader />
        <main className="min-h-[70vh] flex items-center justify-center bg-[#fffaf4] px-4">
          <div className="flex flex-col items-center text-center bg-white border border-orange-100 rounded-2xl shadow-lg px-10 py-12 max-w-md w-full">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-red-50 border border-red-200 mb-6">
              <X className="h-10 w-10 text-red-500" />
            </div>
            <h1 className="text-3xl font-serif text-orange-900 mb-4">Error</h1>
            <p className="text-gray-600 mb-8 text-sm">{error}</p>
            <Link to="/">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <AureekaFooter />
      </>
    );
  }

  // Show empty wishlist message if no items
  if (wishlistItems.length === 0) {
    return (
      <>
        <AureekaHeader />
        <main className="min-h-[70vh] flex items-center justify-center bg-[#fffaf4] px-4">
          <div className="flex flex-col items-center text-center bg-white border border-orange-100 rounded-2xl shadow-lg px-10 py-12 max-w-md w-full">

            {/* HEART ICON CARD */}
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-orange-50 border border-orange-200 mb-6">
              <Heart className="h-10 w-10 text-orange-500" />
            </div>

            {/* TITLE */}
            <h1 className="text-3xl font-serif text-orange-900 mb-2">
              Wishlist
            </h1>

            {/* SUBTEXT */}
            <p className="text-gray-600 mb-8 text-sm">
              You haven’t added anything to your wishlist yet.
              <br />
              Start exploring our beautiful jewellery ✨
            </p>

            {/* CTA BUTTON */}
            <Link to="/">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
                Discover Jewellery
              </Button>
            </Link>
          </div>
        </main>
        <AureekaFooter />
      </>
    );
  }

  // Show wishlist items
  return (
    <>
      <AureekaHeader />
      <main className="min-h-[70vh] bg-[#fffaf4] px-4 py-8">
        <div className="container mx-auto">
          <h1 className="text-3xl font-serif text-orange-900 mb-8 text-center">Your Wishlist</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => {
              const product = item.productFullInfo || item.product_full_info;
              if (!product) return null;

              const productName = product.name || 'Product';
              const productPrice = product.unit_price ? `₹${product.unit_price}` : 'Price not available';
              const productImage = product.images_full_url?.[0]?.path || product.thumbnail_full_url?.path || '/placeholder.svg';
              const productSlug = product.slug || '#';

              return (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-orange-100 hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <Link to={`/product/${product.id}`} className="block">
                      <img
                        src={productImage}
                        alt={productName}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}
                      />
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>

                  <div className="p-4">
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="font-medium text-orange-900 mb-2 truncate">{productName}</h3>
                    </Link>
                    <p className="text-orange-600 font-medium mb-3">{productPrice}</p>

                    <div className="flex gap-2">
                      <Link to={`/product/${product.id}`} className="flex-1">
                        <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white text-sm py-2 rounded-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <AureekaFooter />
    </>
  );
};

export default Wishlist;
