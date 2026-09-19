"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function OrderPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // New Form States for Delivery and Contact Info
  const [customerName, setCustomerName] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [address, setAddress] = useState("");
  const [selectedZone, setSelectedZone] = useState<any>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("restaurant_cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsLoaded(true);
  }, []);

  // Delivery Zones Configuration
  const deliveryZones = [
    { id: 'zone1', label: 'Delivery (beit misk - mar moussa - monteverde)', fee: 6.00, minOrder: 20.00, type: 'delivery' },
    { id: 'zone2', label: 'Delivery (ain saadeh - baabdath)', fee: 5.00, minOrder: 0, type: 'delivery' },
    { id: 'zone3', label: 'Delivery (beit merry - roumieh)', fee: 3.50, minOrder: 0, type: 'delivery' },
    { id: 'zone4', label: 'Delivery (broumana)', fee: 2.00, minOrder: 0, type: 'delivery' },
    { id: 'pickup', label: 'Pick up', fee: 0.00, minOrder: 0, type: 'pickup' },
  ];

  // Professional calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const deliveryFee = selectedZone ? selectedZone.fee : 0;
  const totalAmount = subtotal + deliveryFee;

  // Group items so they don't duplicate on the screen
  const uniqueItems = Array.from(new Set(cartItems.map(a => a.id)))
    .map(id => cartItems.find(a => a.id === id));

  const handleAdd = (item: any) => {
    const updated = [...cartItems, item];
    setCartItems(updated);
    localStorage.setItem("restaurant_cart", JSON.stringify(updated));
  };

  const handleRemove = (itemToRemove: any) => {
    const index = cartItems.findIndex((item) => item.id === itemToRemove.id);
    if (index !== -1) {
      const updated = [...cartItems];
      updated.splice(index, 1);
      setCartItems(updated);
      localStorage.setItem("restaurant_cart", JSON.stringify(updated));
    }
  };

  // Validation Logic to enable/disable Place Order button
  const isMinOrderMet = selectedZone?.minOrder ? subtotal >= selectedZone.minOrder : true;
  const isFormValid = 
    cartItems.length > 0 &&
    customerName.trim().length > 0 &&
    whatsappNumber.trim().length > 0 &&
    selectedZone !== null &&
    isMinOrderMet &&
    (selectedZone.type === 'pickup' || (selectedZone.type === 'delivery' && address.trim().length > 0));

  const handlePlaceOrder = async () => {
    if (!isFormValid) return;

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          whatsappNumber: `+961 ${whatsappNumber}`,
          deliveryMethod: selectedZone.label,
          address: selectedZone.type === 'delivery' ? address : 'N/A (Pickup)',
          cartItems,
          specialInstructions,
          deliveryFee,
          totalAmount
        }),
      });

      if (response.ok) {
        alert("Thank you! Your order has been placed and sent to the kitchen.");
        setCartItems([]);
        localStorage.removeItem("restaurant_cart");
        setSpecialInstructions("");
        window.location.href = '/';
      } else {
        alert("Something went wrong sending your order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to connect to the server.");
    }
  };

  if (!isLoaded) return null;

  return (
    <main className="relative min-h-screen bg-[url('/background.png')] bg-auto bg-center bg-fixed bg-repeat pb-24">
      
      {/* Main Sticky Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <Link href="/">
              <div className="relative w-14 h-14 md:w-16 md:h-16 hover:scale-105 transition-transform cursor-pointer">
                <Image src="/logo.png" alt="Restaurant Logo" fill className="object-contain" />
              </div>
            </Link>
          </div>
          <nav className="flex justify-center gap-6 md:gap-10 font-black text-gray-800 uppercase tracking-wide text-sm md:text-base">
            <Link href="/menu" className="hover:text-green-600 transition-colors cursor-pointer">
              Menu
            </Link>
            <Link href="/our-story" className="hover:text-green-600 transition-colors cursor-pointer">
              Our Story
            </Link>
            <Link href="/order" className="text-green-600 transition-colors cursor-pointer">
              Order
            </Link>
          </nav>
          <div className="flex-1 flex justify-end">
            <div className="flex items-center text-green-600 transition-colors group">
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Order Content Wrapper */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-32 px-4">
        
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase mb-8 border-b-4 border-green-600 pb-4 inline-block bg-white/80 backdrop-blur-sm px-4 rounded-t-lg">
          Checkout
        </h1>
        
        {cartItems.length === 0 ? (
          
          /* EMPTY STATE */
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-gray-100 max-w-2xl mx-auto mt-8">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-gray-900 uppercase mb-4">Your basket is empty</h2>
            <p className="text-gray-500 mb-8 text-lg">Looks like you haven't made your choice yet. Let's fix that!</p>
            <Link href="/menu">
              <button className="bg-green-600 text-white font-black text-lg py-4 px-10 rounded-full shadow-lg hover:bg-green-700 hover:scale-105 transition-transform duration-200 cursor-pointer">
                START ORDER
              </button>
            </Link>
          </div>

        ) : (
          
          /* FILLED STATE (Two Columns) */
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* LEFT COLUMN: Customer Info, Items, Delivery Options & Instructions */}
            <div className="w-full lg:w-2/3 space-y-6">
              
              {/* Customer Information Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase border-b-2 border-gray-100 pb-4 mb-6">
                  1. Customer Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Your full name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 uppercase mb-1">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <div className="bg-gray-100 border border-gray-300 rounded-xl p-3 flex items-center justify-between min-w-[90px] text-gray-700 font-bold">
                        <span>+961</span>
                      </div>
                      <input 
                        type="tel" 
                        placeholder="Phone number"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="flex-grow bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Items Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <div className="flex justify-between items-center border-b-2 border-gray-100 pb-4 mb-6">
                  <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase">
                    2. Review Your Items
                  </h2>
                  <Link href="/menu" className="text-sm font-bold text-green-600 hover:underline uppercase">
                    + Add item
                  </Link>
                </div>
                
                <div className="space-y-6">
                  {uniqueItems.map((item: any) => {
                    const quantity = cartItems.filter((cartItem) => cartItem.id === item.id).length;
                    
                    return (
                      <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50/50 p-4 rounded-xl border border-gray-200">
                        
                        <div className="relative w-20 h-20 shrink-0 bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                          <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                        </div>
                        
                        <div className="flex-grow text-center sm:text-left w-full">
                          <h3 className="font-bold text-gray-900 uppercase text-base leading-tight">{item.name}</h3>
                          <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)} each</p>
                        </div>
                        
                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 mt-4 sm:mt-0">
                          {/* Quantity Controls */}
                          <div className="flex items-center bg-white border border-gray-200 rounded-full px-2 py-1 gap-4 shadow-sm shrink-0">
                            <button onClick={() => handleRemove(item)} className="w-8 h-8 flex items-center justify-center text-red-500 font-bold text-xl hover:bg-gray-100 rounded-full transition-colors pb-1 cursor-pointer">-</button>
                            <span className="font-black text-gray-900 text-base">{quantity}</span>
                            <button onClick={() => handleAdd(item)} className="w-8 h-8 flex items-center justify-center text-green-600 font-bold text-xl hover:bg-gray-100 rounded-full transition-colors pb-1 cursor-pointer">+</button>
                          </div>
                          
                          {/* Total Item Price */}
                          <div className="font-black text-gray-900 text-lg w-20 text-right">
                            ${(item.price * quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Options Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase border-b-2 border-gray-100 pb-4 mb-6">
                  3. Delivery Option <span className="text-red-500">*</span>
                </h2>
                
                <div className="space-y-3">
                  {deliveryZones.map((zone) => {
                    const isSelected = selectedZone?.id === zone.id;
                    return (
                      <label key={zone.id} className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-colors ${isSelected ? 'border-green-600 bg-green-50/30' : 'border-gray-200 hover:border-gray-300'}`}>
                        <div className="flex items-center h-5 mt-0.5">
                          <input 
                            type="radio" 
                            name="delivery_zone" 
                            className="w-4 h-4 text-green-600 focus:ring-green-600 border-gray-300"
                            checked={isSelected}
                            onChange={() => setSelectedZone(zone)}
                          />
                        </div>
                        <div className="ml-3 flex-grow">
                          <span className="block font-bold text-gray-900 text-sm md:text-base">{zone.label}</span>
                          {zone.fee > 0 && (
                            <span className="block text-xs md:text-sm text-gray-500 mt-0.5">Flat fee of ${zone.fee.toFixed(2)}</span>
                          )}
                          {zone.minOrder > 0 && (
                            <span className={`block text-xs md:text-sm mt-0.5 ${subtotal < zone.minOrder && isSelected ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                              Minimum order items ${zone.minOrder.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>

                {/* Address Input (Shows if delivery selected) */}
                {selectedZone && selectedZone.type === 'delivery' && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <label className="block text-sm font-bold text-gray-700 uppercase mb-2">
                      Delivery Address <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Enter full address..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600"
                    />
                  </div>
                )}
              </div>

              {/* Special Instructions Card */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase border-b-2 border-gray-100 pb-4 mb-6">
                  4. Special Instructions
                </h2>
                <textarea 
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g., No onions on the burger wrap, extra sauce on the side..."
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600 min-h-[120px] shadow-inner"
                />
              </div>

            </div>

            {/* RIGHT COLUMN: Order Summary Receipt (Sticky) */}
            <div className="w-full lg:w-1/3 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 lg:sticky top-28">
              <h2 className="text-xl md:text-2xl font-black text-gray-900 uppercase border-b-2 border-gray-100 pb-4 mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6 text-gray-600 font-medium">
                <div className="flex justify-between">
                  <span>Items ({cartItems.length})</span>
                  <span className="text-gray-900 font-bold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-gray-900 font-bold">${deliveryFee.toFixed(2)}</span>
                </div>
                 
              </div>
              
              <div className="border-t-2 border-dashed border-gray-200 pt-6 mb-8 flex justify-between items-end">
                <span className="text-xl font-bold text-gray-900 uppercase">Total</span>
                <span className="text-3xl font-black text-green-600">${totalAmount.toFixed(2)}</span>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={!isFormValid}
                className={`w-full font-black text-xl py-4 px-6 rounded-full shadow-lg transition-transform duration-200 flex justify-center items-center gap-2 border ${
                  isFormValid 
                    ? "bg-yellow-500 text-yellow-900 hover:bg-yellow-400 hover:scale-105 border-yellow-600 cursor-pointer" 
                    : "bg-gray-300 text-gray-500 border-gray-400 cursor-not-allowed"
                }`}
              >
                {isFormValid ? "PLACE ORDER" : "COMPLETE REQUIRED FIELDS"}
                {isFormValid && (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                )}
              </button>
              
              <div className="mt-6 flex justify-center items-center gap-2 text-sm text-gray-400 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Secure Checkout
              </div>

            </div>

          </div>
        )}

      </div>
      
    </main>
  );
}