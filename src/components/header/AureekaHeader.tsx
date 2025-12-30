
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Heart,
  Bell,
  ShoppingBag,
  User,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import NotificationPanel from "../../pages/auth/NotificationPanel";

const AureekaHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const cartCount = 0;
  const wishlistCount = 0;
  const notificationCount = 0;

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const categories = [
    { name: "Earrings", href: "/category/earrings" },
    { name: "Necklaces", href: "/category/necklaces" },
    { name: "Mangalsutra", href: "/category/mangalsutra" },
    { name: "Rings", href: "/category/rings" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full">
        {/* Announcement */}
        <div className="bg-primary text-primary-foreground text-center py-2 text-sm">
          ✨ Free Shipping on Orders Above ₹999 | New Arrivals Every Week!
        </div>

        <nav className="bg-background/95 backdrop-blur border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Aureeka Jewels</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-3">
                    {categories.map((c) => (
                      <Link key={c.name} to={c.href} className="block py-2">
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Logo */}
              <Link to="/" className="text-2xl font-semibold">
                <span className="text-primary">Aureeka</span> Jewels
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex gap-8">
                {categories.map((c) => (
                  <Link key={c.name} to={c.href} className="text-sm hover:text-primary">
                    {c.name}
                  </Link>
                ))}
                <Link to="/new-arrivals" className="text-primary text-sm">
                  New Arrivals
                </Link>
              </nav>

              {/* Right Icons */}
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                  <Search className="h-5 w-5" />
                </Button>

                <Link to="/wishlist" className="hidden md:block">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </Link>

                {/* 🔔 Notifications */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hidden md:flex"
                  onClick={() => setOpenNotification(true)}
                >
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-orange-600 text-white text-[10px] flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </Button>

                <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex">
                  {isDarkMode ? <Sun /> : <Moon />}
                </Button>

                <Link to="/cart">
                  <Button variant="ghost" size="icon">
                    <ShoppingBag className="h-5 w-5" />
                  </Button>
                </Link>

                <Link to="/account" className="hidden md:block">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Search */}
          {isSearchOpen && (
            <div className="absolute inset-x-0 top-full bg-background border-b p-4">
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5" />
                <Input autoFocus className="pl-10 pr-10 h-12" placeholder="Search jewellery…" />
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* 🔔 Notification Drawer */}
      <NotificationPanel
        open={openNotification}
        onClose={() => setOpenNotification(false)}
      />
    </>
  );
};

export default AureekaHeader;
