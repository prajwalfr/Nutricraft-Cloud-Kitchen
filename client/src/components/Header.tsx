import React from 'react';
import { UtensilsCrossed, ShoppingBag, Calendar, LayoutDashboard, Radio } from 'lucide-react';
import { CartItem } from '../types';

interface HeaderProps {
  activeTab: 'menu' | 'tracker' | 'kitchen';
  setActiveTab: (tab: 'menu' | 'tracker' | 'kitchen') => void;
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenSubscription: () => void;
  activeOrderCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cart,
  onOpenCart,
  onOpenSubscription,
  activeOrderCount
}) => {
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <div 
          onClick={() => setActiveTab('menu')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <UtensilsCrossed className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white">NutriCraft</span>
              <span className="bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <Radio className="w-3 h-3 animate-pulse text-emerald-400" /> LIVE KITCHEN
              </span>
            </div>
            <p className="text-xs text-slate-400">Macro-Customizable Everyday Cloud Kitchen</p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <nav className="hidden md:flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'menu'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" /> Menu (30 Staples)
          </button>

          <button
            onClick={() => setActiveTab('tracker')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 relative ${
              activeTab === 'tracker'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Radio className="w-4 h-4" /> Live Tracking
            {activeOrderCount > 0 && (
              <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-1.5 py-0.2 rounded-full animate-bounce">
                {activeOrderCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('kitchen')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'kitchen'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" /> Kitchen Admin
          </button>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSubscription}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold border border-slate-700 transition-colors"
          >
            <Calendar className="w-4 h-4 text-emerald-400" />
            <span>Monthly Subscriptions</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-emerald-400 transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Cart</span>
            {totalCartCount > 0 && (
              <span className="ml-1 bg-white text-emerald-800 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
