import React, { useState, useEffect } from 'react';
import { MENU_ITEMS } from './data/menu';
import { MenuItem, CartItem, CartCustomization, OrderSummary } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { ProductDetailPage } from './components/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { CafeStorySection } from './components/CafeStorySection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'detail'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('brew_blossom_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderSummary | null>(null);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [quickToast, setQuickToast] = useState<string | null>(null);

  // Persist past placed orders so user can always see them
  const [pastOrders, setPastOrders] = useState<OrderSummary[]>(() => {
    try {
      const saved = localStorage.getItem('brew_blossom_past_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('brew_blossom_cart', JSON.stringify(cartItems));
    } catch {
      // Storage unavailable or disabled
    }
  }, [cartItems]);

  // Persist past orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('brew_blossom_past_orders', JSON.stringify(pastOrders));
    } catch {
      // Storage unavailable
    }
  }, [pastOrders]);

  const showToast = (message: string) => {
    setQuickToast(message);
    setTimeout(() => {
      setQuickToast(null);
    }, 3000);
  };

  // Navigation handlers
  const handleSelectItem = (item: MenuItem) => {
    setSelectedItem(item);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMenuFromNav = () => {
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById('menu');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  // Cart operations
  const handleAddToCart = (
    item: MenuItem,
    customization: CartCustomization,
    quantity: number,
    unitPrice: number
  ) => {
    const newItem: CartItem = {
      id: `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      menuItem: item,
      quantity,
      customization,
      unitPrice,
      totalPrice: unitPrice * quantity
    };

    setCartItems(prev => [...prev, newItem]);
    setIsCartOpen(true);
    showToast(`Added ${quantity}x "${item.name}" to your order bag.`);
  };

  // Re-order past order items
  const handleReorder = (items: CartItem[]) => {
    const regenerated = items.map(it => ({
      ...it,
      id: `${it.menuItem.id}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`
    }));
    setCartItems(prev => [...prev, ...regenerated]);
    setIsCartOpen(true);
    showToast(`Added ${items.length} item(s) back into your bag!`);
  };

  // Quick Add directly from Menu grid cards
  const handleQuickAdd = (item: MenuItem) => {
    const defaultCustomization: CartCustomization = {
      temperature: item.options.type === 'beverage' ? item.options.temperatures?.[0] || 'Hot' : undefined,
      milk: item.options.type === 'beverage' ? item.options.milks?.[0] : undefined,
      sweetness: item.options.type === 'beverage' ? item.options.sweetness?.[0] : undefined,
      selectedAdditions: [],
      pastryServing: item.options.type === 'pastry' ? item.options.pastryServings?.[0] : undefined
    };

    handleAddToCart(item, defaultCustomization, 1, item.price);
    setIsCartOpen(true);
  };

  // Instant Checkout from Product Detail
  const handleInstantCheckout = (
    item: MenuItem,
    customization: CartCustomization,
    quantity: number,
    unitPrice: number
  ) => {
    const newItem: CartItem = {
      id: `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      menuItem: item,
      quantity,
      customization,
      unitPrice,
      totalPrice: unitPrice * quantity
    };

    setCartItems(prev => [...prev, newItem]);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === cartItemId
          ? {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty
            }
          : item
      )
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: OrderSummary) => {
    setIsCheckoutOpen(false);
    setCartItems([]);
    setPastOrders(prev => [order, ...prev]);
    setOrderConfirmation(order);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C221B] flex flex-col font-sans selection:bg-[#E8DFD5] selection:text-[#2C221B]">
      
      {/* Toast Notification */}
      {quickToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2C221B] text-[#FAF7F2] px-5 py-3 rounded-xl shadow-xl text-xs font-medium border border-[#43352A] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <span className="w-2 h-2 rounded-full bg-[#4D5E4D] animate-pulse"></span>
          <span>{quickToast}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="underline underline-offset-2 text-[#D9CEC3] hover:text-white font-semibold ml-1"
          >
            View Bag
          </button>
        </div>
      )}

      {/* Primary Sticky Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateHome={handleNavigateHome}
        onSelectMenu={handleSelectMenuFromNav}
        currentView={currentView}
      />

      {/* Main View Router: Home (Hero, Menu, Story) or Product Detail Page */}
      {currentView === 'home' ? (
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection
            onExploreMenu={() => {
              const el = document.getElementById('menu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onOpenOrder={() => {
              const el = document.getElementById('menu');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 6 Curated Items Section */}
          <MenuSection
            items={MENU_ITEMS}
            onSelectItem={handleSelectItem}
            onQuickAdd={handleQuickAdd}
          />

          {/* Ambience, Story & Visit Hours */}
          <CafeStorySection />
        </main>
      ) : (
        selectedItem && (
          <ProductDetailPage
            item={selectedItem}
            onBack={handleNavigateHome}
            cartItems={cartItems}
            onOpenCart={() => setIsCartOpen(true)}
            onAddToCart={(customization, quantity, unitPrice) =>
              handleAddToCart(selectedItem, customization, quantity, unitPrice)
            }
            onInstantCheckout={(customization, quantity, unitPrice) =>
              handleInstantCheckout(selectedItem, customization, quantity, unitPrice)
            }
          />
        )
      )}

      {/* Footer with social media links & cafe details */}
      <Footer
        onNavigateHome={handleNavigateHome}
        onSelectMenu={handleSelectMenuFromNav}
      />

      {/* Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
        orderType={orderType}
        setOrderType={setOrderType}
        pastOrders={pastOrders}
        onReorder={handleReorder}
        onViewOrderDetails={(order) => setOrderConfirmation(order)}
      />

      {/* Checkout Modal (COD + Online Payment with Zero Error simulation) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        orderType={orderType}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Confirmation Screen with Order ID & Status Tracker */}
      {orderConfirmation && (
        <OrderConfirmationModal
          order={orderConfirmation}
          onClose={() => setOrderConfirmation(null)}
        />
      )}

    </div>
  );
}
