"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  // Add state for the basket count
  const [basketCount, setBasketCount] = useState(0);

  // Load existing items from memory so the basket count is accurate
  useEffect(() => {
    const savedCart = localStorage.getItem("restaurant_cart");
    if (savedCart) {
      setBasketCount(JSON.parse(savedCart).length);
    }
  }, []);

  const trendingItems = [
    { id: "chicken-halloumi", name: "CHICKEN HALLOUMI PESTO WRAP", image: "/Chicken-Halloumi-Pesto-Wrap.png" },
    { id: "cheese-burger", name: "CHEESE BURGER WRAP", image: "/Cheese-Burger-Wrap.png" },
    { id: "baked-potatoes", name: "BAKED BABY POTATOES", image: "/Baked-Baby-Potatoes.png" },
    { id: "mango-falafel", name: "MANGO FALAFEL WRAP", image: "/Mango-Falafel-Wrap.png" },
  ];

  return (
    <main className="relative min-h-screen bg-[url('/background.png')] bg-auto bg-center bg-fixed bg-repeat pb-24">
      
      {/* Sticky Header with Order Tab added */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Left Side: Logo */}
          <div className="flex-1 flex justify-start">
            <Link href="/">
              <div className="relative w-14 h-14 md:w-16 md:h-16 hover:scale-105 transition-transform cursor-pointer">
                <Image 
                  src="/logo.png" 
                  alt="Restaurant Logo" 
                  fill 
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Middle: Navigation Links */}
          <nav className="flex justify-center gap-6 md:gap-10 font-black text-gray-800 uppercase tracking-wide text-sm md:text-base">
            <Link href="/menu" className="hover:text-green-600 transition-colors cursor-pointer">
              Menu
            </Link>
            <Link href="/our-story" className="hover:text-green-600 transition-colors cursor-pointer">
              Our Story
            </Link>
            {/* Added Order Link Here */}
            <Link href="/order" className="hover:text-green-600 transition-colors cursor-pointer">
              Order
            </Link>
          </nav>

          {/* Right Side: Cart Icon linking to Order page */}
          <div className="flex-1 flex justify-end">
            <Link href="/order">
              <div className="flex items-center text-gray-800 hover:text-green-600 transition-colors cursor-pointer group">
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  {/* Dynamic Cart Counter */}
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full group-hover:bg-green-600 transition-colors">
                    {basketCount}
                  </span>
                </div>
              </div>
            </Link>
          </div>
          
        </div>
      </header>

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-32 px-4">
        
        {/* Main Image Container */}
        <div className="relative w-full aspect-[5/6] md:aspect-video rounded-xl overflow-hidden shadow-2xl border-4 border-white">
          <Image
            src="/main.png"
            alt="Our delicious signature lettuce wraps"
            fill
            priority 
            className="object-cover scale-100 md:scale-95"
          />
          
          {/* Order Now Button (Now correctly links to Menu) */}
          <Link href="/menu">
            <button className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 bg-green-600 text-white font-black text-lg md:text-xl py-3 px-6 md:py-4 md:px-8 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.5)] hover:bg-green-700 hover:scale-105 transition-transform duration-200 border-2 border-white cursor-pointer">
              ORDER NOW
            </button>
          </Link>
        </div>

        {/* Trending Now Section */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Trending Now
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trendingItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-4 md:p-6 flex flex-col items-center text-center border border-gray-100">
                
                <div className="relative w-full h-32 md:h-40 mb-4">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-contain" 
                  />
                </div>
                
                <h3 className="font-bold text-gray-800 uppercase text-sm md:text-base flex-grow">
                  {item.name}
                </h3>
                
                {/* '+' Button (Now jumps user to Menu page to place their order) */}
                <Link href="/menu" className="mt-4">
                  <button className="w-10 h-10 rounded-full border border-yellow-500 text-yellow-600 text-2xl font-light flex items-center justify-center hover:bg-yellow-50 transition-colors cursor-pointer pb-1">
                    +
                  </button>
                </Link>
                
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </main>
  );
}