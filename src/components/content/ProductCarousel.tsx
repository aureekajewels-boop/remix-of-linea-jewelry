import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import organicEarring from "@/assets/organic-earring.png";
import linkBracelet from "@/assets/link-bracelet.png";
import placeholderImage from "/placeholder.svg";

interface Product {
  id: number;
  name: string;
  category?: string;
  category_name?: string;
  price: string;
  selling_price?: string;
  image?: string;
  images_full_url?: Array<{ path: string }>;
  is_new?: boolean;
}

interface ProductCarouselProps {
  products?: Product[];
  loading?: boolean;
}

const ProductCarousel = ({ products = [], loading = false }: ProductCarouselProps) => {

  // Show loading skeleton
  if (loading) {
    return (
      <section className="w-full mb-16 px-6">
        <div className="flex gap-4 overflow-x-hidden">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="aspect-square bg-muted/20 animate-pulse rounded-md mb-3"></div>
              <div className="h-4 bg-muted/20 animate-pulse rounded mb-2"></div>
              <div className="h-4 bg-muted/20 animate-pulse rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // If no products, show nothing
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="w-full mb-16 px-6">
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="">
          {products.map((product) => {
            const productImage = product.image || product.images_full_url?.[0]?.path || placeholderImage;
            const productCategory = product.category || product.category_name || "Product";
            const productPrice = product.selling_price ? `₹${product.selling_price}` : product.price;

            return (
              <CarouselItem
                key={product.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 pr-2 md:pr-4"
              >
                <Link to={`/product/${product.id}`}>
                  <Card className="border-none shadow-none bg-transparent group">
                    <CardContent className="p-0">
                      <div className="aspect-square mb-3 overflow-hidden bg-muted/10 relative">
                        <img
                          src={productImage}
                          alt={product.name}
                          className="w-full h-full object-cover transition-all duration-300 group-hover:opacity-0"
                        />
                        <img
                          src={productCategory.toLowerCase().includes("earring") ? organicEarring : linkBracelet}
                          alt={`${product.name} lifestyle`}
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 opacity-0 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-black/[0.03]"></div>
                        {product.is_new && (
                          <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium text-black">
                            NEW
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-light text-foreground">
                          {productCategory}
                        </p>
                        <div className="flex justify-between items-center">
                          <h3 className="text-sm font-medium text-foreground">
                            {product.name}
                          </h3>
                          <p className="text-sm font-light text-foreground">
                            {productPrice}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default ProductCarousel;