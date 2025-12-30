
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

import AureekaHeader from "@/components/header/AureekaHeader";
import AureekaFooter from "@/components/footer/AureekaFooter";

const Wishlist = () => {
  return (
    <>
      {/* ✅ HEADER */}
      <AureekaHeader />

      {/* ✅ MAIN CONTENT */}
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
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
              Discover Jewellery
            </button>
          </Link>
        </div>
      </main>

      {/* ✅ FOOTER */}
      <AureekaFooter />
    </>
  );
};

export default Wishlist;
