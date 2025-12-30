
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReviewProduct from "./ReviewProduct";

/* ================= STAR ================= */
const CustomStar = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`h-3 w-3 ${
      filled ? "text-foreground" : "text-muted-foreground/30"
    }`}
  >
    <path
      fillRule="evenodd"
      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
      clipRule="evenodd"
    />
  </svg>
);

/* ================= MAIN ================= */
const ProductDescription = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (key: string) =>
    setOpenSection(openSection === key ? null : key);

  return (
    <div className="mt-8 border-t border-border">
      {/* ========== DESCRIPTION ========== */}
      <div className="border-b">
        <Button
          variant="ghost"
          onClick={() => toggle("description")}
          className="flex h-14 w-full items-center justify-between px-0 font-light"
        >
          Description
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              openSection === "description" ? "rotate-180" : ""
            }`}
          />
        </Button>

        {openSection === "description" && (
          <div className="pb-6 space-y-4 text-sm font-light text-muted-foreground leading-relaxed">
            <p>
              The Pantheon earrings embody architectural elegance with their
              clean, geometric design inspired by classical Roman architecture.
            </p>
            <p>
              Crafted from premium sterling silver with 18k gold plating, they
              balance durability with timeless luxury.
            </p>
          </div>
        )}
      </div>

      {/* ========== PRODUCT DETAILS ========== */}
      <div className="border-b">
        <Button
          variant="ghost"
          onClick={() => toggle("details")}
          className="flex h-14 w-full items-center justify-between px-0 font-light"
        >
          Product Details
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              openSection === "details" ? "rotate-180" : ""
            }`}
          />
        </Button>

        {openSection === "details" && (
          <div className="pb-6 space-y-3 text-sm">
            {[
              ["SKU", "LE-PTH-001"],
              ["Collection", "Architectural Series"],
              ["Closure", "Post and butterfly back"],
              ["Hypoallergenic", "Yes"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-light">{value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ========== CARE ========== */}
      <div className="border-b">
        <Button
          variant="ghost"
          onClick={() => toggle("care")}
          className="flex h-14 w-full items-center justify-between px-0 font-light"
        >
          Care & Cleaning
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              openSection === "care" ? "rotate-180" : ""
            }`}
          />
        </Button>

        {openSection === "care" && (
          <div className="pb-6 space-y-2 text-sm font-light text-muted-foreground">
            <p>• Clean with a soft dry cloth</p>
            <p>• Avoid perfumes & chemicals</p>
            <p>• Store in jewelry pouch</p>
            <p>• Remove before water exposure</p>
          </div>
        )}
      </div>

      {/* ========== REVIEWS ========== */}
      <div className="border-b lg:mb-16">
        <Button
          variant="ghost"
          onClick={() => toggle("reviews")}
          className="flex h-14 w-full items-center justify-between px-0 font-light"
        >
          <div className="flex items-center gap-2">
            Customer Reviews
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <CustomStar key={i} filled={i <= 4} />
              ))}
              <span className="ml-1 text-xs text-muted-foreground">4.8</span>
            </div>
          </div>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              openSection === "reviews" ? "rotate-180" : ""
            }`}
          />
        </Button>

        {openSection === "reviews" && (
          <div className="pb-6 space-y-6">
            <ReviewProduct />

            <div className="space-y-5 text-sm">
              {[
                {
                  name: "Sarah M.",
                  text:
                    "Absolutely stunning earrings. Unique design and premium quality.",
                },
                {
                  name: "Emma T.",
                  text:
                    "Comfortable, elegant and durable. Worth every penny.",
                },
                {
                  name: "Jessica R.",
                  text:
                    "Minimalist yet luxurious. Packaging was beautiful too.",
                },
              ].map((review, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <CustomStar key={s} filled />
                      ))}
                    </div>
                    <span className="text-muted-foreground">
                      {review.name}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
