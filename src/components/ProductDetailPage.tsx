import React, { useState } from 'react';
import { MenuItem, CartCustomization, CartItem } from '../types';
import { ArrowLeft, Star, Plus, Minus, Check, Sparkles, Coffee, ShieldCheck, Heart, Share2, Info, ShoppingBag } from 'lucide-react';

interface ProductDetailPageProps {
  item: MenuItem;
  onBack: () => void;
  onAddToCart: (customization: CartCustomization, quantity: number, unitPrice: number) => void;
  onInstantCheckout: (customization: CartCustomization, quantity: number, unitPrice: number) => void;
  cartItems?: CartItem[];
  onOpenCart?: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  item,
  onBack,
  onAddToCart,
  onInstantCheckout,
  cartItems = [],
  onOpenCart
}) => {
  // Customization state
  const isBeverage = item.options.type === 'beverage';
  const [temperature, setTemperature] = useState<'Hot' | 'Iced'>(
    item.options.temperatures ? item.options.temperatures[0] : 'Hot'
  );
  const [milk, setMilk] = useState<string>(
    item.options.milks ? item.options.milks[0] : 'Standard Milk'
  );
  const [sweetness, setSweetness] = useState<string>(
    item.options.sweetness ? item.options.sweetness[0] : 'Standard'
  );
  const [selectedAdditions, setSelectedAdditions] = useState<string[]>([]);
  const [pastryServing, setPastryServing] = useState<string>(
    item.options.pastryServings ? item.options.pastryServings[0] : 'Fresh Room Temp'
  );
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<string>(item.image);
  const [addedToast, setAddedToast] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const countInBag = cartItems
    .filter(ci => ci.menuItem.id === item.id)
    .reduce((acc, ci) => acc + ci.quantity, 0);

  // Compute live price based on additions
  const additionsTotal = selectedAdditions.reduce((acc, addName) => {
    const found = item.options.additions?.find(a => a.name === addName);
    return acc + (found ? found.price : 0);
  }, 0);

  // Pistachio milk add-on check
  const milkExtra = milk.includes('+$0.75') ? 0.75 : 0;
  const unitPrice = item.price + additionsTotal + milkExtra;
  const totalPrice = unitPrice * quantity;

  const toggleAddition = (addName: string) => {
    if (selectedAdditions.includes(addName)) {
      setSelectedAdditions(selectedAdditions.filter(a => a !== addName));
    } else {
      setSelectedAdditions([...selectedAdditions, addName]);
    }
  };

  const getCustomizationPayload = (): CartCustomization => {
    return {
      temperature: isBeverage ? temperature : undefined,
      milk: isBeverage ? milk : undefined,
      sweetness: isBeverage ? sweetness : undefined,
      selectedAdditions,
      pastryServing: !isBeverage ? pastryServing : undefined,
      specialInstructions: specialInstructions.trim() || undefined
    };
  };

  const handleAdd = () => {
    onAddToCart(getCustomizationPayload(), quantity, unitPrice);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const handleInstantBuy = () => {
    onInstantCheckout(getCustomizationPayload(), quantity, unitPrice);
  };

  return (
    <main className="bg-[#FAF7F2] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumbs & Back Button */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EAE1D5]">
          <button
            id="back-to-menu-btn"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#5A483D] hover:text-[#2C221B] transition-colors group focus:outline-none"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Curated Menu</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2 rounded-full border transition-colors ${
                isSaved
                  ? 'border-rose-300 bg-rose-50 text-rose-600'
                  : 'border-[#E0D5C7] bg-white text-[#5A483D] hover:text-[#2C221B]'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <span className="text-xs text-[#8C7667] hidden sm:inline">
              Menu Item #{item.id.slice(0, 8)}
            </span>
          </div>
        </div>

        {/* Main Grid: Left Gallery, Right Details & Order Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Imagery & Visual Story */}
          <div className="lg:col-span-6 space-y-6">
            {/* Primary Main Image Showcase */}
            <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden bg-white border border-[#E5DACD] shadow-sm">
              <img
                src={activeImage}
                alt={item.name}
                className="w-full h-full object-cover object-center"
              />

              {/* Badges on image */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {item.badge && (
                  <span className="bg-[#2C221B] text-[#FAF7F2] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                    {item.badge}
                  </span>
                )}
                <span className="bg-white/95 backdrop-blur-xs text-[#4D5E4D] border border-[#D5E2D3] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Thumbnails if secondary image exists */}
            {item.secondaryImage && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveImage(item.image)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === item.image ? 'border-[#2C221B] ring-2 ring-[#2C221B]/10' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={item.image} alt="Presentation 1" className="w-full h-full object-cover" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImage(item.secondaryImage!)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImage === item.secondaryImage ? 'border-[#2C221B] ring-2 ring-[#2C221B]/10' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={item.secondaryImage} alt="Presentation 2" className="w-full h-full object-cover" />
                </button>
              </div>
            )}

            {/* The Artisan's Story Card */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8DFD5] space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#4D5E4D]">
                <Sparkles className="w-4 h-4 text-[#4D5E4D]" />
                <span>The Roaster & Baker&apos;s Story</span>
              </div>
              <p className="text-sm text-[#5A483D] leading-relaxed">
                {item.detailedStory}
              </p>

              {/* Ingredients breakdown */}
              <div className="pt-3 border-t border-[#F0E8DD]">
                <span className="block text-xs font-semibold text-[#2C221B] mb-2">Key Craft Ingredients:</span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#6B5749]">
                  {item.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4D5E4D]" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Nutrition & Caffeine badge */}
              <div className="pt-3 border-t border-[#F0E8DD] flex items-center justify-between text-xs text-[#735F52]">
                <span>Energy: <strong className="text-[#2C221B]">{item.nutrition.calories}</strong></span>
                <span>Caffeine: <strong className="text-[#2C221B]">{item.nutrition.caffeine}</strong></span>
                <span>Dietary: <strong className="text-[#4D5E4D]">{item.nutrition.dietary}</strong></span>
              </div>
            </div>

          </div>

          {/* Right Column: Title, Flavor notes, Customization & Ordering */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Header details */}
            <div>
              {/* Rating & Reviews */}
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-semibold text-[#2C221B]">{item.rating.toFixed(1)}</span>
                <span className="text-xs text-[#8C7667]">({item.reviewsCount} customer reviews)</span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C221B] tracking-tight leading-tight">
                {item.name}
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-[#735F52] mt-1 italic">
                {item.subtitle}
              </p>

              {/* Dynamic Price Display */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-serif text-3xl font-semibold text-[#2C221B]">
                  ${unitPrice.toFixed(2)}
                </span>
                {unitPrice !== item.price && (
                  <span className="text-xs text-[#8C7667] line-through">
                    ${item.price.toFixed(2)} base
                  </span>
                )}
                <span className="text-xs text-[#4D5E4D] font-medium bg-[#EBF0EA] px-2 py-0.5 rounded-full">
                  Handcrafted fresh to order
                </span>
              </div>

              {/* Short summary description */}
              <p className="mt-4 text-sm sm:text-base text-[#5A483D] leading-relaxed">
                {item.description}
              </p>

              {/* Tasting notes chips */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-[#735F52]">Aroma & Notes:</span>
                {item.tastingNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-[#F5ECE8] text-[#4A3B32] font-medium border border-[#EAD8CE]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Customization Options Container */}
            <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#EADFD4] shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#F0E8DD]">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-[#2C221B]">
                  Personalize Your Cup
                </h2>
                <span className="text-xs text-[#8C7667]">Barista Spec</span>
              </div>

              {/* Beverage: Temperature Selector */}
              {isBeverage && item.options.temperatures && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#4A3B32] block">
                    Temperature Preparation
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {item.options.temperatures.map(temp => (
                      <button
                        key={temp}
                        type="button"
                        id={`option-temp-${temp.toLowerCase()}`}
                        onClick={() => setTemperature(temp)}
                        className={`py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide border transition-all flex items-center justify-center gap-2 ${
                          temperature === temp
                            ? 'bg-[#2C221B] text-[#FAF7F2] border-[#2C221B] shadow-2xs'
                            : 'bg-[#FAF7F2] text-[#5A483D] border-[#E0D5C7] hover:border-[#2C221B]'
                        }`}
                      >
                        <span>{temp} Preparation</span>
                        {temperature === temp && <Check className="w-3.5 h-3.5 text-[#E8DFD5]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Beverage: Milk Choice */}
              {isBeverage && item.options.milks && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#4A3B32] block">
                    Milk or Botanical Base
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.options.milks.map(m => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMilk(m)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium text-left border transition-all flex items-center justify-between ${
                          milk === m
                            ? 'bg-[#F4EDE3] text-[#2C221B] border-[#2C221B] font-semibold'
                            : 'bg-[#FAF7F2] text-[#5A483D] border-[#E5DACD] hover:border-[#2C221B]'
                        }`}
                      >
                        <span className="truncate">{m}</span>
                        {milk === m && <Check className="w-3.5 h-3.5 text-[#2C221B] shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Beverage: Sweetness level */}
              {isBeverage && item.options.sweetness && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#4A3B32] block">
                    Sweetness & Floral Infusion
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {item.options.sweetness.map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSweetness(s)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium text-left border transition-all flex items-center justify-between ${
                          sweetness === s
                            ? 'bg-[#F4EDE3] text-[#2C221B] border-[#2C221B] font-semibold'
                            : 'bg-[#FAF7F2] text-[#5A483D] border-[#E5DACD] hover:border-[#2C221B]'
                        }`}
                      >
                        <span className="truncate">{s}</span>
                        {sweetness === s && <Check className="w-3.5 h-3.5 text-[#2C221B] shrink-0" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Beverage: Extra additions */}
              {isBeverage && item.options.additions && item.options.additions.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#4A3B32] block">
                    Artisan Enhancements
                  </label>
                  <div className="space-y-1.5">
                    {item.options.additions.map(add => {
                      const isChecked = selectedAdditions.includes(add.name);
                      return (
                        <div
                          key={add.name}
                          onClick={() => toggleAddition(add.name)}
                          className={`p-2.5 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                            isChecked
                              ? 'bg-[#EBF0EA] border-[#4D5E4D] text-[#2C221B]'
                              : 'bg-[#FAF7F2] border-[#E5DACD] text-[#5A483D] hover:border-[#2C221B]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                              isChecked ? 'bg-[#4D5E4D] border-[#4D5E4D] text-white' : 'border-[#B8A89A] bg-white'
                            }`}>
                              {isChecked && <Check className="w-3 h-3" />}
                            </div>
                            <span className="font-medium">{add.name}</span>
                          </div>
                          <span className="font-semibold text-[#2C221B]">+${add.price.toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Pastry: Warm or Room Temp */}
              {!isBeverage && item.options.pastryServings && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#4A3B32] block">
                    Bakery Serving Preference
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {item.options.pastryServings.map(serving => (
                      <button
                        key={serving}
                        type="button"
                        onClick={() => setPastryServing(serving)}
                        className={`py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-2 ${
                          pastryServing === serving
                            ? 'bg-[#2C221B] text-[#FAF7F2] border-[#2C221B]'
                            : 'bg-[#FAF7F2] text-[#5A483D] border-[#E0D5C7] hover:border-[#2C221B]'
                        }`}
                      >
                        <span>{serving}</span>
                        {pastryServing === serving && <Check className="w-3.5 h-3.5 text-[#E8DFD5]" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Barista Instructions */}
              <div className="space-y-1.5">
                <label htmlFor="barista-notes-input" className="text-xs font-semibold text-[#4A3B32] block">
                  Notes for Barista / Baker (Optional)
                </label>
                <input
                  id="barista-notes-input"
                  type="text"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  placeholder="e.g. Extra hot, light foam, separate bag, allergy alert..."
                  className="w-full px-3.5 py-2 rounded-xl text-xs bg-[#FAF7F2] border border-[#D9CEC3] focus:border-[#2C221B] focus:ring-1 focus:ring-[#2C221B] outline-none text-[#2C221B] placeholder-[#9E8B7E]"
                />
              </div>

              {/* Quantity Counter & Total */}
              <div className="pt-4 border-t border-[#F0E8DD] flex items-center justify-between">
                <div>
                  <span className="block text-xs font-medium text-[#735F52]">Total for this item:</span>
                  <span className="font-serif text-2xl font-semibold text-[#2C221B]">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-[#FAF7F2] border border-[#D9CEC3] rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#2C221B] hover:bg-[#EDE5DA] disabled:opacity-30 disabled:hover:bg-transparent transition-colors focus:outline-none"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-semibold text-[#2C221B] min-w-5 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#2C221B] hover:bg-[#EDE5DA] transition-colors focus:outline-none"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Ordering Action Buttons */}
              <div className="space-y-2.5 pt-2">
                {countInBag > 0 && (
                  <div className="p-3 bg-[#F0F5EF] border border-[#C6DAC4] rounded-xl flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[#355333] font-medium">
                      <ShoppingBag className="w-4 h-4 text-[#4D5E4D]" />
                      <span>Currently <strong>{countInBag}</strong> of this item in your bag</span>
                    </div>
                    {onOpenCart && (
                      <button
                        type="button"
                        onClick={onOpenCart}
                        className="text-xs font-semibold text-[#2C221B] underline hover:text-[#4D5E4D] cursor-pointer"
                      >
                        View in Bag →
                      </button>
                    )}
                  </div>
                )}

                <button
                  type="button"
                  id="product-instant-buy-btn"
                  onClick={handleInstantBuy}
                  className="w-full py-3.5 px-4 sm:px-6 rounded-xl bg-[#2C221B] hover:bg-[#43352A] text-[#FAF7F2] text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                >
                  <span className="truncate">Order Now (${totalPrice.toFixed(2)}) • COD & Online</span>
                </button>

                <button
                  type="button"
                  id="product-add-to-bag-btn"
                  onClick={handleAdd}
                  className="w-full py-3 px-4 sm:px-6 rounded-xl bg-[#FFFFFF] hover:bg-[#FAF7F2] text-[#2C221B] border border-[#C8B8A6] text-xs sm:text-sm font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Order Bag (${totalPrice.toFixed(2)})</span>
                </button>
              </div>

              {/* Success Notification Toast */}
              {addedToast && (
                <div className="p-3.5 bg-[#EBF0EA] border border-[#4D5E4D]/30 rounded-xl text-xs text-[#2C221B] flex items-center justify-between gap-2 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#4D5E4D]" />
                    <span>Added to your bag! Ready for checkout.</span>
                  </div>
                  {onOpenCart && (
                    <button
                      type="button"
                      onClick={onOpenCart}
                      className="text-xs font-bold text-[#2C221B] underline hover:text-[#4D5E4D] cursor-pointer"
                    >
                      Open Bag Now
                    </button>
                  )}
                </div>
              )}

              {/* Payment Guarantee & Ordering Info */}
              <div className="pt-2 border-t border-[#F0E8DD] space-y-2 text-[11px] text-[#735F52]">
                <div className="flex items-center gap-2 text-[#4D5E4D] font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Seamless Online Ordering • Both COD & Secure Cards Accepted</span>
                </div>
                <p>
                  Choose between speedy cafe pickup (ready in ~15 mins) or chilled local courier delivery. No account or database required.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
};
