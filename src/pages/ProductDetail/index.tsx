import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import ProductImageGallery from "@/components/product/ProductImageGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductDescription from "@/components/product/ProductDescription";
import ProductCarousel from "@/components/content/ProductCarousel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { fetchHomeCategories, fetchRelatedProducts } from "@/lib/controller/OrnamentHubController";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");
  const [justForYouProducts, setJustForYouProducts] = useState([]);
  const [loadingJustForYou, setLoadingJustForYou] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchHomeCategories();

        // Find the product across all categories
        let foundProduct = null;
        let foundCategoryName = "";

        for (const category of data) {
          if (Array.isArray(category.product)) {
            foundProduct = category.product.find(p => p.id === parseInt(productId));
            if (foundProduct) {
              foundCategoryName = category.name;
              break;
            }
          }
        }

        if (foundProduct) {
          setProduct(foundProduct);
          setCategoryName(foundCategoryName);
        }
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  useEffect(() => {
    const loadJustForYouProducts = async () => {
      try {
        setLoadingJustForYou(true);
        // Use the related products API with the current product ID
        const data = await fetchRelatedProducts(productId);
        setJustForYouProducts(data);
      } catch (err) {
        console.error("Failed to load related products:", err);
      } finally {
        setLoadingJustForYou(false);
      }
    };

    if (productId) {
      loadJustForYouProducts();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto py-16 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-primary"></div>
        <p className="mt-4 text-muted-foreground">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-16 text-center">
        <p className="text-lg text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-6">
        <section className="w-full px-6">
          {/* Breadcrumb - Show above image on smaller screens */}
          <div className="lg:hidden mb-6">
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
                  <BreadcrumbPage>{product?.name || 'Product'}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <ProductImageGallery product={product} />

            <div className="lg:pl-12 mt-8 lg:mt-0 lg:sticky lg:top-6 lg:h-fit">
              <ProductInfo product={product} categoryName={categoryName} />
              <ProductDescription product={product} />
            </div>
          </div>
        </section>

        {justForYouProducts.length > 0 && (
          <section className="w-full mt-16 lg:mt-24">
            <div className="mb-4 px-6">
              <h2 className="text-sm font-light text-foreground">You might also like</h2>
            </div>
            <ProductCarousel products={justForYouProducts} loading={loadingJustForYou} />
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;