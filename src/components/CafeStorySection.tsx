import React from 'react';
import { Coffee, Flower, Sun, Clock, MapPin, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';

export const CafeStorySection: React.FC = () => {
  return (
    <div className="space-y-0">
      
      {/* Our Story & Ethos Section */}
      <section id="story" className="py-20 bg-[#F4EDE3] border-t border-[#E8DFD5] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Collage */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-xs border border-[#E0D5C7] aspect-3/4">
                  <img
                    src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80"
                    alt="Barista brewing pour over coffee"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 rounded-2xl bg-white border border-[#E5DACD] text-xs text-[#5A483D]">
                  <span className="font-serif text-2xl text-[#2C221B] font-semibold block mb-1">
                    94+
                  </span>
                  Specialty coffee grading on all single-origin seasonal lots.
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-5 rounded-2xl bg-[#4D5E4D] text-[#FAF7F2] text-xs">
                  <Flower className="w-5 h-5 text-[#D5E2D3] mb-2" />
                  <p className="font-medium">Organic edible blossoms harvested from certified botanical gardens.</p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xs border border-[#E0D5C7] aspect-3/4">
                  <img
                    src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=800&q=80"
                    alt="Greenhouse cafe plants and tables"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Right Story Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF0EA] text-[#4D5E4D] text-xs font-semibold tracking-wider uppercase">
                <span>The Story of Brew & Blossom</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#2C221B] tracking-tight leading-tight">
                Rooted in ritual, elevated with organic flora.
              </h2>

              <p className="text-sm sm:text-base text-[#5A483D] leading-relaxed">
                Brew & Blossom was born from an unhurried morning philosophy: that coffee should not merely awaken, but restore. In our light-filled greenhouse roastery, we pair the scientific rigor of light-to-medium specialty extractions with the delicate notes of edible petals, heirloom botanicals, and slow-laminated French doughs.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#E5DACD]">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] flex items-center justify-center text-[#4D5E4D] mb-2">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-semibold text-[#2C221B] mb-1">Direct-Trade Roasting</h4>
                  <p className="text-[11px] text-[#735F52]">We partner directly with smallholder coffee families in Ethiopia, Guatemala, and Kenya at above fair-trade premiums.</p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E5DACD]">
                  <div className="w-8 h-8 rounded-full bg-[#FAF5EE] flex items-center justify-center text-[#4D5E4D] mb-2">
                    <Flower className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-semibold text-[#2C221B] mb-1">Botanical Distillations</h4>
                  <p className="text-[11px] text-[#735F52]">Our rosewater, lavender syrups, and neroli glazes are distilled in-house using pure mountain spring water and unrefined sugars.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The Ambience & Experience Section */}
      <section id="ambience" className="py-20 bg-[#FAF7F2] border-t border-[#E8DFD5] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4D5E4D]">
              Atmosphere & Space
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#2C221B] tracking-tight">
              A Sunlit Sanctuary in the Heart of the City
            </h2>
            <p className="text-sm text-[#6B5749] leading-relaxed">
              Step past the glass doors into our natural atrium. Soft vinyl jazz, lush ficus trees, hand-thrown ceramic mugs, and the comforting hum of the Slayer espresso machine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-[#E8DFD5] space-y-3 shadow-2xs">
              <div className="h-44 rounded-xl overflow-hidden bg-[#F3EDE3] mb-4">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80"
                  alt="Cafe interior seating with sunlight"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#2C221B]">
                Mindful Mornings & Workspace
              </h3>
              <p className="text-xs text-[#6B5749] leading-relaxed">
                Quiet corner nooks with natural daylight, artisan oak tables, high-speed fiber Wi-Fi, and courteous table service.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E8DFD5] space-y-3 shadow-2xs">
              <div className="h-44 rounded-xl overflow-hidden bg-[#F3EDE3] mb-4">
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
                  alt="Specialty latte and coffee beans on counter"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#2C221B]">
                The Tasting Bar
              </h3>
              <p className="text-xs text-[#6B5749] leading-relaxed">
                Pull up a seat at our live brew counter where our baristas guide you through origin cupping flights and cold brew tastings.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[#E8DFD5] space-y-3 shadow-2xs">
              <div className="h-44 rounded-xl overflow-hidden bg-[#F3EDE3] mb-4">
                <img
                  src="https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=80"
                  alt="Pastries and flowers on marble counter"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#2C221B]">
                The Botanical Nursery
              </h3>
              <p className="text-xs text-[#6B5749] leading-relaxed">
                Browse our curated selection of potted succulents, dried flower bouquets, and retail whole-bean tins to take the garden home.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Hours & Location Visit Section */}
      <section id="visit" className="py-20 bg-[#F4EDE3] border-t border-[#E8DFD5] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-[#E5DACD] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left: Contact & Hours */}
            <div className="lg:col-span-7 p-8 sm:p-12 space-y-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#4D5E4D]">
                  Plan Your Visit
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#2C221B] tracking-tight mt-1">
                  Hours & Gathering Space
                </h2>
                <p className="text-xs sm:text-sm text-[#735F52] mt-2">
                  Whether you are dropping in for a quick morning flat white or staying for a tranquil afternoon with a book, our doors are open.
                </p>
              </div>

              {/* Hours Grid */}
              <div className="space-y-2.5 text-xs text-[#2C221B]">
                <div className="flex items-center justify-between pb-2 border-b border-[#F0E8DD]">
                  <span className="font-medium text-[#5A483D]">Monday – Friday</span>
                  <span className="font-semibold">6:30 AM – 7:00 PM</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#F0E8DD]">
                  <span className="font-medium text-[#5A483D]">Saturday</span>
                  <span className="font-semibold">7:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#F0E8DD]">
                  <span className="font-medium text-[#5A483D]">Sunday (Botanical Acoustic Brunch)</span>
                  <span className="font-semibold">7:30 AM – 7:00 PM</span>
                </div>
              </div>

              {/* Address & Contacts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 text-xs">
                  <MapPin className="w-4 h-4 text-[#4D5E4D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#2C221B]">Brew & Blossom Atrium</strong>
                    <span className="text-[#735F52]">412 Blossom Way, Greenhouse Quarter, San Francisco, CA</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs">
                  <Phone className="w-4 h-4 text-[#4D5E4D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#2C221B]">Table Inquiries</strong>
                    <span className="text-[#735F52]">(415) 555-0192</span>
                    <span className="block text-[#8C7667] text-[11px]">hello@brewandblossom.cafe</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Map & Visual Preview */}
            <div className="lg:col-span-5 relative bg-[#EFE8DD] min-h-[280px]">
              <img
                src="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1000&q=80"
                alt="Cafe exterior street front"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="bg-white/95 backdrop-blur-xs p-4 rounded-xl shadow-md border border-white/50 w-full text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#2C221B]">Walk-ins & Counter Orders Welcome</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <p className="text-[11px] text-[#735F52] mt-0.5">Outdoor botanical patio seating available dog-friendly.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
