import React, { useState, useEffect } from 'react';
import { CartItem, OrderSummary, OrderCustomerInfo } from '../types';
import { X, CreditCard, Banknote, ShieldCheck, CheckCircle2, Lock, Sparkles, MapPin, User, Mail, Phone, Clock, AlertCircle } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderType: 'pickup' | 'delivery';
  onOrderSuccess: (order: OrderSummary) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  orderType,
  onOrderSuccess
}) => {
  // Prevent background page from scrolling when checkout modal is open
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isOpen]);

  // Form states - empty by default so user can immediately type their details without removing pre-filled text
  const [customer, setCustomer] = useState<OrderCustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('card');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardHolder, setCardHolder] = useState<string>('');
  const [cardExpiry, setCardExpiry] = useState<string>('');
  const [cardCvv, setCardCvv] = useState<string>('');

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Financial calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const deliveryFee = orderType === 'delivery' ? 3.50 : 0.00;
  const tax = subtotal * 0.0825;
  const total = subtotal + deliveryFee + tax;

  const handleFillTestCard = () => {
    setCardNumber('4000 1234 5678 9010');
    setCardHolder(customer.name.trim() ? customer.name.toUpperCase() : 'COFFEE LOVER');
    setCardExpiry('06/29');
    setCardCvv('312');
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Basic customer validation
    if (!customer.name.trim()) {
      setValidationError('Please enter your full name for the cafe order.');
      return;
    }
    if (!customer.phone.trim()) {
      setValidationError('Please enter your contact phone number.');
      return;
    }
    if (orderType === 'delivery' && !customer.address?.trim()) {
      setValidationError('Please provide a delivery address.');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || !cardExpiry.trim() || !cardCvv.trim()) {
        setValidationError('Please complete the card details or select Cash on Delivery.');
        return;
      }
    }

    // Realistic seamless order processing simulation (no database or external API errors)
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const randomOrderNum = Math.floor(10000 + Math.random() * 90000);
      const currentTime = new Date();
      const readyMinutes = orderType === 'pickup' ? 15 : 35;
      const readyTime = new Date(currentTime.getTime() + readyMinutes * 60000);

      const newOrder: OrderSummary = {
        orderId: `BB-${randomOrderNum}`,
        items: [...cartItems],
        subtotal,
        tax,
        deliveryFee,
        total,
        orderType,
        paymentMethod,
        customer,
        cardLast4: paymentMethod === 'card' ? cardNumber.slice(-4).replace(/\s+/g, '') || '4242' : undefined,
        status: 'Received',
        createdAt: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedTime: readyTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      onOrderSuccess(newOrder);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 md:p-6 overscroll-contain"
      onWheel={(e) => e.stopPropagation()}
    >
      <div className="bg-[#FAF7F2] w-full max-w-lg max-h-[94vh] sm:max-h-[88vh] rounded-2xl border border-[#E5DACD] shadow-2xl flex flex-col overflow-hidden my-auto overscroll-contain">
        
        {/* Header - Fixed & Compact */}
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-white border-b border-[#E8DFD5] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#EBF0EA] flex items-center justify-center text-[#4D5E4D]">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-semibold text-[#2C221B] leading-tight">
                Online Cafe Checkout
              </h2>
              <p className="text-[11px] text-[#735F52]">
                Brew & Blossom • {orderType === 'pickup' ? 'In-Cafe Pickup' : 'Courier Delivery'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F3EDE3] text-[#735F52] hover:text-[#2C221B] transition-colors cursor-pointer focus:outline-none"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form id="checkout-order-form" onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 overscroll-contain">
          
          {/* Order Snapshot capsule */}
          <div className="bg-[#F4EDE3] px-3.5 py-2.5 rounded-xl border border-[#E0D5C7] flex items-center justify-between text-xs text-[#2C221B]">
            <div>
              <span className="font-semibold block font-serif text-xs sm:text-sm">
                {cartItems.length} item{cartItems.length > 1 ? 's' : ''} in order
              </span>
              <span className="text-[11px] text-[#6B5749]">
                {orderType === 'pickup' ? 'Ready in ~15m at counter' : 'Dispatched via courier in ~35m'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider text-[#8C7667] block">Order Total</span>
              <span className="font-serif text-base font-bold text-[#2C221B]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Validation Error Alert */}
          {validationError && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Step 1: Contact Details */}
          <div className="space-y-2.5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#2C221B] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#4D5E4D]" />
              <span>1. Contact & Delivery Info</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] font-semibold text-[#5A483D] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customer.name}
                  onChange={e => setCustomer({ ...customer, name: e.target.value })}
                  placeholder="Enter your full name"
                  className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-[#D9CEC3] focus:border-[#2C221B] outline-none text-[#2C221B]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#5A483D] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={e => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="e.g. (555) 000-0000"
                  className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-[#D9CEC3] focus:border-[#2C221B] outline-none text-[#2C221B]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-semibold text-[#5A483D] mb-1">
                  Email Receipt Address *
                </label>
                <input
                  type="email"
                  required
                  value={customer.email}
                  onChange={e => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="e.g. name@domain.com"
                  className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-[#D9CEC3] focus:border-[#2C221B] outline-none text-[#2C221B]"
                />
              </div>

              {orderType === 'delivery' && (
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-[10px] font-semibold text-[#5A483D]">
                    Delivery Street Address & Unit *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={e => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="e.g. 452 Post Street, Apt 3B"
                    className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-[#D9CEC3] focus:border-[#2C221B] outline-none text-[#2C221B]"
                  />
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-semibold text-[#5A483D] mb-1">
                  Special Notes (optional)
                </label>
                <input
                  type="text"
                  value={customer.notes}
                  onChange={e => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="e.g. Extra napkins, leave with reception desk"
                  className="w-full px-3 py-1.5 text-xs bg-white rounded-lg border border-[#D9CEC3] focus:border-[#2C221B] outline-none text-[#2C221B]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Payment Method Options (Compact & Sleek) */}
          <div className="space-y-2.5 pt-2 border-t border-[#EAE1D5]">
            <div className="flex items-center justify-between">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#2C221B] flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#4D5E4D]" />
                <span>2. Payment Method</span>
              </h3>
              <span className="text-[10px] text-[#4D5E4D] font-medium bg-[#EBF0EA] px-2 py-0.5 rounded">
                Zero Error Demo Checkout
              </span>
            </div>

            {/* Compact Segmented Control (takes ~40px instead of 180px!) */}
            <div className="grid grid-cols-2 gap-1.5 bg-[#EDE4D8] p-1 rounded-xl border border-[#D9CEC3]">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-white text-[#2C221B] shadow-xs'
                    : 'text-[#6B5749] hover:text-[#2C221B]'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-[#4D5E4D]" />
                <span>Online Card Payment</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'bg-white text-[#2C221B] shadow-xs'
                    : 'text-[#6B5749] hover:text-[#2C221B]'
                }`}
              >
                <Banknote className="w-3.5 h-3.5 text-[#4D5E4D]" />
                <span>Cash on Delivery (COD)</span>
              </button>
            </div>

            {/* Compact Card Form */}
            {paymentMethod === 'card' && (
              <div className="bg-white p-3.5 rounded-xl border border-[#E0D5C7] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[#2C221B]">
                    Card Details
                  </span>
                  <button
                    type="button"
                    onClick={handleFillTestCard}
                    className="text-[10px] text-[#4D5E4D] hover:text-[#2C221B] font-semibold underline underline-offset-2 cursor-pointer"
                  >
                    Demo: Fill sample card
                  </button>
                </div>

                <div>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      placeholder="16-digit card number"
                      className="w-full pl-3 pr-8 py-1.5 text-xs bg-[#FAF7F2] rounded-lg border border-[#D9CEC3] focus:border-[#2C221B] outline-none text-[#2C221B] font-mono"
                    />
                    <Lock className="w-3 h-3 text-[#9E8B7E] absolute right-2.5 top-2.5" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="col-span-3 sm:col-span-1">
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={e => setCardHolder(e.target.value.toUpperCase())}
                      placeholder="NAME ON CARD"
                      className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] rounded-lg border border-[#D9CEC3] focus:border-[#2C221B] outline-none text-[#2C221B]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={e => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] rounded-lg border border-[#D9CEC3] focus:border-[#2C221B] outline-none text-[#2C221B] font-mono text-center"
                    />
                  </div>
                  <div>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={e => setCardCvv(e.target.value)}
                      placeholder="CVV"
                      className="w-full px-2.5 py-1.5 text-xs bg-[#FAF7F2] rounded-lg border border-[#D9CEC3] focus:border-[#2C221B] outline-none text-[#2C221B] font-mono text-center"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#735F52] pt-0.5">
                  <span className="flex items-center gap-1 text-[#4D5E4D]">
                    <ShieldCheck className="w-3 h-3" />
                    Encrypted Demo Gateway
                  </span>
                  <span>Instant Authorization</span>
                </div>
              </div>
            )}

            {/* Cash on Delivery Notice (Compact 1-line badge) */}
            {paymentMethod === 'cod' && (
              <div className="bg-[#EBF0EA] px-3 py-2 rounded-xl border border-[#4D5E4D]/25 text-xs text-[#2C221B] flex items-center gap-2">
                <Banknote className="w-4 h-4 text-[#4D5E4D] shrink-0" />
                <span className="text-[11px] text-[#344834]">
                  <strong>Cash on Delivery:</strong> Pay cash or swipe card with our staff upon {orderType === 'pickup' ? 'cafe pickup' : 'courier delivery'}.
                </span>
              </div>
            )}
          </div>

        </form>

        {/* Sticky Modal Footer: Guaranteed visible on ANY screen height without zooming out! */}
        <div className="px-4 py-3 sm:px-5 sm:py-3.5 bg-white border-t border-[#E8DFD5] shrink-0 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.03)]">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#8C7667] block">
              Total ({cartItems.length} items)
            </span>
            <span className="font-serif text-lg font-bold text-[#2C221B] leading-none">
              ${total.toFixed(2)}
            </span>
          </div>

          <button
            type="submit"
            form="checkout-order-form"
            disabled={isProcessing}
            className="py-2.5 px-6 rounded-xl bg-[#2C221B] hover:bg-[#43352A] disabled:bg-[#8C7667] text-[#FAF7F2] text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
          >
            {isProcessing ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Placing Order...</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-[#E8DFD5]" />
                <span>
                  {paymentMethod === 'card'
                    ? `Pay $${total.toFixed(2)}`
                    : `Confirm COD Order ($${total.toFixed(2)})`}
                </span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
