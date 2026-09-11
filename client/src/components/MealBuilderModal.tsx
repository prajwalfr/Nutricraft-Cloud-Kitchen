import React, { useState, useMemo } from 'react';
import { X, Sliders, Flame, Dumbbell, Sparkles, Check, ShoppingBag } from 'lucide-react';
import { Dish, CustomizationOption, SelectedCustomizations } from '../types';
import { calculateMealMacros } from '../utils/macroCalculator';

interface MealBuilderModalProps {
  dish: Dish | null;
  customizationOptions: CustomizationOption[];
  onClose: () => void;
  onAddToCart: (dish: Dish, selected: SelectedCustomizations, calculated: ReturnType<typeof calculateMealMacros>) => void;
}

export const MealBuilderModal: React.FC<MealBuilderModalProps> = ({
  dish,
  customizationOptions,
  onClose,
  onAddToCart
}) => {
  if (!dish) return null;

  // Filter customization categories
  const carbOptions = useMemo(
    () => customizationOptions.filter((opt) => opt.category === 'BASE_CARB'),
    [customizationOptions]
  );
  const proteinOptions = useMemo(
    () => customizationOptions.filter((opt) => opt.category === 'EXTRA_PROTEIN'),
    [customizationOptions]
  );
  const oilOptions = useMemo(
    () => customizationOptions.filter((opt) => opt.category === 'OIL_GHEE'),
    [customizationOptions]
  );

  // Defaults
  const [selectedCarb, setSelectedCarb] = useState<CustomizationOption>(
    carbOptions[0] || {
      id: 'default-carb',
      category: 'BASE_CARB',
      optionName: 'Brown Basmati Rice (150g)',
      extraPrice: 0,
      extraCalories: 0,
      extraProtein: 0,
      extraCarbs: 0,
      extraFats: 0
    }
  );

  const [selectedProtein, setSelectedProtein] = useState<CustomizationOption>(
    proteinOptions[0] || {
      id: 'default-prot',
      category: 'EXTRA_PROTEIN',
      optionName: 'No Extra Protein',
      extraPrice: 0,
      extraCalories: 0,
      extraProtein: 0,
      extraCarbs: 0,
      extraFats: 0
    }
  );

  const [selectedOil, setSelectedOil] = useState<CustomizationOption>(
    oilOptions[0] || {
      id: 'default-oil',
      category: 'OIL_GHEE',
      optionName: 'Standard A2 Ghee (1 tsp)',
      extraPrice: 0,
      extraCalories: 0,
      extraProtein: 0,
      extraCarbs: 0,
      extraFats: 0
    }
  );

  // Real-time macro calculations
  const calculated = useMemo(() => {
    return calculateMealMacros(dish, {
      carbBase: selectedCarb,
      extraProtein: selectedProtein,
      oilGhee: selectedOil
    });
  }, [dish, selectedCarb, selectedProtein, selectedOil]);

  const handleAdd = () => {
    onAddToCart(dish, { carbBase: selectedCarb, extraProtein: selectedProtein, oilGhee: selectedOil }, calculated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* MODAL HEADER */}
        <div className="relative h-44 bg-slate-950 overflow-hidden">
          <img src={dish.imageUrl} alt={dish.name} className="w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-950/80 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-md border border-emerald-500/30">
                Custom Macro Builder
              </span>
              <h2 className="text-xl font-black text-white mt-1">{dish.name}</h2>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400">Total Price</span>
              <div className="text-2xl font-black text-emerald-400">₹{calculated.totalPrice}</div>
            </div>
          </div>
        </div>

        {/* LIVE MACRO STATS BAR */}
        <div className="bg-slate-950 px-6 py-4 border-y border-slate-800/80 grid grid-cols-5 gap-2 text-center">
          <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1">
              <Flame className="w-3 h-3 text-amber-400" /> CALORIES
            </div>
            <div className="text-sm font-extrabold text-white mt-0.5">{calculated.totalCalories} kcal</div>
          </div>
          <div className="bg-slate-900/80 p-2 rounded-xl border border-emerald-500/30">
            <div className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-1">
              <Dumbbell className="w-3 h-3 text-emerald-400" /> PROTEIN
            </div>
            <div className="text-sm font-extrabold text-emerald-400 mt-0.5">{calculated.totalProtein}g</div>
          </div>
          <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 font-bold">CARBS</div>
            <div className="text-sm font-extrabold text-sky-400 mt-0.5">{calculated.totalCarbs}g</div>
          </div>
          <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 font-bold">FATS</div>
            <div className="text-sm font-extrabold text-amber-400 mt-0.5">{calculated.totalFats}g</div>
          </div>
          <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
            <div className="text-[10px] text-slate-400 font-bold">FIBER</div>
            <div className="text-sm font-extrabold text-cyan-400 mt-0.5">{dish.fiber || 5.0}g</div>
          </div>
        </div>

        {/* MACRO ENERGY RATIO VISUAL BAR */}
        <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-400 font-bold mb-1.5">
            <span>Macro Energy Split</span>
            <span className="text-emerald-400">{calculated.macroPercentages.proteinPct}% Protein</span>
          </div>
          <div className="h-2.5 w-full bg-slate-800 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${calculated.macroPercentages.proteinPct}%` }}
              className="bg-emerald-500 h-full transition-all duration-300"
              title={`Protein: ${calculated.macroPercentages.proteinPct}%`}
            />
            <div
              style={{ width: `${calculated.macroPercentages.carbsPct}%` }}
              className="bg-sky-500 h-full transition-all duration-300"
              title={`Carbs: ${calculated.macroPercentages.carbsPct}%`}
            />
            <div
              style={{ width: `${calculated.macroPercentages.fatsPct}%` }}
              className="bg-amber-500 h-full transition-all duration-300"
              title={`Fats: ${calculated.macroPercentages.fatsPct}%`}
            />
          </div>
        </div>

        {/* OPTIONS BODY */}
        <div className="p-6 space-y-6 max-h-[50vh] overflow-y-auto">
          
          {/* 1. CARB BASE SELECTION */}
          <div>
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-400" /> 1. Select Carb Base / Grain Portion
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {carbOptions.map((opt) => {
                const isSelected = selectedCarb.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedCarb(opt)}
                    className={`p-3 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        <span>{opt.optionName}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {opt.extraCalories >= 0 ? `+${opt.extraCalories}` : opt.extraCalories} kcal | {opt.extraCarbs >= 0 ? `+${opt.extraCarbs}` : opt.extraCarbs}g carbs
                      </div>
                    </div>
                    {opt.extraPrice > 0 && (
                      <span className="text-emerald-400 font-extrabold text-xs">+₹{opt.extraPrice}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. EXTRA PROTEIN ADD-ON */}
          <div>
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
              <Dumbbell className="w-3.5 h-3.5 text-emerald-400" /> 2. Boost Protein Portion (+g)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {proteinOptions.map((opt) => {
                const isSelected = selectedProtein.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedProtein(opt)}
                    className={`p-3 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        <span>{opt.optionName}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        +{opt.extraProtein}g protein | +{opt.extraCalories} kcal
                      </div>
                    </div>
                    {opt.extraPrice > 0 ? (
                      <span className="text-emerald-400 font-extrabold text-xs">+₹{opt.extraPrice}</span>
                    ) : (
                      <span className="text-slate-500 text-[10px]">Included</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. OIL / GHEE CONTROLS */}
          <div>
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 3. Cooking Fat / Ghee Preference
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {oilOptions.map((opt) => {
                const isSelected = selectedOil.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedOil(opt)}
                    className={`p-3 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500 text-white font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                        <span>{opt.optionName}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {opt.extraCalories === 0 ? 'Standard fat' : `${opt.extraCalories} kcal (${opt.extraFats}g fat)`}
                      </div>
                    </div>
                    {opt.extraPrice > 0 && (
                      <span className="text-amber-400 font-extrabold text-xs">+₹{opt.extraPrice}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400">Total Custom Meal</span>
            <div className="text-xl font-black text-white">₹{calculated.totalPrice}</div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart (₹{calculated.totalPrice})
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
