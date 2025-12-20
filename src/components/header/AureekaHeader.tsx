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
  Moon
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

const AureekaHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cartCount] = useState(0);
  const [wishlistCount] = useState(0);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const categories = [
    { name: "Earrings", href: "/category/earrings" },
    { name: "Necklaces", href: "/category/necklaces" },
    { name: "Mangalsutra", href: "/category/mangalsutra" },
    { name: "Rings", href: "/category/rings" },
    { name: "Bangles", href: "/category/bangles" },
    { name: "Anklets", href: "/category/anklets" },
  ];

  const brands = [
    { name: "Kundan", href: "/brand/kundan" },
    { name: "American Diamond", href: "/brand/american-diamond" },
    { name: "Korean", href: "/brand/korean" },
    { name: "Oxidised", href: "/brand/oxidised" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top announcement bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-light">
        <span className="animate-pulse">✨</span> Free Shipping on Orders Above ₹999 | 
        <span className="font-medium ml-1">New Arrivals Every Week!</span>
      </div>

      {/* Main header */}
      <nav className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="font-display text-2xl text-primary">
                    Aureeka Jewels
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-3">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <Link
                          key={cat.name}
                          to={cat.href}
                          className="block py-2 text-foreground hover:text-primary transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground mb-3">Brands</h3>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <Link
                          key={brand.name}
                          to={brand.href}
                          className="block py-2 text-foreground hover:text-primary transition-colors"
                        >
                          {brand.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <h1 className="font-display text-2xl md:text-3xl font-semibold tracking-tight">
                <span className="text-primary">Aureeka</span>
                <span className="text-foreground"> Jewels</span>
              </h1>
            </Link>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {categories.slice(0, 4).map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.href}
                  className="text-sm font-light text-foreground hover:text-primary transition-colors relative group"
                >
                  {cat.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                </Link>
              ))}
              <Link
                to="/new-arrivals"
                className="text-sm font-light text-primary hover:text-primary-hover transition-colors"
              >
                New Arrivals
              </Link>
            </nav>

            {/* Right icons */}
            <div className="flex items-center space-x-1 md:space-x-2">
              {/* Search */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="relative"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="relative hidden md:flex">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative hidden md:flex">
                <Bell className="h-5 w-5" />
              </Button>

              {/* Theme toggle */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleTheme}
                className="hidden md:flex"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Account */}
              <Link to="/account">
                <Button variant="ghost" size="icon" className="hidden md:flex">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Search overlay */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 animate-fade-in">
            <div className="container mx-auto max-w-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for jewelry, categories, brands..."
                  className="pl-10 pr-10 h-12 text-base"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {["Kundan Earrings", "Mangalsutra", "AD Rings", "Gold Bangles", "Korean Studs"].map((term) => (
                    <Button key={term} variant="secondary" size="sm" className="text-xs">
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default AureekaHeader;
