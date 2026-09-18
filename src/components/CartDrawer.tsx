import React, { useState, useEffect, useRef } from 'react';
import { CartItem, OrderSummary } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, RotateCcw, Clock } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  orderType: 'pickup' | 'delivery';
  setOrderType: (type: 'pickup' | 'delivery') => void;
  pastOrders?: OrderSummary[];
  onReorder?: (items: CartItem[]) => void;
  onViewOrderDetails?: (order: OrderSummary) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  orderType,
  setOrderType,
  pastOrders = [],
  onReorder,
  onViewOrderDetails,
}) => {
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  const drawerContainerRef = useRef<HTMLDivElement>(null);
  const currentListRef = useRef<HTMLDivElement>(null);
  const historyListRef = useRef<HTMLDivElement>(null);

  // Prevent background page from scrolling when order bag drawer is open
  // and redirect any wheel events within the drawer to smoothly scroll the active items list
  useEffect(() => {
    if (!isOpen) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const drawerEl = drawerContainerRef.current;
    if (!drawerEl) return;

    const handleNativeWheel = (e: WheelEvent) => {
      e.stopPropagation();
      const activeTarget = activeTab === 'current' ? currentListRef.current : historyListRef.current;
      if (activeTarget) {
        activeTarget.scrollTop += e.deltaY;
      }
      e.preventDefault();
    };

    drawerEl.addEventListener('wheel', handleNativeWheel, { passive: false });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      drawerEl.removeEventListener('wheel', handleNativeWheel);
    };
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const deliveryFee = orderType === 'delivery' ? 3.50 : 0.00;
  const tax = subtotal * 0.0825; // standard ~8.25% sales tax
  const total = subtotal + deliveryFee + tax;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden overscroll-contain"
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        onWheel={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div
          ref={drawerContainerRef}
          className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E5DACD] shadow-2xl flex flex-col h-full max-h-screen overscroll-contain touch-pan-y"
        >
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-6 border-b border-[#E8DFD5] flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FAF6F0] border border-[#DDD2C4] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#4D5E4D]" />
              </div>
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#2C221B] leading-none">
                  Your Order Bag
                </h2>
                <span className="text-[11px] text-[#8C7667]">
                  {cartItems.length} item{cartItems.length === 1 ? '' : 's'} in bag
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#F3EDE3] text-[#735F52] hover:text-[#2C221B] transition-colors focus:outline-none cursor-pointer"
              aria-label="Close bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Switcher: Current Bag vs Recent Orders */}
          {pastOrders.length > 0 && (
            <div className="flex border-b border-[#E5DACD] bg-[#F4EDE3] px-4 sm:px-6 pt-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('current')}
                className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'current'
                    ? 'border-[#2C221B] text-[#2C221B]'
                    : 'border-transparent text-[#735F52] hover:text-[#2C221B]'
                }`}
              >
                Current Bag ({cartItems.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'history'
                    ? 'border-[#2C221B] text-[#2C221B]'
                    : 'border-transparent text-[#735F52] hover:text-[#2C221B]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Placed Orders ({pastOrders.length})</span>
              </button>
            </div>
          )}

          {activeTab === 'current' && (
            <>
              {/* Order Type Selector: Pickup vs Delivery */}
              <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#F4EDE3] border-b border-[#E5DACD] shrink-0">
                <div className="grid grid-cols-2 gap-2 bg-white/70 p-1 rounded-xl border border-[#D9CEC3]">
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      orderType === 'pickup'
                        ? 'bg-[#2C221B] text-[#FAF7F2] shadow-xs'
                        : 'text-[#5A483D] hover:text-[#2C221B]'
                    }`}
                  >
                    In-Store Pickup (Free)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      orderType === 'delivery'
                        ? 'bg-[#2C221B] text-[#FAF7F2] shadow-xs'
                        : 'text-[#5A483D] hover:text-[#2C221B]'
                    }`}
                  >
                    Local Courier ($3.50)
                  </button>
                </div>
              </div>

              {/* Cart Item List - Scrollable with Ref and overscroll containment */}
              <div
                ref={currentListRef}
                className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4"
              >
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-12">
                    <div className="w-14 h-14 rounded-full bg-[#F2EBE1] flex items-center justify-center text-[#9B7E6B]">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-[#2C221B]">
                      Your bag is empty
                    </h3>
                    <p className="text-xs text-[#735F52] max-w-xs">
                      Discover our 6 signature roasts and handcrafted botanical pastries to start your order.
                    </p>

                    {pastOrders.length > 0 && (
                      <div className="w-full mt-4 p-4 rounded-xl bg-white border border-[#E0D5C7] text-left">
                        <div className="flex items-center gap-2 text-xs font-semibold text-[#4D5E4D] mb-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Recent Order Confirmed</span>
                        </div>
                        <p className="text-xs text-[#2C221B]">
                          Order #{pastOrders[0].orderId} • {pastOrders[0].items.length} drink(s) ordered
                        </p>
                        <p className="text-[11px] text-[#735F52] mt-0.5">
                          Payment: {pastOrders[0].paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Card Paid Online'}
                        </p>
                        <button
                          type="button"
                          onClick={() => setActiveTab('history')}
                          className="mt-2 text-xs text-[#2C221B] font-semibold underline underline-offset-2 hover:text-[#4D5E4D]"
                        >
                          View Placed Orders & Receipts →
                        </button>
                      </div>
                    )}

                    <button
                      onClick={onClose}
                      className="mt-2 px-5 py-2 rounded-full bg-[#2C221B] text-[#FAF7F2] text-xs font-semibold tracking-wide hover:bg-[#43352A] cursor-pointer"
                    >
                      Explore Menu & Add Drinks
                    </button>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-4 border border-[#E8DFD5] shadow-xs space-y-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-16 h-16 rounded-lg object-cover bg-[#F3EDE3] shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-1">
                            <h4 className="font-serif text-base font-semibold text-[#2C221B] truncate">
                              {item.menuItem.name}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.id)}
                              className="text-[#9E8B7E] hover:text-red-600 transition-colors p-1 cursor-pointer"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <p className="text-xs font-semibold text-[#2C221B] mt-0.5">
                            ${item.totalPrice.toFixed(2)}
                          </p>

                          {/* Customization specifics */}
                          <div className="mt-1 text-[11px] text-[#735F52] space-y-0.5">
                            {item.customization.temperature && (
                              <span>{item.customization.temperature} • </span>
                            )}
                            {item.customization.milk && (
                              <span>{item.customization.milk.split('(')[0]} • </span>
                            )}
                            {item.customization.sweetness && (
                              <span>{item.customization.sweetness.split('(')[0]}</span>
                            )}
                            {item.customization.pastryServing && (
                              <span>Serving: {item.customization.pastryServing}</span>
                            )}
                            {item.customization.selectedAdditions.length > 0 && (
                              <div className="text-[10px] text-[#4D5E4D]">
                                + {item.customization.selectedAdditions.join(', ')}
                              </div>
                            )}
                            {item.customization.specialInstructions && (
                              <div className="text-[10px] italic text-[#8C7667]">
                                Note: {item.customization.specialInstructions}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quantity adjustment footer */}
                      <div className="pt-2 border-t border-[#F4ECE3] flex items-center justify-between">
                        <span className="text-[11px] text-[#8C7667]">
                          ${item.unitPrice.toFixed(2)} each
                        </span>

                        <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#D9CEC3] rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-[#2C221B] hover:bg-[#EDE5DA] transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-semibold text-[#2C221B] min-w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded flex items-center justify-center text-[#2C221B] hover:bg-[#EDE5DA] transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer: Pricing & Checkout Button */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-white border-t border-[#E8DFD5] space-y-3">
                  <div className="space-y-1.5 text-xs text-[#5A483D]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-medium text-[#2C221B]">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        {orderType === 'pickup' ? 'Store Pickup' : 'Courier Delivery'}
                      </span>
                      <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Sales Tax (8.25%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 border-t border-[#F0E8DD] flex justify-between text-base font-serif font-semibold text-[#2C221B]">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    id="cart-checkout-btn"
                    type="button"
                    onClick={onProceedToCheckout}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#2C221B] hover:bg-[#43352A] text-[#FAF7F2] text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                  >
                    <span>Proceed to Order & Pay</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-[#735F52]">
                    Accepts Cash on Delivery (COD) & Online Payment
                  </p>
                </div>
              )}
            </>
          )}

          {/* Placed Orders Tab */}
          {activeTab === 'history' && (
            <div
              ref={historyListRef}
              className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4"
            >
              <div className="text-xs text-[#735F52] flex items-center justify-between pb-2 border-b border-[#EAE1D5]">
                <span>Orders Placed on This Device</span>
                <span className="font-semibold text-[#2C221B]">{pastOrders.length} Order{pastOrders.length > 1 ? 's' : ''}</span>
              </div>

              {pastOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="bg-white rounded-xl p-4 border border-[#E2D6C8] shadow-2xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold text-[#2C221B]">
                        #{order.orderId}
                      </span>
                      <span className="block text-[11px] text-[#8C7667]">
                        {order.createdAt}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#EBF0EA] text-[#4D5E4D]">
                      {order.status}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#F2ECE2] space-y-1.5">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-xs text-[#4A3B32]">
                        <span>{it.quantity}x {it.menuItem.name}</span>
                        <span className="font-medium">${it.totalPrice.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#F2ECE2] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[11px] text-[#8C7667] block">
                        {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online'}
                      </span>
                      <span className="font-serif font-bold text-[#2C221B]">
                        Total: ${order.total.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {onReorder && (
                        <button
                          type="button"
                          onClick={() => {
                            onReorder(order.items);
                            setActiveTab('current');
                          }}
                          className="px-3 py-1 rounded-lg bg-[#2C221B] text-[#FAF7F2] text-[11px] font-semibold hover:bg-[#43352A] flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Re-order</span>
                        </button>
                      )}
                      {onViewOrderDetails && (
                        <button
                          type="button"
                          onClick={() => onViewOrderDetails(order)}
                          className="text-[11px] text-[#5A483D] underline hover:text-[#2C221B] cursor-pointer"
                        >
                          Receipt
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
