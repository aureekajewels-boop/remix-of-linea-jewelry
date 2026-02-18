// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { 
//   Breadcrumb, 
//   BreadcrumbItem, 
//   BreadcrumbLink, 
//   BreadcrumbList, 
//   BreadcrumbPage, 
//   BreadcrumbSeparator 
// } from "@/components/ui/breadcrumb";
// import { Minus, Plus } from "lucide-react";

// const ProductInfo = () => {
//   const [quantity, setQuantity] = useState(1);

//   const incrementQuantity = () => setQuantity(prev => prev + 1);
//   const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

//   return (
//     <div className="space-y-6">
//       {/* Breadcrumb - Show only on desktop */}
//       <div className="hidden lg:block">
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink asChild>
//                 <Link to="/">Home</Link>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink asChild>
//                 <Link to="/category/earrings">Earrings</Link>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage>Pantheon</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//       </div>

//       {/* Product title and price */}
//       <div className="space-y-2">
//         <div className="flex justify-between items-start">
//           <div>
//             <p className="text-sm font-light text-muted-foreground mb-1">Earrings</p>
//             <h1 className="text-2xl md:text-3xl font-light text-foreground">Pantheon</h1>
//           </div>
//           <div className="text-right">
//             <p className="text-xl font-light text-foreground">₹2,850</p>
//           </div>
//         </div>
//       </div>

//       {/* Product details */}
//       <div className="space-y-4 py-4 border-b border-border">
//         <div className="space-y-2">
//           <h3 className="text-sm font-light text-foreground">Material</h3>
//           <p className="text-sm font-light text-muted-foreground">18k Gold Plated Sterling Silver</p>
//         </div>

//         <div className="space-y-2">
//           <h3 className="text-sm font-light text-foreground">Dimensions</h3>
//           <p className="text-sm font-light text-muted-foreground">2.5cm x 1.2cm</p>
//         </div>

//         <div className="space-y-2">
//           <h3 className="text-sm font-light text-foreground">Weight</h3>
//           <p className="text-sm font-light text-muted-foreground">4.2g per earring</p>
//         </div>

//         <div className="space-y-2">
//           <h3 className="text-sm font-light text-foreground">Editor's notes</h3>
//           <p className="text-sm font-light text-muted-foreground italic">"A modern interpretation of classical architecture, these earrings bridge timeless elegance with contemporary minimalism."</p>
//         </div>
//       </div>

//       {/* Quantity and Add to Cart */}
//       <div className="space-y-4">
//         <div className="flex items-center gap-4">
//           <span className="text-sm font-light text-foreground">Quantity</span>
//           <div className="flex items-center border border-border">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={decrementQuantity}
//               className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none"
//             >
//               <Minus className="h-4 w-4" />
//             </Button>
//             <span className="h-10 flex items-center px-4 text-sm font-light min-w-12 justify-center border-l border-r border-border">
//               {quantity}
//             </span>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={incrementQuantity}
//               className="h-10 w-10 p-0 hover:bg-transparent hover:opacity-50 rounded-none border-none"
//             >
//               <Plus className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         <Button 
//           className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 font-light rounded-none"
//         >
//           Add to cart
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ProductInfo;
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

interface ProductInfoProps {
  product: any;
  categoryName: string;
}

const ProductInfo = ({ product, categoryName }: ProductInfoProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const handleAddToCart = async () => {
    try {
      await addToCart(product.id, quantity);
      // Optionally show success message
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  // Extract product details or use defaults
  const productName = product?.name || 'Product';
  const productPrice = product?.unit_price ? `₹${product.unit_price}` : 'Price not available';
  const productDetails = product?.details || 'No description available';

  // Extract product images
  const productImages = product?.images_full_url || [];
  const mainImage = productImages.length > 0 ? productImages[0].path : null;

  return (
    <>
      {/* ================= CONTENT ================= */}
      <div className="flex flex-col space-y-6 pb-24 lg:pb-0">
        {/* Breadcrumb – Desktop only */}
        <div className="hidden lg:block">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={`/category/${product?.category_id || 'earrings'}`}>{categoryName}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbSeparator />

              <BreadcrumbItem>
                <BreadcrumbPage>{productName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Category */}
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {categoryName}
        </p>

        {/* Title + Price */}
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-2xl font-light leading-snug lg:text-3xl">
            {productName}
          </h1>
          <span className="text-xl font-light lg:text-2xl whitespace-nowrap">
            {productPrice}
          </span>
        </div>

        {/* Key Details */}
        <div className="space-y-4 border-b border-border pb-6 text-sm">
          <Detail label="Material" value="Premium Alloy with Stones" />
          <Detail label="Dimensions" value="Varies by design" />
          <Detail label="Weight" value="Lightweight" />
          <div>
            <p className="font-medium">Product Description</p>
            <p className="italic text-muted-foreground">
              {productDetails}
            </p>
          </div>
        </div>

        {/* Quantity – Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          <span className="text-sm">Quantity</span>
          <QuantityControl
            quantity={quantity}
            increment={increment}
            decrement={decrement}
          />
        </div>

        {/* Add to cart – Desktop */}
        <Button 
          onClick={handleAddToCart}
          className="hidden lg:block h-12 rounded-none bg-foreground text-background hover:bg-foreground/90 font-light"
        >
          Add to cart
        </Button>
      </div>

      {/* ================= MOBILE FIXED BAR ================= */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background lg:hidden">
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          <QuantityControl
            quantity={quantity}
            increment={increment}
            decrement={decrement}
            compact
          />

          <Button 
            onClick={handleAddToCart}
            className="flex-1 h-11 rounded-none bg-foreground text-background font-light"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </>
  );
};

/* ================= HELPERS ================= */

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="font-medium">{label}</p>
    <p className="text-muted-foreground">{value}</p>
  </div>
);

const QuantityControl = ({
  quantity,
  increment,
  decrement,
  compact,
}: {
  quantity: number;
  increment: () => void;
  decrement: () => void;
  compact?: boolean;
}) => (
  <div
    className={`flex items-center border border-border ${compact ? "h-11" : ""
      }`}
  >
    <Button
      variant="ghost"
      size="icon"
      onClick={decrement}
      className="rounded-none"
    >
      <Minus className="h-4 w-4" />
    </Button>

    <span className="px-4 text-sm font-light">{quantity}</span>

    <Button
      variant="ghost"
      size="icon"
      onClick={increment}
      className="rounded-none"
    >
      <Plus className="h-4 w-4" />
    </Button>
  </div>
);

export default ProductInfo;
