import React, { useState } from 'react';
import { MenuItem } from '../types';
import { Plus, ArrowRight, Star, Sparkles, Coffee } from 'lucide-react';

interface MenuSectionProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Botanical Latte', 'Specialty Coffee', 'Artisan Patisserie'];

  const filteredItems = selectedCategory === 'All'
    ? items
    : items.filter(i => i.category === selectedCategory);

  return (
    <section id="menu" className="py-12 sm:py-20 bg-[#FAF7F2] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF0EA] text-[#4D5E4D] text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Daily Menu</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C221B] tracking-tight">
            Our 6 Signature Creations
          </h2>
          <p className="text-sm sm:text-base text-[#6B5749] font-normal leading-relaxed">
            Click any creation to explore its flavor profile, customize milk and botanical ratios, and order online with Cash on Delivery or Secure Online Payment.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8 sm:mb-12">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`filter-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all focus:outline-none cursor-pointer ${
                  isSelected
                    ? 'bg-[#2C221B] text-[#FAF7F2] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#5A483D] border border-[#E0D5C7] hover:border-[#2C221B] hover:text-[#2C221B]'
                }`}
              >
                {cat === 'All' ? 'All Creations (6)' : cat}
              </button>
            );
          })}
        </div>

        {/* 6 Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              id={`menu-card-${item.id}`}
              className="group bg-[#FFFFFF] rounded-2xl border border-[#EADFD4] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
              onClick={() => onSelectItem(item)}
            >
              {/* Image Showcase Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-[#F3EDE3]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Badge if available */}
                {item.badge && (
                  <div className="absolute top-3 left-3 bg-[#FAF7F2]/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#2C221B] border border-[#E0D5C7] shadow-2xs">
                    {item.badge}
                  </div>
                )}

                {/* Category pill on top right */}
                <div className="absolute top-3 right-3 bg-[#2C221B]/85 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-medium tracking-wider text-[#FAF7F2] uppercase">
                  {item.category}
                </div>

                {/* Quick Details Hover Hint */}
                <div className="absolute inset-0 bg-[#2C221B]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-[#FAF7F2] text-[#2C221B] text-xs font-semibold px-4 py-2 rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    View Story & Customizations
                  </span>
                </div>
              </div>

              {/* Item Content Info */}
              <div className="p-6 flex flex-col flex-1">
                {/* Rating & Dietary Tag */}
                <div className="flex items-center justify-between text-xs text-[#735F52] mb-2">
                  <div className="flex items-center gap-1 text-amber-600 font-medium">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{item.rating.toFixed(1)}</span>
                    <span className="text-[#8C7667]">({item.reviewsCount})</span>
                  </div>
                  <span className="text-[11px] font-medium text-[#4D5E4D] bg-[#EBF0EA] px-2 py-0.5 rounded">
                    {item.nutrition.dietary.split(',')[0]}
                  </span>
                </div>

                {/* Title & Price Header */}
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#2C221B] group-hover:text-[#4D5E4D] transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <span className="font-serif text-xl font-semibold text-[#2C221B] shrink-0">
                    ${item.price.toFixed(2)}
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-xs text-[#8C7667] font-medium mb-3 italic">
                  {item.subtitle}
                </p>

                {/* Description snippet */}
                <p className="text-xs sm:text-sm text-[#5A483D] leading-relaxed line-clamp-2 mb-4 flex-1">
                  {item.description}
                </p>

                {/* Tasting Notes Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.tastingNotes.slice(0, 3).map((note, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#F5ECE8] text-[#5A483D] font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                {/* Action Row */}
                <div className="pt-4 border-t border-[#F2ECE2] flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectItem(item);
                    }}
                    className="text-xs font-semibold text-[#2C221B] hover:text-[#4D5E4D] inline-flex items-center gap-1.5 py-1.5 focus:outline-none"
                  >
                    <span>Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    id={`quick-order-btn-${item.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onQuickAdd(item);
                    }}
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg bg-[#2C221B] hover:bg-[#43352A] text-[#FAF7F2] text-xs font-semibold tracking-wide transition-colors focus:outline-none shadow-xs"
                    title="Quick add to bag"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Quick Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Menu Notice */}
        <div className="mt-14 p-5 rounded-xl bg-[#F4EDE3] border border-[#E5DACD] max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#4D5E4D] shrink-0 shadow-2xs">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#2C221B]">Custom Roasts & Allergen Inquiries?</p>
              <p className="text-[11px] text-[#6B5749]">Oat, almond, and pistachio milks prepared in dedicated barista pitchers.</p>
            </div>
          </div>
          <span className="text-xs font-serif italic text-[#4D5E4D] font-medium shrink-0">
            Fresh botanicals picked daily
          </span>
        </div>

      </div>
    </section>
  );
};
