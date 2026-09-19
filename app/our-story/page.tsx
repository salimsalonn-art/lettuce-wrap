"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function OurStoryPage() {
  // Keeping the local state for the basket
  const [basketCount, setBasketCount] = useState(0);

  // Load existing items from memory so the basket count is accurate
  useEffect(() => {
    const savedCart = localStorage.getItem("restaurant_cart");
    if (savedCart) {
      setBasketCount(JSON.parse(savedCart).length);
    }
  }, []);

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
            {/* The Our Story link is now green to show it's the active page */}
            <Link href="/our-story" className="text-green-600 transition-colors cursor-pointer">
              Our Story
            </Link>
            {/* Added the Order link */}
            <Link href="/order" className="hover:text-green-600 transition-colors cursor-pointer">
              Order
            </Link>
          </nav>
          
          <div className="flex-1 flex justify-end">
            <Link href="/order">
              <div className="flex items-center text-gray-800 hover:text-green-600 transition-colors cursor-pointer group">
                <div className="relative">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                  </svg>
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full group-hover:bg-green-600 transition-colors">
                    {basketCount}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Story Content Wrapper */}
      <div className="relative z-10 w-full max-w-4xl mx-auto pt-32 px-4">
        {/* A clean white card to hold the text, making it readable against the background */}
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-8 md:p-14 border border-gray-100 mt-8">
          
          {/* Top Section: Title on Left, Image on Right */}
          <div className="flex justify-between items-start mb-8 w-full">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 uppercase m-0 border-b-4 border-green-600 pb-4">
              Our Story
            </h1>
            
            {/* Larger Image in the right corner */}
            <div className="relative w-24 h-24 md:w-36 md:h-36 shrink-0 rounded-lg overflow-hidden shadow-sm ml-6">
              <Image 
                src="/story.png" 
                alt="Our Story" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
          
          {/* SEO-Optimized Paragraphs */}
          <div className="space-y-6 text-gray-700 leading-relaxed text-lg md:text-xl font-medium">
            <p>
              Our journey began right here in Lebanon with a simple craving for something that was both incredibly delicious and undeniably healthy. We realized that almost everyone loves the crisp, refreshing crunch of lettuce, so we asked ourselves: why not create a delicious and healthy wrap that everyone can enjoy without the guilt? We set out on a mission to redefine fast-casual dining by making premium, low calorie food accessible to all.
            </p>
            <p>
              That vision came to life by rigorously sourcing the best lettuce and the fresh lettuce in the market. Our vibrant, crisp greens serve as the perfect, natural vessel for our mouth-watering, protein-packed ingredients. We firmly believe that eating well shouldn't be expensive, which is why we are dedicated to offering our signature wraps at a low price. We never compromise on quality or flavor, ensuring that every bite is a perfect balance of nutrition and taste.
            </p>
            <p className="font-bold text-gray-900 mt-8 text-xl md:text-2xl">
              From the farm to your plate, our goal is to provide the absolute best healthy wraps in Lebanon—fueling your body, satisfying your cravings, and proving that healthy eating can be affordable and delicious.
            </p>
          </div>

        </div>
      </div>
      
    </main>
  );
}