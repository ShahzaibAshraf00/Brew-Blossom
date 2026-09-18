import React from 'react';
import { ArrowDown, Sparkles, Clock, Coffee, ShieldCheck, Award } from 'lucide-react';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onOpenOrder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreMenu, onOpenOrder }) => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] pt-8 pb-16 md:pt-14 md:pb-24 border-b border-[#EDE6DC]">
      {/* Subtle organic background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#EFE7DC] rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />
      <div className="absolute -bottom-20 left-10 w-80 h-80 bg-[#E8F0E8] rounded-full blur-3xl opacity-50 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Elegant Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2ECE2] border border-[#E0D5C7] text-[#4D5E4D] text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#4D5E4D]" />
              <span>Direct-Trade Roastery & Botanical Patisserie</span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#2C221B] leading-[1.14] sm:leading-[1.12]">
              Where artisanal roast blooms with botanical grace.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-lg text-[#5A483D] font-normal leading-relaxed max-w-2xl">
              Hand-pulled espresso, velvety cold foams infused with wild lavender and Damask rose, and seventy-two layer viennoiserie baked fresh before sunrise. A tranquil sanctuary for mindful sips.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                id="hero-explore-menu-btn"
                onClick={onExploreMenu}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#2C221B] hover:bg-[#43352A] text-[#FAF7F2] text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
              >
                <span>Explore Curated Menu</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                id="hero-order-online-btn"
                onClick={onOpenOrder}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#FFFFFF] hover:bg-[#F6EFE6] text-[#2C221B] border border-[#D9CEC3] text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center cursor-pointer focus:outline-none"
              >
                Order Online (Pickup & COD)
              </button>
            </div>

            {/* Key Value Pillars */}
            <div className="pt-5 sm:pt-6 grid grid-cols-3 gap-2 sm:gap-4 border-t border-[#EAE1D5] max-w-xl">
              <div>
                <span className="block font-serif text-lg sm:text-2xl font-semibold text-[#2C221B]">100%</span>
                <span className="text-[10px] sm:text-xs text-[#735F52] leading-tight block mt-0.5">Direct-trade beans</span>
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-2xl font-semibold text-[#2C221B]">5:30 AM</span>
                <span className="text-[10px] sm:text-xs text-[#735F52] leading-tight block mt-0.5">Daily sunrise bake</span>
              </div>
              <div>
                <span className="block font-serif text-lg sm:text-2xl font-semibold text-[#2C221B]">Zero</span>
                <span className="text-[10px] sm:text-xs text-[#735F52] leading-tight block mt-0.5">Artificial extracts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Premium Cafe Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative framing */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E5DACD] bg-white p-2.5">
                <div className="relative h-80 sm:h-96 w-full rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85"
                    alt="Brew & Blossom cafe counter with artisan ceramic cups and botanical plants"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  {/* Subtle gradient overlay for legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Bottom banner inside image */}
                  <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-lg p-3 text-[#2C221B] shadow-sm flex items-center justify-between border border-white/40">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#EBF0EA] flex items-center justify-center text-[#4D5E4D]">
                        <Coffee className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold">Today&apos;s Feature Roast</p>
                        <p className="text-[11px] text-[#735F52]">Ethiopia Yirgacheffe • Floral & Bergamot</p>
                      </div>
                    </div>
                    <span className="text-xs font-serif font-medium bg-[#FAF7F2] px-2.5 py-1 rounded border border-[#E0D5C7]">
                      Batch 04
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating review card */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-sm border border-[#E8DFD5] rounded-xl p-3 shadow-md hidden sm:flex items-center gap-3 max-w-[210px]">
                <div className="w-9 h-9 rounded-full bg-[#FAF5EE] border border-[#E3D6C8] flex items-center justify-center text-[#A68A78]">
                  <Award className="w-4 h-4 text-[#4D5E4D]" />
                </div>
                <div>
                  <div className="flex text-amber-500 text-xs">★★★★★</div>
                  <p className="text-[11px] text-[#2C221B] font-medium leading-tight mt-0.5">
                    &ldquo;Best botanical coffee in the city.&rdquo;
                  </p>
                </div>
              </div>

              {/* Floating pickup pill */}
              <div className="absolute -bottom-3 -right-3 sm:-right-5 bg-[#2C221B] text-[#FAF7F2] rounded-full px-4 py-2 text-xs font-medium shadow-md flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#E8DFD5]" />
                <span>Quick Pickup in ~15 mins</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
