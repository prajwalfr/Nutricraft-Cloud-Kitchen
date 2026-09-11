import React, { useState, useMemo } from 'react';
import { X, Calendar, Clock, Check, AlertCircle, ShieldCheck } from 'lucide-react';

interface SubscriptionPlannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const SubscriptionPlannerModal: React.FC<SubscriptionPlannerModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  if (!isOpen) return null;

  const [userName, setUserName] = useState('Ananya Verma');
  const [userPhone, setUserPhone] = useState('+91 99001 12233');
  const [userAddress, setUserAddress] = useState('Tower B-1104, Prestige Lakeside, Indiranagar, Bengaluru');

  const [planType, setPlanType] = useState<'1x_MEAL_DAILY' | '2x_MEAL_DAILY'>('1x_MEAL_DAILY');
  const [activeDays, setActiveDays] = useState<'MON_FRI' | 'MON_SAT' | 'ALL_DAYS'>('MON_FRI');
  const [deliverySlot, setDeliverySlot] = useState('12:30 PM - 01:30 PM (Lunch)');

  // Calendar dates generation (next 30 days)
  const today = new Date();
  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      days.push({
        dateStr: d.toISOString().split('T')[0],
        dayNum: d.getDate(),
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        monthName: d.toLocaleDateString('en-US', { month: 'short' })
      });
    }
    return days;
  }, []);

  const [pausedDates, setPausedDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const togglePauseDate = (dateStr: string) => {
    if (pausedDates.includes(dateStr)) {
      setPausedDates(pausedDates.filter((d) => d !== dateStr));
    } else {
      setPausedDates([...pausedDates, dateStr]);
    }
  };

  // Base per meal cost = ₹250
  const totalPossibleDays = activeDays === 'MON_FRI' ? 22 : activeDays === 'MON_SAT' ? 26 : 30;
  const activeDeliveriesCount = Math.max(0, totalPossibleDays - pausedDates.length);

  const mealsPerDay = planType === '1x_MEAL_DAILY' ? 1 : 2;
  const baseTotal = activeDeliveriesCount * mealsPerDay * 250;
  const discountedPrice = Math.round(baseTotal * 0.85); // 15% discount for monthly subscription

  const handleConfirm = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* HEADER */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Flexible Monthly Subscription Planner</h2>
              <p className="text-xs text-slate-400">Save 15% on daily meals with pause/skip date control.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center border border-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* USER CONTACT DETAILS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase">Full Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase">Phone Number</label>
              <input
                type="text"
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-400 uppercase">Delivery Slot</label>
              <select
                value={deliverySlot}
                onChange={(e) => setDeliverySlot(e.target.value)}
                className="mt-1 w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option>12:30 PM - 01:30 PM (Lunch)</option>
                <option>07:30 PM - 08:30 PM (Dinner)</option>
              </select>
            </div>
          </div>

          {/* PLAN FREQUENCY & DAYS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* PLAN TYPE */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2 block">
                Daily Meal Frequency
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPlanType('1x_MEAL_DAILY')}
                  className={`p-3 rounded-xl text-left border text-xs transition-all ${
                    planType === '1x_MEAL_DAILY'
                      ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-extrabold text-sm">1x Meal / Day</div>
                  <div className="text-[10px] text-slate-400 mt-1">Lunch OR Dinner</div>
                </button>

                <button
                  type="button"
                  onClick={() => setPlanType('2x_MEAL_DAILY')}
                  className={`p-3 rounded-xl text-left border text-xs transition-all ${
                    planType === '2x_MEAL_DAILY'
                      ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="font-extrabold text-sm">2x Meals / Day</div>
                  <div className="text-[10px] text-slate-400 mt-1">Lunch AND Dinner</div>
                </button>
              </div>
            </div>

            {/* ACTIVE DAYS */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2 block">
                Weekly Delivery Schedule
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'MON_FRI', label: 'Mon - Fri', desc: '22 Days' },
                  { key: 'MON_SAT', label: 'Mon - Sat', desc: '26 Days' },
                  { key: 'ALL_DAYS', label: 'All Days', desc: '30 Days' }
                ].map((d) => (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() => setActiveDays(d.key as any)}
                    className={`p-2.5 rounded-xl text-center border text-xs transition-all ${
                      activeDays === d.key
                        ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="font-bold">{d.label}</div>
                    <div className="text-[10px] text-slate-400">{d.desc}</div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* INTERACTIVE CALENDAR FOR PAUSING / SKIPPING DATES */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" /> Interactive Pause Calendar (Next 30 Days)
              </label>
              <span className="text-[11px] text-slate-400">
                Click any date to toggle <span className="text-rose-400 font-bold">Skip/Pause</span>
              </span>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
              {calendarDays.map((day) => {
                const isPaused = pausedDates.includes(day.dateStr);
                return (
                  <button
                    key={day.dateStr}
                    type="button"
                    onClick={() => togglePauseDate(day.dateStr)}
                    className={`p-2 rounded-lg border text-center text-xs transition-all flex flex-col items-center justify-center ${
                      isPaused
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300 line-through opacity-80'
                        : 'bg-slate-900 border-emerald-500/40 text-white hover:border-emerald-500'
                    }`}
                  >
                    <span className="text-[9px] text-slate-400">{day.dayName}</span>
                    <span className="font-bold text-sm">{day.dayNum}</span>
                    <span className="text-[9px] text-slate-500">{day.monthName}</span>
                  </button>
                );
              })}
            </div>
            
            {pausedDates.length > 0 && (
              <div className="mt-2 text-xs text-amber-400 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{pausedDates.length} days paused. Bill adjusted automatically!</span>
              </div>
            )}
          </div>

          {/* SUBSCRIPTION SUMMARY */}
          <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              <div>
                <div className="text-sm font-bold text-white">Monthly Subscriber Pass (15% Off Applied)</div>
                <div className="text-xs text-slate-400">
                  {activeDeliveriesCount} active delivery days x {mealsPerDay} meal(s) / day
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs text-slate-400 line-through">₹{baseTotal}</span>
              <div className="text-2xl font-black text-emerald-400">₹{discountedPrice}</div>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 text-xs font-bold"
          >
            Cancel
          </button>

          <button
            disabled={loading || activeDeliveriesCount === 0}
            onClick={handleConfirm}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 hover:from-emerald-500 hover:to-emerald-400 transition-all disabled:opacity-40"
          >
            {loading ? 'Activating Plan...' : `Activate Subscription (₹${discountedPrice}/mo)`}
          </button>
        </div>

      </div>
    </div>
  );
};
