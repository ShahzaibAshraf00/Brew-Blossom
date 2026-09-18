import React, { useState, useEffect } from 'react';
import { ShoppingBag, Coffee, Menu, X, Clock, MapPin, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onNavigateHome: () => void;
  onSelectMenu: () => void;
  currentView: 'home' | 'detail';
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onNavigateHome,
  onSelectMenu,
  currentView
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bagAnimated, setBagAnimated] = useState(false);

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  // Trigger bounce whenever cart items count increases
  useEffect(() => {
    if (totalItemsCount > 0) {
      setBagAnimated(true);
      const timer = setTimeout(() => setBagAnimated(false), 700);
      return () => clearTimeout(timer);
    }
  }, [totalItemsCount]);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b-2 border-[#D8C9B9] shadow-[0_4px_25px_rgba(44,34,27,0.08)] transition-all duration-300">
      {/* Top micro-banner in deep espresso */}
      <div className="bg-[#221A15] text-[#FAF7F2] text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 text-center font-normal tracking-wide flex items-center justify-center gap-2 border-b border-[#362A22]">
        <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E8DFD5] shrink-0" />
        <span className="truncate">Spring Botanical Release: Fresh Damask Rose & Uji Matcha now brewing daily</span>
        <span className="hidden lg:inline text-[#A68A78]">|</span>
        <span className="hidden lg:inline">Open 7:00 AM – 7:00 PM • Cash on Delivery & Cards Accepted</span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo - Strictly non-clickable static element as requested */}
          <div
            id="brand-logo"
            className="flex items-center gap-2.5 sm:gap-3 text-left select-none cursor-default py-1"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#F4EDE4] border border-[#D9CEC3] shadow-xs flex items-center justify-center text-[#2C221B] shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#4D5E4D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 4.5 3 8.3 7.2 9.5-.2-.8-.2-1.6 0-2.4 1.2-4.8 5.6-7.1 9.8-5.1.5-.7 1-1.4 1.4-2.2-1.5.3-3 .2-4.4-.3C14.7 11 14 9.6 14 8c0-3.3-2-6-2-6z" />
                <circle cx="12" cy="12" r="2.5" />
                <path d="M17 14c2.5 0 4.5-2 4.5-4.5S19.5 5 17 5" />
              </svg>
            </div>
            <div>
              <span className="font-serif text-lg sm:text-2xl tracking-tight text-[#2C221B] font-semibold block leading-none">
                Brew & Blossom
              </span>
              <span className="block text-[9px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#8C7667] font-medium mt-0.5 sm:mt-1">
                Coffee & Patisserie
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links - Distinct POP-UP interactive button animations */}
          <nav className="hidden md:flex items-center gap-2.5 lg:gap-3 text-sm font-medium text-[#4A3B32]">
            <button
              id="nav-menu-btn"
              type="button"
              onClick={() => {
                if (currentView !== 'home') onNavigateHome();
                onSelectMenu();
              }}
              className="group px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-[#3E3127] bg-[#F7F2EC] border border-[#DDD2C4] shadow-xs hover:shadow-md hover:bg-[#2C221B] hover:text-[#FAF7F2] hover:border-[#2C221B] transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none flex items-center gap-1.5"
            >
              <span>Curated Menu</span>
            </button>
            <button
              id="nav-story-btn"
              type="button"
              onClick={() => handleNavClick('story')}
              className="group px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-[#3E3127] bg-[#F7F2EC] border border-[#DDD2C4] shadow-xs hover:shadow-md hover:bg-[#2C221B] hover:text-[#FAF7F2] hover:border-[#2C221B] transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none flex items-center gap-1.5"
            >
              <span>Our Ethos</span>
            </button>
            <button
              id="nav-ambience-btn"
              type="button"
              onClick={() => handleNavClick('ambience')}
              className="group px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-[#3E3127] bg-[#F7F2EC] border border-[#DDD2C4] shadow-xs hover:shadow-md hover:bg-[#2C221B] hover:text-[#FAF7F2] hover:border-[#2C221B] transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none flex items-center gap-1.5"
            >
              <span>The Greenhouse</span>
            </button>
            <button
              id="nav-visit-btn"
              type="button"
              onClick={() => handleNavClick('visit')}
              className="group px-4 py-2 rounded-full text-xs font-semibold tracking-wide text-[#3E3127] bg-[#F7F2EC] border border-[#DDD2C4] shadow-xs hover:shadow-md hover:bg-[#2C221B] hover:text-[#FAF7F2] hover:border-[#2C221B] transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none flex items-center gap-1.5"
            >
              <span>Hours & Location</span>
            </button>
          </nav>

          {/* Right Action: Online Order Pill & Cart */}
          <div className="flex items-center gap-3">
            {currentView === 'detail' && (
              <button
                type="button"
                onClick={onNavigateHome}
                className="hidden lg:inline-flex items-center gap-1 text-xs font-semibold text-[#5A483D] hover:text-[#2C221B] px-3 py-1.5 rounded-full hover:bg-[#F3EDE3] transition-colors"
              >
                <span>Back to Home</span>
              </button>
            )}

            <button
              id="nav-order-online-btn"
              type="button"
              onClick={() => {
                if (currentView !== 'home') onNavigateHome();
                onSelectMenu();
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#4D5E4D] bg-[#EBF0EA] hover:bg-[#4D5E4D] hover:text-[#FAF7F2] rounded-full border border-[#C5D8C3] shadow-xs transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#4D5E4D] group-hover:bg-white animate-pulse"></span>
              <span>Order Online</span>
            </button>

            {/* Cart Button */}
            <button
              id="nav-cart-btn"
              type="button"
              onClick={onOpenCart}
              className={`relative flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#2C221B] text-[#FAF7F2] hover:bg-[#43352A] shadow-sm hover:shadow-md transform hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer focus:outline-none ${
                bagAnimated ? 'ring-4 ring-[#4D5E4D]/40 scale-110' : ''
              }`}
              aria-label="View shopping bag"
            >
              <ShoppingBag className={`w-4 h-4 text-[#E8DFD5] ${bagAnimated ? 'animate-bounce' : ''}`} />
              <span className="text-xs font-semibold tracking-wide">
                {totalItemsCount > 0 ? (
                  <>
                    Bag <span className="text-[#D9CEC3]">(${cartSubtotal.toFixed(2)})</span>
                  </>
                ) : (
                  'Bag'
                )}
              </span>
              {totalItemsCount > 0 ? (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-bold text-[#2C221B] bg-[#FAF7F2] rounded-full">
                  {totalItemsCount}
                </span>
              ) : (
                <span className="text-[10px] text-[#A68A78] hidden sm:inline">
                  (0)
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#2C221B] hover:bg-[#F3EDE3] transition-colors"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DFD5] bg-[#FAF7F2] px-5 pt-4 pb-6 space-y-3 shadow-md animate-in fade-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => {
              if (currentView !== 'home') onNavigateHome();
              onSelectMenu();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2.5 text-base font-serif font-medium text-[#2C221B] border-b border-[#F0E8DD]"
          >
            Curated Menu (6 Signature Items)
          </button>
          <button
            onClick={() => handleNavClick('story')}
            className="w-full text-left py-2.5 text-base font-serif font-medium text-[#2C221B] border-b border-[#F0E8DD]"
          >
            Our Story & Roasting Ethos
          </button>
          <button
            onClick={() => handleNavClick('ambience')}
            className="w-full text-left py-2.5 text-base font-serif font-medium text-[#2C221B] border-b border-[#F0E8DD]"
          >
            The Greenhouse Ambience
          </button>
          <button
            onClick={() => handleNavClick('visit')}
            className="w-full text-left py-2.5 text-base font-serif font-medium text-[#2C221B] border-b border-[#F0E8DD]"
          >
            Hours & Location
          </button>

          <div className="pt-2 flex items-center justify-between text-xs text-[#735F52]">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#4D5E4D]" />
              <span>Today: 7:00 AM – 7:00 PM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#4D5E4D]" />
              <span>412 Blossom Way, Downtown</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
