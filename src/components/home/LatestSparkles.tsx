
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Heart, ShoppingBag, Eye } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { api } from "@/lib/api";

// const LatestSparkles = () => {
//   const [products, setProducts] = useState([]);
//   const [wishlist, setWishlist] = useState([]);

//   useEffect(() => {
//     const fetchLatestProducts = async () => {
//       try {
//         const res = await api.get(
//           "/api/v1/products/latest?guest_id=1&limit=8&offset=1"
//         );

//         // ✅ ensure only 8 items
//         setProducts((res.data?.products || []).slice(0, 8));
//       } catch (error) {
//         console.error("Failed to load latest products", error);
//       }
//     };

//     fetchLatestProducts();
//   }, []);

//   const toggleWishlist = (id) => {
//     setWishlist((prev) =>
//       prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
//     );
//   };

//   return (
//     <section className="py-12 md:py-16 px-4">
//       <div className="container mx-auto">

//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
//           <div>
//             <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">
//               Fresh Picks
//             </p>
//             <h2 className="font-display text-3xl md:text-4xl font-medium">
//               Latest Sparkles
//             </h2>
//           </div>

//           {/* 👉 Redirect to full list */}
//           <Link
//             to="/new-arrivals"
//             className="mt-4 md:mt-0 text-primary font-medium text-sm"
//           >
//             View All Latest Sparkles →
//           </Link>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
//           {products.map((product) => {
//             const image =
//               product.thumbnail_full_url?.path || "/placeholder.jpg";

//             const finalPrice =
//               product.discount_type === "percent"
//                 ? Math.round(
//                     product.unit_price -
//                       (product.unit_price * product.discount) / 100
//                   )
//                 : product.unit_price - product.discount;

//             return (
//               <div
//                 key={product.id}
//                 className="group relative bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition"
//               >
//                 {/* Image */}
//                 <Link
//                   to={`/product/${product.id}`}
//                   className="block aspect-square overflow-hidden"
//                 >
//                   <img
//                     src={image}
//                     alt={product.name}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform"
//                   />

//                   {product.discount > 0 && (
//                     <Badge className="absolute top-3 left-3">
//                       {product.discount}% OFF
//                     </Badge>
//                   )}
//                 </Link>

//                 {/* Wishlist */}
//                 <button
//                   onClick={() => toggleWishlist(product.id)}
//                   className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center"
//                 >
//                   <Heart
//                     className={`h-4 w-4 ${
//                       wishlist.includes(product.id)
//                         ? "fill-red-500 text-red-500"
//                         : "text-gray-600"
//                     }`}
//                   />
//                 </button>

//                 {/* Info */}
//                 <div className="p-4">
//                   <h3 className="text-sm font-medium line-clamp-1">
//                     {product.name}
//                   </h3>

//                   <div className="flex items-center gap-2 mt-2">
//                     <span className="font-semibold text-primary">
//                       ₹{finalPrice}
//                     </span>

//                     {product.discount > 0 && (
//                       <span className="text-xs line-through text-gray-400">
//                         ₹{product.unit_price}
//                       </span>
//                     )}
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition">
//                     <Button size="sm" variant="secondary">
//                       <Eye className="h-4 w-4 mr-1" /> View
//                     </Button>
//                     <Button size="sm">
//                       <ShoppingBag className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LatestSparkles;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";

const LatestSparkles = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const res = await api.get(
          "/api/v1/products/latest?guest_id=1&limit=8&offset=1"
        );
        setProducts((res.data?.products || []).slice(0, 8));
      } catch (error) {
        console.error("Failed to load latest products", error);
      }
    };

    fetchLatestProducts();
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-12 md:py-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-2">
              Fresh Picks
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium">
              Latest Sparkles
            </h2>
          </div>

          <Link
            to="/new-arrivals"
            className="mt-4 md:mt-0 text-primary font-medium text-sm"
          >
            View All Latest Sparkles →
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => {
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
                  {/* ✅ IMAGE INDEX PASSED HERE */}
                  <Link to={`/product/${product.id}?image=${index}`}>
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

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow"
                  >
                    <Heart
                      className={`h-4 w-4 ${wishlist.includes(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-600"
                        }`}
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4 text-center">
                  <h3 className="text-sm font-medium line-clamp-1">
                    {product.name}
                  </h3>

                  <div className="flex justify-center items-center gap-2 mt-2">
                    <span className="font-semibold text-primary">
                      ₹{finalPrice}
                    </span>

                    {product.discount > 0 && (
                      <span className="text-xs line-through text-gray-400">
                        ₹{product.unit_price}
                      </span>
                    )}
                  </div>

                  <Button
                    size="sm"
                    className="mt-4 px-6 flex items-center gap-2 mx-auto"
                    onClick={async () => { try { await addToCart(product.id); } catch (error) { console.error(error); } }}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestSparkles;

