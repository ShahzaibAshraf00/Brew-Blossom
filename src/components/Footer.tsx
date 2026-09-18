import React, { useState } from 'react';
import { Instagram, Facebook, Twitter, ArrowUp, Send, Check, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateHome: () => void;
  onSelectMenu: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateHome, onSelectMenu }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#261E18] text-[#FAF7F2] pt-16 pb-12 border-t border-[#3D3027]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Dispatch Bar */}
        <div className="pb-12 border-b border-[#3D3027] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D5E2D3]">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>The Sunday Roaster&apos;s Dispatch</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[#FAF7F2]">
              Join our botanical tasting circle.
            </h3>
            <p className="text-xs sm:text-sm text-[#C4B2A3] max-w-md">
              Receive invitations to secret origin cuppings, seasonal syrup recipes, and first reservations for floral pastry boxes.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md lg:ml-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="px-4 py-3 text-xs rounded-xl bg-[#332820] border border-[#4D3C30] text-[#FAF7F2] placeholder-[#8C7667] focus:border-[#D5E2D3] outline-none flex-1"
              />
              <button
                type="submit"
                id="footer-subscribe-btn"
                className="px-6 py-3 rounded-xl bg-[#FAF7F2] hover:bg-[#EBE2D7] text-[#261E18] text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-[#D5E2D3] flex items-center gap-1.5 mt-2">
                <Check className="w-3.5 h-3.5" />
                <span>Welcome to the circle. We look forward to sharing our next harvest.</span>
              </p>
            )}
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-[#3D3027]">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#261E18] flex items-center justify-center text-xs font-serif font-bold">
                B&B
              </div>
              <span className="font-serif text-xl tracking-tight font-medium text-[#FAF7F2]">
                Brew & Blossom
              </span>
            </div>
            <p className="text-xs text-[#BFAFA1] leading-relaxed">
              Specialty direct-trade coffee roasters and botanical patisserie atelier. Grounded in mindfulness, roasted with warmth.
            </p>
            <div className="pt-2 text-[11px] text-[#8C7667]">
              412 Blossom Way, Greenhouse Quarter<br />
              San Francisco, CA 94103
            </div>
          </div>

          {/* Col 2: Navigation & Menu */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-wider text-[#E8DFD5]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-[#C4B2A3]">
              <li>
                <button
                  onClick={() => {
                    onNavigateHome();
                    onSelectMenu();
                  }}
                  className="hover:text-white transition-colors"
                >
                  Our 6 Signature Items
                </button>
              </li>
              <li>
                <a href="#story" className="hover:text-white transition-colors">
                  Direct-Trade Ethos
                </a>
              </li>
              <li>
                <a href="#ambience" className="hover:text-white transition-colors">
                  The Greenhouse Space
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-white transition-colors">
                  Hours & Gathering
                </a>
              </li>
              <li>
                <span className="text-[#8C7667]">Private Events & Roastery Tours (Inquire)</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Counter service */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-wider text-[#E8DFD5]">
              Cafe Hours
            </h4>
            <div className="space-y-1.5 text-xs text-[#C4B2A3]">
              <div>
                <span className="block text-[#E8DFD5] font-medium">Monday – Friday</span>
                <span className="text-[11px] text-[#8C7667]">6:30 AM – 7:00 PM</span>
              </div>
              <div>
                <span className="block text-[#E8DFD5] font-medium">Saturday</span>
                <span className="text-[11px] text-[#8C7667]">7:00 AM – 8:00 PM</span>
              </div>
              <div>
                <span className="block text-[#E8DFD5] font-medium">Sunday</span>
                <span className="text-[11px] text-[#8C7667]">7:30 AM – 7:00 PM</span>
              </div>
              <p className="text-[10px] text-[#8C7667] pt-2">
                Online order pickup ready in ~15 mins.
              </p>
            </div>
          </div>

          {/* Col 4: Social Media Links */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-semibold tracking-wider text-[#E8DFD5]">
              Follow Our Journey
            </h4>
            <p className="text-xs text-[#BFAFA1] leading-relaxed">
              Share your morning cup with us on social media using <span className="text-[#FAF7F2]">#BrewAndBlossom</span>.
            </p>

            {/* Social Media Link Buttons */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                id="social-instagram-link"
                className="w-9 h-9 rounded-full bg-[#332820] hover:bg-[#FAF7F2] hover:text-[#261E18] text-[#D9CEC3] flex items-center justify-center transition-colors border border-[#4D3C30]"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                id="social-facebook-link"
                className="w-9 h-9 rounded-full bg-[#332820] hover:bg-[#FAF7F2] hover:text-[#261E18] text-[#D9CEC3] flex items-center justify-center transition-colors border border-[#4D3C30]"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                id="social-twitter-link"
                className="w-9 h-9 rounded-full bg-[#332820] hover:bg-[#FAF7F2] hover:text-[#261E18] text-[#D9CEC3] flex items-center justify-center transition-colors border border-[#4D3C30]"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>

              {/* Pinterest custom / music link */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                id="social-pinterest-link"
                className="w-9 h-9 rounded-full bg-[#332820] hover:bg-[#FAF7F2] hover:text-[#261E18] text-[#D9CEC3] flex items-center justify-center transition-colors border border-[#4D3C30] text-xs font-semibold"
                aria-label="Pinterest"
              >
                P
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                id="social-tiktok-link"
                className="w-9 h-9 rounded-full bg-[#332820] hover:bg-[#FAF7F2] hover:text-[#261E18] text-[#D9CEC3] flex items-center justify-center transition-colors border border-[#4D3C30] text-xs font-semibold"
                aria-label="TikTok"
              >
                TT
              </a>
            </div>

            <div className="pt-2 text-[11px] text-[#8C7667]">
              Customer Service: <span className="text-[#FAF7F2]">orders@brewandblossom.cafe</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7667]">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Brew & Blossom Coffee Co. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-[11px]">
            <span className="hover:text-[#FAF7F2] cursor-pointer">Organic Certification</span>
            <span className="hover:text-[#FAF7F2] cursor-pointer">Allergen Information</span>
            <span className="hover:text-[#FAF7F2] cursor-pointer">Privacy & Terms</span>
            
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-[#332820] hover:bg-[#FAF7F2] hover:text-[#261E18] text-[#D9CEC3] transition-colors ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
