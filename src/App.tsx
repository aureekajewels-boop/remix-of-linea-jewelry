// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ScrollToTop from "./components/ScrollToTop";
// import Index from "./pages/Index";
// import Category from "./pages/Category";
// import ProductDetail from "./pages/ProductDetail";
// import Checkout from "./pages/Checkout";
// import NotFound from "./pages/NotFound";
// import OurStory from "./pages/about/OurStory";
// import Sustainability from "./pages/about/Sustainability";
// import SizeGuide from "./pages/about/SizeGuide";
// import CustomerCare from "./pages/about/CustomerCare";
// import StoreLocator from "./pages/about/StoreLocator";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import TermsOfService from "./pages/TermsOfService";
// import SignIn from "./pages/auth/sigin";
// import Registration from "./pages/auth/Registration"
// import Whislist from "./pages/auth/Whislist"


// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <ScrollToTop />
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/category/:category" element={<Category />} />
//           <Route path="/product/:productId" element={<ProductDetail />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/about/our-story" element={<OurStory />} />
//           <Route path="/about/sustainability" element={<Sustainability />} />
//           <Route path="/about/size-guide" element={<SizeGuide />} />
//           <Route path="/about/customer-care" element={<CustomerCare />} />
//           <Route path="/about/store-locator" element={<StoreLocator />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/terms-of-service" element={<TermsOfService />} />
//           <Route path="/account" element={<SignIn />} />
//           <Route path="/register" element={<Registration />} />
//           <Route path="/whislist" element={<Whislist/>}/>

//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Index from "./pages/Index";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";

import OurStory from "./pages/about/OurStory";
import Sustainability from "./pages/about/Sustainability";
import SizeGuide from "./pages/about/SizeGuide";
import CustomerCare from "./pages/about/CustomerCare";
import StoreLocator from "./pages/about/StoreLocator";

import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

import SignIn from "./pages/auth/sigin";
import Registration from "./pages/auth/Registration";
import Wishlist from "./pages/auth/Wishlist"; // ✅ correct import
import Cart from "./pages/auth/Cart";
import NotificationPanel from "./pages/auth/NotificationPanel";
import NewArrivals from "./pages/NewArrivals/NewArrivals";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/about/our-story" element={<OurStory />} />
          <Route path="/about/sustainability" element={<Sustainability />} />
          <Route path="/about/size-guide" element={<SizeGuide />} />
          <Route path="/about/customer-care" element={<CustomerCare />} />
          <Route path="/about/store-locator" element={<StoreLocator />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />

          <Route path="/account" element={<SignIn />} />
          <Route path="/register" element={<Registration />} />

          {/* ✅ FIXED ROUTE */}
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/notifications" element={<NotificationPanel open={true} onClose={() => {}} />} />
            <Route path="/new-arrivals" element={<NewArrivals/>} />
  
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
