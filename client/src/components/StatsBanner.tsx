import React from 'react';
import { Flame, Dumbbell, Calendar, Zap } from 'lucide-react';

export const StatsBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-amber-950/40 border-y border-slate-800/80 py-6 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">30 Staples</div>
            <div className="text-xs text-slate-400">Curated Everyday Indian Meals</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">Macro Tweaks</div>
            <div className="text-xs text-slate-400">Custom Carbs, Protein & Ghee</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">Flexible Plans</div>
            <div className="text-xs text-slate-400">Pause / Skip Days Any Time</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/60">
          <div className="w-10 h-10 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">Live Engine</div>
            <div className="text-xs text-slate-400">Real-Time Kitchen Sync</div>
          </div>
        </div>

      </div>
    </div>
  );
};
