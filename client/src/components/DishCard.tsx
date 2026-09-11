import React from 'react';
import { Sliders, Flame, Dumbbell, ShieldAlert, Wheat, Shield } from 'lucide-react';
import { Dish } from '../types';

interface DishCardProps {
  dish: Dish;
  onCustomize: (dish: Dish) => void;
  onQuickAdd?: (dish: Dish) => void;
}

export const DishCard: React.FC<DishCardProps> = ({ dish, onCustomize }) => {
  const allergensList = Array.isArray(dish.allergens) 
    ? dish.allergens 
    : typeof dish.allergens === 'string' 
      ? JSON.parse(dish.allergens || '[]') 
      : [];

  return (
    <div className={`group glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between relative ${
      !dish.isAvailable ? 'opacity-65 grayscale-[40%]' : ''
    }`}>

      {/* IMAGE & BADGES */}
      <div className="relative h-48 overflow-hidden bg-slate-900">
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/30" />

        {/* DIETARY DOT */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-slate-700/60">
          <span className={`w-2.5 h-2.5 rounded-full ${
            dish.dietary === 'Veg' ? 'bg-emerald-500' : dish.dietary === 'Vegan' ? 'bg-teal-400' : 'bg-rose-500'
          }`} />
          <span className="text-xs font-bold text-slate-200">{dish.dietary}</span>
        </div>

        {/* CUISINE BADGE */}
        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-lg border border-amber-500/20">
          {dish.cuisine}
        </div>

        {/* CATEGORY BADGE */}
        <div className="absolute bottom-3 left-3 bg-emerald-500/90 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded-md">
          {dish.category}
        </div>

        {/* OUT OF STOCK BADGE */}
        {!dish.isAvailable && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center gap-2 text-rose-400">
            <ShieldAlert className="w-8 h-8 animate-bounce" />
            <span className="font-extrabold text-sm tracking-wider uppercase">Out of Stock Today</span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
            {dish.name}
          </h3>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {dish.description}
          </p>

          {/* ALLERGENS BADGES */}
          {allergensList.length > 0 && (
            <div className="flex items-center gap-1 mt-2 flex-wrap">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                <Shield className="w-2.5 h-2.5 text-amber-400" /> Allergens:
              </span>
              {allergensList.map((alg: string) => (
                <span key={alg} className="text-[10px] bg-rose-500/10 text-rose-300 border border-rose-500/20 px-1.5 py-0.5 rounded font-medium">
                  {alg}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* MACRO SUMMARY GRID */}
        <div className="my-3 grid grid-cols-4 gap-1.5 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
          <div>
            <div className="text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-0.5">
              <Flame className="w-2.5 h-2.5 text-amber-400" /> Cals
            </div>
            <div className="text-xs font-bold text-white mt-0.5">{dish.baseCalories}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-0.5">
              <Dumbbell className="w-2.5 h-2.5 text-emerald-400" /> Prot
            </div>
            <div className="text-xs font-bold text-emerald-400 mt-0.5">{dish.baseProtein}g</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold">Carbs</div>
            <div className="text-xs font-bold text-slate-300 mt-0.5">{dish.baseCarbs}g</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-0.5">
              <Wheat className="w-2.5 h-2.5 text-cyan-400" /> Fiber
            </div>
            <div className="text-xs font-bold text-cyan-400 mt-0.5">{dish.fiber || 5.0}g</div>
          </div>
        </div>

        {/* PRICE & BUTTONS */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
          <div>
            <span className="text-xs text-slate-400">Starts at</span>
            <div className="text-lg font-extrabold text-white">₹{dish.basePrice}</div>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={!dish.isAvailable}
              onClick={() => onCustomize(dish)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/20 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Customize & Add</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

