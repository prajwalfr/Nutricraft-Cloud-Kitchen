import React, { useState, useMemo } from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';
import { Dish } from '../types';
import { DishCard } from './DishCard';

interface MenuGridProps {
  dishes: Dish[];
  onCustomize: (dish: Dish) => void;
  onQuickAdd: (dish: Dish) => void;
}

export const MenuGrid: React.FC<MenuGridProps> = ({ dishes, onCustomize, onQuickAdd }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedDietary, setSelectedDietary] = useState<string>('ALL');

  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      const matchesSearch =
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCuisine = selectedCuisine === 'ALL' || dish.cuisine === selectedCuisine;
      const matchesCategory = selectedCategory === 'ALL' || dish.category === selectedCategory;
      const matchesDietary = selectedDietary === 'ALL' || dish.dietary === selectedDietary;

      return matchesSearch && matchesCuisine && matchesCategory && matchesDietary;
    });
  }, [dishes, searchQuery, selectedCuisine, selectedCategory, selectedDietary]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      
      {/* FILTER BAR & CONTROLS */}
      <div className="space-y-4 mb-8">
        
        {/* SEARCH & TITLE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Everyday Indian Staple Menu
              <span className="text-xs bg-slate-800 text-emerald-400 border border-slate-700 px-2 py-0.5 rounded-full font-bold">
                {dishes.length} Items Max
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Optimized for everyday home consumption. Customize macros, carbs & protein portions live.
            </p>
          </div>

          {/* SEARCH INPUT */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search dishes, dal, paneer, chicken..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        {/* PILL FILTERS */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/60">
          
          {/* CUISINE FILTER */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Cuisine:
            </span>
            {['ALL', 'North Indian', 'South Indian', 'West Indian', 'East Indian'].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCuisine(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCuisine === c
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {c === 'ALL' ? 'All Cuisines' : c}
              </button>
            ))}
          </div>

          {/* MACRO FOCUS & DIETARY FILTERS */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* MACRO FOCUS */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {['ALL', 'High Protein', 'Low Carb', 'Balanced'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedCategory === cat
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {cat === 'ALL' ? 'All Macros' : cat}
                </button>
              ))}
            </div>

            {/* DIETARY */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              {['ALL', 'Veg', 'Non-Veg', 'Vegan'].map((diet) => (
                <button
                  key={diet}
                  onClick={() => setSelectedDietary(diet)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                    selectedDietary === diet
                      ? 'bg-slate-700 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {diet === 'ALL' ? 'All Diet' : diet}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* DISHES GRID */}
      {filteredDishes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onCustomize={onCustomize}
              onQuickAdd={onQuickAdd}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800/60">
          <Sparkles className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-300">No dishes match your selected filters</h3>
          <p className="text-xs text-slate-500 mt-1">Try clearing your search query or expanding your filter parameters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCuisine('ALL');
              setSelectedCategory('ALL');
              setSelectedDietary('ALL');
            }}
            className="mt-4 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold hover:bg-emerald-500/20 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
