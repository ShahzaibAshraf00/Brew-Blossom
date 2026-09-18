import React, { useState, useEffect } from 'react';
import { OrderSummary } from '../types';
import { Check, Clock, MapPin, Receipt, Sparkles, Coffee, ShieldCheck, ArrowRight, X } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: OrderSummary | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ order, onClose }) => {
  // Visual status simulation progress
  const [activeStep, setActiveStep] = useState<number>(1);

  useEffect(() => {
    if (!order) return;
    setActiveStep(1);
    const timer = setTimeout(() => {
      setActiveStep(2);
    }, 4000);
    return () => clearTimeout(timer);
  }, [order?.orderId]);

  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 md:p-6 animate-in fade-in duration-300">
      <div className="bg-[#FAF7F2] w-full max-w-lg max-h-[94vh] sm:max-h-[88vh] rounded-2xl border border-[#E5DACD] shadow-2xl flex flex-col overflow-hidden my-auto">
        
        {/* Top Celebration Banner - Compact */}
        <div className="bg-[#2C221B] text-[#FAF7F2] p-4 sm:p-5 text-center relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 text-[#D9CEC3] hover:text-white p-1 rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-11 h-11 rounded-full bg-[#FAF7F2] text-[#2C221B] flex items-center justify-center mx-auto mb-2 shadow-md">
            <Check className="w-6 h-6 text-[#4D5E4D]" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-[11px] text-[#E8DFD5] mb-1.5 font-mono">
            <Sparkles className="w-3 h-3 text-amber-300" />
            Order #{order.orderId} Confirmed
          </span>

          <h2 className="font-serif text-xl sm:text-2xl font-medium tracking-tight">
            Thank you, {order.customer.name}!
          </h2>
          <p className="text-[11px] text-[#D9CEC3] mt-0.5">
            Our baristas & bakers have received your ticket and begun preparations.
          </p>
        </div>

        {/* Status Tracker */}
        <div className="px-4 py-3 sm:px-5 bg-white border-b border-[#E8DFD5] shrink-0">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[#2C221B] mb-2">
            <span>Preparation Tracker</span>
            <span className="text-[#4D5E4D]">Estimated {order.orderType === 'pickup' ? 'Ready' : 'Arrival'}: {order.estimatedTime}</span>
          </div>

          {/* Stepper bar */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
            <div className="space-y-1">
              <div className="h-1.5 rounded-full bg-[#4D5E4D]" />
              <span className="font-semibold text-[#4D5E4D]">1. Ticket Received</span>
            </div>
            <div className="space-y-1">
              <div className={`h-1.5 rounded-full transition-colors duration-500 ${
                activeStep >= 2 ? 'bg-[#4D5E4D]' : 'bg-[#E5DACD]'
              }`} />
              <span className={activeStep >= 2 ? 'font-semibold text-[#4D5E4D]' : 'text-[#8C7667]'}>
                2. Grinding & Steaming
              </span>
            </div>
            <div className="space-y-1">
              <div className="h-1.5 rounded-full bg-[#E5DACD]" />
              <span className="text-[#8C7667]">
                3. {order.orderType === 'pickup' ? 'Counter Ready' : 'Courier En Route'}
              </span>
            </div>
          </div>
        </div>

        {/* Order Details & Receipt - Scrollable */}
        <div className="p-4 sm:p-5 space-y-4 text-xs text-[#5A483D] flex-1 overflow-y-auto overscroll-contain">
          
          {/* Logistics & Payment Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 bg-[#F4EDE3] p-3 rounded-xl border border-[#E0D5C7]">
            <div>
              <span className="text-[10px] uppercase font-semibold text-[#8C7667] block">
                Fulfillment Mode
              </span>
              <p className="font-semibold text-[#2C221B] text-xs mt-0.5">
                {order.orderType === 'pickup' ? 'In-Store Pickup (Free)' : 'Courier Delivery'}
              </p>
              <p className="text-[11px] text-[#735F52] mt-0.5">
                {order.orderType === 'pickup' ? '412 Blossom Way, Cafe Counter' : order.customer.address}
              </p>
            </div>

            <div>
              <span className="text-[10px] uppercase font-semibold text-[#8C7667] block">
                Payment Status
              </span>
              <p className="font-semibold text-[#2C221B] text-xs mt-0.5 flex items-center gap-1.5">
                {order.paymentMethod === 'card' ? (
                  <span className="text-[#4D5E4D]">Paid Online (Card ending in {order.cardLast4 || '4242'})</span>
                ) : (
                  <span className="text-amber-800 font-bold">Cash on Delivery (Pending at Pickup)</span>
                )}
              </p>
              <p className="text-[11px] text-[#735F52] mt-0.5">
                Receipt emailed to {order.customer.email}
              </p>
            </div>
          </div>

          {/* Items summary */}
          <div className="space-y-1.5">
            <span className="font-semibold text-[#2C221B] block text-xs">Ordered Items</span>
            <div className="divide-y divide-[#F0E8DD] border-y border-[#F0E8DD]">
              {order.items.map((it) => (
                <div key={it.id} className="py-2 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-[#2C221B]">
                      {it.quantity}x {it.menuItem.name}
                    </span>
                    <div className="text-[10px] text-[#8C7667]">
                      {it.customization.temperature && `${it.customization.temperature} • `}
                      {it.customization.milk && `${it.customization.milk.split('(')[0]} • `}
                      {it.customization.pastryServing && `Serving: ${it.customization.pastryServing}`}
                    </div>
                  </div>
                  <span className="font-medium text-[#2C221B]">
                    ${it.totalPrice.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals */}
          <div className="space-y-1 text-right pt-0.5 text-xs">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium text-[#2C221B]">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Fulfillment:</span>
              <span>{order.deliveryFee === 0 ? 'FREE' : `$${order.deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes:</span>
              <span>${order.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base font-serif font-bold text-[#2C221B] pt-1.5 border-t border-[#EAE1D5]">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Sticky Close Button Footer */}
        <div className="p-3 sm:p-4 bg-white border-t border-[#E8DFD5] shrink-0">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-6 rounded-xl bg-[#2C221B] hover:bg-[#43352A] text-[#FAF7F2] text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
          >
            Done & Return to Cafe Menu
          </button>
        </div>

      </div>
    </div>
  );
};
