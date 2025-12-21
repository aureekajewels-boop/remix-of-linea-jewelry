import { useState } from "react";
import { Minus, Plus, CreditCard, Check, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AureekaHeader from "../components/header/AureekaHeader";
import AureekaFooter from "../components/footer/AureekaFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

import kundanNecklace from "@/assets/aureeka/kundan-necklace.jpg";
import koreanEarrings from "@/assets/aureeka/korean-earrings.jpg";

const Checkout = () => {
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [customerDetails, setCustomerDetails] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: ""
  });
  const [shippingAddress, setShippingAddress] = useState({
    address: "",
    city: "",
    postalCode: "",
    state: "",
    country: "India"
  });
  const [hasSeparateBilling, setHasSeparateBilling] = useState(false);
  const [shippingOption, setShippingOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Kundan Bridal Necklace Set",
      price: "₹2,499",
      quantity: 1,
      image: kundanNecklace
    },
    {
      id: 2,
      name: "Korean Crystal Earrings", 
      price: "₹899",
      quantity: 2,
      image: koreanEarrings
    }
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(items => items.filter(item => item.id !== id));
    } else {
      setCartItems(items => 
        items.map(item => 
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace('₹', '').replace(',', ''));
    return sum + (price * item.quantity);
  }, 0);

  const getShippingCost = () => {
    if (subtotal >= 999) return 0;
    switch (shippingOption) {
      case "express": return 99;
      default: return 49;
    }
  };
  
  const shipping = getShippingCost();
  const total = subtotal + shipping;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <AureekaHeader />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 max-w-lg text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="font-display text-3xl font-semibold text-foreground mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-muted-foreground mb-8">
              Thank you for shopping with Aureeka Jewels. Your order confirmation has been sent to your email.
            </p>
            <Link to="/">
              <Button className="rounded-full">Continue Shopping</Button>
            </Link>
          </div>
        </main>
        <AureekaFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AureekaHeader />
      
      <main className="pt-6 pb-16">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Link>

          <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary - Mobile First */}
            <div className="lg:col-span-1 lg:order-2">
              <div className="bg-cream-50 rounded-2xl p-6 sticky top-24">
                <h2 className="font-semibold text-foreground mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-cream-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-foreground line-clamp-1">{item.name}</h3>
                        <p className="text-sm text-primary font-semibold">{item.price}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-cream-100"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-cream-100"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Discount Code */}
                <div className="border-t border-cream-200 pt-4 mb-4">
                  {!showDiscountInput ? (
                    <button 
                      onClick={() => setShowDiscountInput(true)}
                      className="text-sm text-primary hover:underline"
                    >
                      Have a discount code?
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Enter code"
                        className="rounded-full text-sm"
                      />
                      <Button size="sm" variant="outline" className="rounded-full">Apply</Button>
                    </div>
                  )}
                </div>

                {/* Totals */}
                <div className="border-t border-cream-200 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                      {shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}
                    </span>
                  </div>
                  {subtotal < 999 && (
                    <p className="text-xs text-muted-foreground">
                      Add ₹{999 - subtotal} more for free shipping
                    </p>
                  )}
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t border-cream-200">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Forms */}
            <div className="lg:col-span-2 lg:order-1 space-y-6">
              {/* Customer Details */}
              <div className="bg-cream-50 rounded-2xl p-6">
                <h2 className="font-semibold text-foreground mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-sm">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerDetails.email}
                      onChange={(e) => setCustomerDetails({...customerDetails, email: e.target.value})}
                      className="mt-1 rounded-full"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm">First Name *</Label>
                      <Input
                        id="firstName"
                        value={customerDetails.firstName}
                        onChange={(e) => setCustomerDetails({...customerDetails, firstName: e.target.value})}
                        className="mt-1 rounded-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={customerDetails.lastName}
                        onChange={(e) => setCustomerDetails({...customerDetails, lastName: e.target.value})}
                        className="mt-1 rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerDetails.phone}
                      onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})}
                      className="mt-1 rounded-full"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-cream-50 rounded-2xl p-6">
                <h2 className="font-semibold text-foreground mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="text-sm">Address *</Label>
                    <Input
                      id="address"
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                      className="mt-1 rounded-full"
                      placeholder="House/Flat No., Street, Landmark"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-sm">City *</Label>
                      <Input
                        id="city"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                        className="mt-1 rounded-full"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-sm">State *</Label>
                      <Input
                        id="state"
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                        className="mt-1 rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="postalCode" className="text-sm">PIN Code *</Label>
                    <Input
                      id="postalCode"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                      className="mt-1 rounded-full"
                      placeholder="6 digit PIN code"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="separateBilling"
                      checked={hasSeparateBilling}
                      onCheckedChange={(checked) => setHasSeparateBilling(checked === true)}
                    />
                    <Label htmlFor="separateBilling" className="text-sm cursor-pointer">
                      Use different billing address
                    </Label>
                  </div>
                </div>
              </div>

              {/* Shipping Options */}
              <div className="bg-cream-50 rounded-2xl p-6">
                <h2 className="font-semibold text-foreground mb-4">Shipping Method</h2>
                <RadioGroup value={shippingOption} onValueChange={setShippingOption} className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-cream-200 bg-background">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standard Delivery</Label>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {subtotal >= 999 ? "Free" : "₹49"} • 5-7 days
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-cream-200 bg-background">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express">Express Delivery</Label>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {subtotal >= 999 ? "Free" : "₹99"} • 2-3 days
                    </span>
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Method */}
              <div className="bg-cream-50 rounded-2xl p-6">
                <h2 className="font-semibold text-foreground mb-4">Payment Method</h2>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-cream-200 bg-background">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod">Cash on Delivery</Label>
                    </div>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Popular</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-cream-200 bg-background">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi">UPI / Google Pay / PhonePe</Label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-cream-200 bg-background">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" /> Credit/Debit Card
                      </Label>
                    </div>
                  </div>
                </RadioGroup>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing || cartItems.length === 0}
                  className="w-full mt-6 rounded-full h-12 text-base"
                >
                  {isProcessing ? "Placing Order..." : `Place Order • ₹${total.toLocaleString()}`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AureekaFooter />
    </div>
  );
};

export default Checkout;
