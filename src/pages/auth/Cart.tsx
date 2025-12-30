import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import AureekaHeader from "@/components/header/AureekaHeader";
import AureekaFooter from "@/components/footer/AureekaFooter";

const Cart = () => {
  const cartItems: any[] = []; // future backend / context

  return (
    <>
      {/* HEADER */}
      <AureekaHeader />

      {/* MAIN */}
      <main className="min-h-[80vh] bg-gradient-to-b from-[#fffaf4] to-[#fff3e6] px-4 py-20 flex items-center justify-center">
        {cartItems.length === 0 ? (
          /* ===== EMPTY CART UI ===== */
          <div className="relative bg-white rounded-3xl shadow-xl max-w-lg w-full px-10 py-12 text-center">

            {/* ICON RING */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow-md">
                <ShoppingBag className="h-10 w-10 text-orange-600" />
              </div>
            </div>

            {/* CONTENT */}
            <h1 className="mt-14 text-3xl font-serif text-orange-900 mb-3">
              Your Cart is Empty
            </h1>

            <p className="text-gray-600 text-sm leading-relaxed mb-8 px-4">
              Looks like you haven’t added anything yet.
              Explore our elegant jewellery collections and
              find something you’ll absolutely love ✨
            </p>

            {/* CTA */}
            <Link to="/">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-3 rounded-full font-medium shadow-lg transition transform hover:-translate-y-0.5">
                Continue Shopping
              </button>
            </Link>

            {/* SOFT DECOR */}
            <div className="absolute top-6 right-6 h-16 w-16 bg-orange-50 rounded-full blur-xl" />
            <div className="absolute bottom-6 left-6 h-20 w-20 bg-orange-100 rounded-full blur-2xl" />
          </div>
        ) : (
          /* ===== FILLED CART (future) ===== */
          <div className="max-w-6xl w-full">
            {/* future cart UI */}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <AureekaFooter />
    </>
  );
};

export default Cart;
