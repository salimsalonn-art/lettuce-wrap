"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("Wraps");
  const [cartItems, setCartItems] = useState<any[]>([]);
  
  // State to control the slide-out cart drawer
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load existing items from memory
  useEffect(() => {
    const savedCart = localStorage.getItem("restaurant_cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Calculate total for the drawer
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const categories = ["Wraps", "Sides", "Desserts", "Drinks"];

  const menuItems = [
    { id: 1, name: "CHICKEN HALLOUMI PESTO WRAP", desc: "100g of grilled chicken, halloumi, tomato, and avocado with homemade cashew.", price: 11.00, image: "/Chicken-Halloumi-Pesto-Wrap.png", category: "Wraps" },
    { id: 2, name: "CHEESE BURGER WRAP", desc: "100g of beef patty, cheddar cheese, tomato, onions, and coleslaw with our special sauce.", price: 11.00, image: "/Cheese-Burger-Wrap.png", category: "Wraps" },
    { id: 3, name: "MANGO FALAFEL WRAP", desc: "A light and fresh combination of baked falafel, mango slices, creamy avocado.", price: 8.50, image: "/Mango-Falafel-Wrap.png", category: "Wraps" },
    { id: 4, name: "CHICKEN CAESAR WRAP", desc: "100g of grilled chicken topped with Parmesan cheese, fresh arugula.", price: 10.00, image: "/Chicken-Caesar-Wrap.png", category: "Wraps" },
    { id: 5, name: "CHICKEN PEANUT WRAP", desc: "100g of grilled chicken tossed in our homemade teriyaki sauce, paired with peanuts.", price: 10.50, image: "/Chicken-Peanut-Wrap.png", category: "Wraps" },
    { id: 6, name: "CHICKEN CLUB WRAP", desc: "Ham or turkey, 100g of grilled chicken, mozzarella cheese, boiled egg.", price: 11.00, image: "/Chicken-Club-Wrap.png", category: "Wraps" },
    { id: 7, name: "TUNA WRAP", desc: "100g of Canned tuna mixed with red onions, celery, pickles, and fresh lettuce.", price: 9.00, image: "/Tuna-Wrap.png", category: "Wraps" },
    { id: 8, name: "CRAB WRAP", desc: "100g of crab sticks, crisp carrots, cucumber, creamy avocado, topped with sauce.", price: 9.50, image: "/Crab-Wrap.png", category: "Wraps" },
    { id: 9, name: "BAKED BABY POTATOES", desc: "Baked baby potatoes, seasoned with oregano, served with a light mayo-mustard sauce.", price: 3.50, image: "/Baked-Baby-Potatoes.png", category: "Sides" },
    { id: 10, name: "CHOCOLATE DATES", desc: "Dates filled with homemade peanut butter, covered in dark chocolate.", price: 2.00, image: "/Chocolate-Dates.png", category: "Desserts" },
    { id: 11, name: "ORIGINAL RIM SPARKLING WATER", desc: "Refreshing sparkling water.", price: 2.00, image: "/Original-Rim-Sparkling-Water.png", category: "Drinks" }
  ];

  const upsellItems = [
    { id: 9, name: "BAKED BABY POTATOES", price: 3.50, image: "/Baked-Baby-Potatoes.png" },
    { id: 10, name: "CHOCOLATE DATES", price: 2.00, image: "/Chocolate-Dates.png" },
    { id: 11, name: "SPARKLING WATER", price: 2.00, image: "/Original-Rim-Sparkling-Water.png" }
  ];

  const scrollToCategory = (category: string) => {
    setActiveCategory(category);
    const element = document.getElementById(category);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Group items for the cart drawer
  const uniqueItems = Array.from(new Set(cartItems.map(a => a.id)))
    .map(id => cartItems.find(a => a.id === id));

  // Add an item to the order (used in menu and drawer)
  const handleAddToOrder = (item: any) => {
    const updatedCart = [...cartItems, item];
    setCartItems(updatedCart);
    localStorage.setItem("restaurant_cart", JSON.stringify(updatedCart));
  };

  // Remove ONE instance of an item (used for +/- on menu and drawer)
  const handleRemoveFromOrder = (itemToRemove: any) => {
    const index = cartItems.findIndex((item) => item.id === itemToRemove.id);
    if (index !== -1) {
      const updatedCart = [...cartItems];
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
      localStorage.setItem("restaurant_cart", JSON.stringify(updatedCart));
    }
  };

  // Remove ALL instances of an item (used for Trash can in drawer)
  const handleRemoveGroup = (idToRemove: number) => {
    const updated = cartItems.filter(item => item.id !== idToRemove);
    setCartItems(updated);
    localStorage.setItem("restaurant_cart", JSON.stringify(updated));
  };

  return (
    <main className="relative min-h-screen bg-[url('/background.png')] bg-auto bg-center bg-fixed bg-repeat pb-24 font-sans overflow-hidden">
      
      {/* --- MENU PAGE CONTENT --- */}
      
      {/* 1. Main Sticky Header */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <Link href="/">
              <div className="relative w-14 h-14 md:w-16 md:h-16 hover:scale-105 transition-transform cursor-pointer">
                <Image src="/logo.png" alt="Restaurant Logo" fill className="object-contain" />
              </div>
            </Link>
          </div>
          <nav className="flex justify-center gap-6 md:gap-10 font-black text-gray-800 uppercase tracking-wide text-sm md:text-base">
            <Link href="/menu" className="text-green-600 transition-colors cursor-pointer">
              Menu
            </Link>
            <Link href="/our-story" className="hover:text-green-600 transition-colors cursor-pointer">
              Our Story
            </Link>
          </nav>
          <div className="flex-1 flex justify-end">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center text-gray-800 hover:text-green-600 transition-colors cursor-pointer group"
            >
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full group-hover:bg-green-600 transition-colors">
                  {cartItems.length}
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Sub-Header for Categories */}
      <div className="fixed top-20 left-0 w-full z-30 bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <ul className="flex justify-center space-x-6 md:space-x-12 overflow-x-auto py-3">
            {categories.map((category) => (
              <li key={category}>
                <button
                  onClick={() => scrollToCategory(category)}
                  className={`text-sm md:text-base font-semibold uppercase tracking-wide pb-1 transition-colors whitespace-nowrap
                    ${activeCategory === category 
                      ? "text-gray-900 border-b-2 border-yellow-500" 
                      : "text-gray-500 hover:text-gray-900"
                    }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. Menu Sections Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-40 px-4">
        {categories.map((category) => (
          <div key={category} id={category} className="mb-16 scroll-mt-40">
            <h2 className="text-3xl font-black text-gray-900 uppercase mb-8 text-center md:text-left border-b-2 border-gray-200 pb-2">
              {category}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems
                .filter(item => item.category === category)
                .map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center text-center border border-gray-100 transition-transform hover:shadow-md">
                    <div className="relative w-full aspect-[4/3] shrink-0 mb-6">
                      <Image src={item.image} alt={item.name} fill className="object-contain" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </div>
                    
                    <div className="mb-2 w-full flex flex-col items-center">
                      <span className="font-black text-green-600 text-lg mb-1">${item.price.toFixed(2)}</span>
                      <h3 className="font-bold text-gray-900 uppercase text-lg leading-tight">
                        {item.name}
                      </h3>
                    </div>
                    
                    <p className="text-gray-500 text-sm mb-6 flex-grow px-2">
                      {item.desc}
                    </p>
                    
                    {/* Menu Item Quantity Bar */}
                    <div className="mt-auto flex items-center justify-between w-full bg-gray-50 border border-gray-200 rounded-full px-4 py-2">
                      <button 
                        onClick={() => handleRemoveFromOrder(item)}
                        className="w-8 h-8 flex items-center justify-center text-red-500 font-black text-2xl hover:bg-gray-200 rounded-full transition-colors cursor-pointer pb-1"
                      >
                        -
                      </button>
                      <span className="font-bold text-gray-900 text-lg">
                        {cartItems.filter(cartItem => cartItem.id === item.id).length}
                      </span>
                      <button 
                        onClick={() => handleAddToOrder(item)}
                        className="w-8 h-8 flex items-center justify-center text-green-600 font-black text-2xl hover:bg-gray-200 rounded-full transition-colors cursor-pointer pb-1"
                      >
                        +
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating View Order Button (Opens Drawer) */}
      {!isCartOpen && cartItems.length > 0 && (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-30">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 bg-green-600 text-white font-black text-lg py-4 px-8 rounded-full shadow-[0_10px_25px_rgba(0,128,0,0.4)] border-2 border-white hover:bg-green-700 hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            VIEW BAG
            <span className="bg-white text-green-600 rounded-full px-2 py-0.5 text-sm">
              {cartItems.length}
            </span>
          </button>
        </div>
      )}

      {/* --- SLIDE-OUT CART DRAWER --- */}

      {/* Dark overlay backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[90] transition-opacity cursor-pointer"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Drawer Container */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[100] shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 shrink-0 bg-white">
          <button onClick={() => setIsCartOpen(false)} className="text-gray-800 hover:text-gray-500 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter absolute left-1/2 transform -translate-x-1/2">
            BAG
          </h2>
        </div>

        {/* Scrollable Drawer Content */}
        <div className="flex-grow overflow-y-auto bg-white pb-24 pt-2">
          
          {/* Drawer Cart Items */}
          <div className="border-t border-gray-200 mt-2">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 px-4">
                <p className="text-lg text-gray-500 font-medium">Your bag is empty.</p>
              </div>
            ) : (
              uniqueItems.map((item: any) => {
                const quantity = cartItems.filter((cartItem) => cartItem.id === item.id).length;
                return (
                  <div key={item.id} className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-start justify-between">
                      <div className="relative w-24 h-16 shrink-0 mt-2">
                        <Image src={item.image} alt={item.name} fill className="object-contain" />
                      </div>
                      
                      <div className="flex-grow pl-4">
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-lg font-medium text-gray-900">${(item.price * quantity).toFixed(2)}</span>
                          <button onClick={() => handleRemoveGroup(item.id)} className="text-[#347690] hover:text-red-500 transition-colors p-1 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                          </button>
                        </div>
                        
                        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1">
                          {quantity > 1 ? `${quantity}x ` : ""}{item.name}
                        </h3>
                        <p className="text-xs text-gray-500 leading-tight mb-3 pr-6 line-clamp-2">
                          {item.desc}
                        </p>
                        
                        {/* Drawer Item Quantity Control (+/-) */}
                        <div className="flex items-center bg-white border border-gray-200 rounded-full px-2 py-1 gap-3 shadow-sm shrink-0 w-max mt-2">
                          <button 
                            onClick={() => handleRemoveFromOrder(item)}
                            className="w-6 h-6 flex items-center justify-center text-red-500 font-bold text-lg hover:bg-gray-100 rounded-full transition-colors pb-0.5 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-black text-gray-900 text-sm w-4 text-center">{quantity}</span>
                          <button 
                            onClick={() => handleAddToOrder(item)}
                            className="w-6 h-6 flex items-center justify-center text-green-600 font-bold text-lg hover:bg-gray-100 rounded-full transition-colors pb-0.5 cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Upsell Section */}
          <div className="bg-[#f5f4ef] py-6 border-b border-gray-200 mt-4">
            <h2 className="text-sm font-black text-[#5b6a62] uppercase tracking-wide px-4 mb-4">
              YOU MAY ALSO LIKE
            </h2>
            <div className="flex overflow-x-auto gap-4 px-4 pb-2 snap-x hide-scrollbar">
              {upsellItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm p-3 min-w-[140px] flex flex-col items-center text-center snap-center shrink-0 border border-gray-100">
                  <div className="relative w-full h-16 mb-2">
                    <Image src={item.image} alt={item.name} fill className="object-contain" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-xs leading-tight flex-grow mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2">
                    +${item.price.toFixed(2)}
                  </p>
                  <button 
                    onClick={() => handleAddToOrder(item)}
                    className="mt-auto w-8 h-8 rounded-full border border-yellow-500 text-gray-900 text-xl font-light flex items-center justify-center hover:bg-yellow-50 transition-colors cursor-pointer pb-1"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-[#f5f4ef] p-4 flex justify-between items-center border-b border-gray-200 cursor-pointer hover:bg-[#ebeae4] transition-colors">
            <span className="font-bold text-[#5b6a62] text-sm uppercase tracking-wide">
              AVAILABLE REWARDS & OFFERS
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-[#5b6a62]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>

        </div>

        {/* Drawer Sticky Footer Checkout Bar */}
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
          <div className="flex gap-3">
            <button 
              onClick={() => setIsCartOpen(false)} 
              className="w-[35%] bg-white text-gray-900 font-bold text-sm md:text-base py-3 rounded-lg border-2 border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Add More
            </button>
            <Link href="/order" className="w-[65%]">
              <button 
                disabled={cartItems.length === 0}
                className={`w-full font-bold text-sm md:text-base py-3 rounded-lg transition-colors cursor-pointer ${
                  cartItems.length > 0 
                    ? "bg-[#fbad18] text-gray-900 hover:bg-[#e59b15]" 
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Checkout - ${totalAmount.toFixed(2)}
              </button>
            </Link>
          </div>
        </div>

      </div>

    </main>
  );
}