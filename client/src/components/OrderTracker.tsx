import React, { useEffect, useState } from 'react';
import { Radio, Clock, CheckCircle2, Bike, ChefHat, Package, MapPin, Flame, Dumbbell, ArrowLeft } from 'lucide-react';
import { Order } from '../types';
import { MOCK_ORDERS } from '../services/mockData';

interface OrderTrackerProps {
  currentOrderId: string | null;
  onBackToMenu: () => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ currentOrderId, onBackToMenu }) => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(MOCK_ORDERS[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentOrderId) {
      const match = orders.find((o) => o.id === currentOrderId);
      if (match) {
        setSelectedOrder(match);
      } else {
        // If it was just created via mock cart
        const newMockOrder: Order = {
          id: currentOrderId,
          orderNumber: `NC-${Math.floor(1000 + Math.random() * 9000)}`,
          customerName: 'Prajwal (You)',
          customerPhone: '+91 98765 43210',
          address: 'Indiranagar 100ft Road, Bengaluru',
          deliverySlot: '12:30 PM - 01:30 PM',
          totalPrice: 420,
          totalCalories: 560,
          totalProtein: 42,
          totalCarbs: 45,
          totalFats: 16,
          status: 'PREPARING',
          isSubscriptionDelivery: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          items: [
            {
              id: 'item-1',
              dishId: 'd2',
              dishName: 'Tandoori Chicken Breast & Mint Salad',
              quantity: 1,
              price: 320,
              calories: 420,
              protein: 48,
              carbs: 12,
              fats: 14,
              customizationSummary: '{"carbBase":"Brown Basmati Rice","extraProtein":"+50g Chicken","oilGhee":"Low Oil"}'
            }
          ]
        };
        setOrders((prev) => [newMockOrder, ...prev]);
        setSelectedOrder(newMockOrder);
      }
    } else if (orders.length > 0) {
      setSelectedOrder(orders[0]);
    }
  }, [currentOrderId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400">
        <Radio className="w-8 h-8 animate-spin mx-auto text-emerald-400 mb-2" />
        <p className="font-bold">Connecting to Live Kitchen Tracking Engine...</p>
      </div>
    );
  }

  if (!selectedOrder) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400">
        <Package className="w-12 h-12 mx-auto text-slate-600 mb-3" />
        <h3 className="text-xl font-bold text-white">No Active Orders Found</h3>
        <p className="text-xs text-slate-500 mt-1">Place a macro-customized meal from the menu to start live tracking.</p>
        <button
          onClick={onBackToMenu}
          className="mt-4 px-6 py-2.5 bg-emerald-500 text-slate-950 rounded-xl font-black text-xs"
        >
          Explore Menu
        </button>
      </div>
    );
  }

  // 4 STAGES
  const stages = [
    { key: 'PLACED', label: 'Order Placed', icon: Package, desc: 'Kitchen received order details' },
    { key: 'PREPARING', label: 'In Kitchen', icon: ChefHat, desc: 'Chef assembling customized macros' },
    { key: 'DISPATCHED', label: 'Out for Delivery', icon: Bike, desc: 'Rider en route with hot meal' },
    { key: 'DELIVERED', label: 'Delivered', icon: CheckCircle2, desc: 'Enjoy your fresh healthy meal!' }
  ];

  const currentStageIndex = stages.findIndex((s) => s.key === selectedOrder.status);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      
      {/* NAVIGATION BACK */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBackToMenu}
          className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Menu
        </button>

        {/* ORDER SELECTOR IF MULTIPLE ORDERS */}
        {orders.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-slate-500 font-bold">Recent Orders:</span>
            {orders.slice(0, 4).map((o) => (
              <button
                key={o.id}
                onClick={() => setSelectedOrder(o)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                  selectedOrder.id === o.id
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {o.orderNumber} ({o.status})
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT 2 COLS: LIVE PROGRESS & DRIVER SIMULATION */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* LIVE TRACKING HEADER CARD */}
          <div className="glass-card p-6 rounded-2xl space-y-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-500/10 text-emerald-400 text-xs font-black px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                    REAL-TIME TRACKING
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ID: {selectedOrder.orderNumber}</span>
                </div>
                <h2 className="text-2xl font-black text-white mt-1">Live Order Status</h2>
              </div>

              <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800">
                <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                <div>
                  <div className="text-[10px] text-slate-400 font-bold">ESTIMATED ARRIVAL</div>
                  <div className="text-xs font-black text-amber-400">
                    {selectedOrder.status === 'DELIVERED' ? 'Delivered Just Now' : '22 - 28 Minutes'}
                  </div>
                </div>
              </div>
            </div>

            {/* 4 STAGE PROGRESS BAR */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative">
              {stages.map((stage, idx) => {
                const Icon = stage.icon;
                const isCompleted = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div
                    key={stage.key}
                    className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center relative ${
                      isCurrent
                        ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
                        : isCompleted
                        ? 'bg-slate-900/90 border-slate-800 text-emerald-400'
                        : 'bg-slate-950/40 border-slate-900 text-slate-600'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        isCurrent
                          ? 'bg-emerald-500 text-slate-950 animate-bounce'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-slate-900 text-slate-600'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-xs font-black">{stage.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">{stage.desc}</div>
                  </div>
                );
              })}
            </div>

            {/* ANIMATED DRIVER GPS SIMULATION VECTOR CANVAS */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-400 font-bold mb-2">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Bike className="w-4 h-4" /> Live Driver Route Tracking
                </span>
                <span>Dispatch Slot: {selectedOrder.deliverySlot}</span>
              </div>

              {/* SIMULATED MAP VECTOR GRAPHIC */}
              <div className="h-36 bg-slate-900 rounded-lg relative flex items-center justify-between px-8 overflow-hidden border border-slate-800">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* KITCHEN PIN */}
                <div className="z-10 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                    <ChefHat className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 mt-1">NutriCraft Hub</span>
                </div>

                {/* ANIMATED ROUTE PATH LINE */}
                <div className="flex-1 mx-4 h-1 bg-slate-800 relative rounded-full overflow-hidden">
                  <div
                    style={{
                      width:
                        selectedOrder.status === 'PLACED'
                          ? '15%'
                          : selectedOrder.status === 'PREPARING'
                          ? '45%'
                          : selectedOrder.status === 'DISPATCHED'
                          ? '80%'
                          : '100%'
                    }}
                    className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-1000"
                  />
                </div>

                {/* RIDER MOVING ICON */}
                <div
                  style={{
                    left:
                      selectedOrder.status === 'PLACED'
                        ? '20%'
                        : selectedOrder.status === 'PREPARING'
                        ? '48%'
                        : selectedOrder.status === 'DISPATCHED'
                        ? '78%'
                        : '92%'
                  }}
                  className="absolute z-20 transition-all duration-1000 transform -translate-x-1/2 flex flex-col items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/40 animate-pulse">
                    <Bike className="w-4 h-4" />
                  </div>
                  <span className="text-[9px] font-extrabold text-amber-400 mt-0.5 bg-slate-950/90 px-1.5 py-0.2 rounded border border-amber-500/30">
                    Rider En Route
                  </span>
                </div>

                {/* CUSTOMER PIN */}
                <div className="z-10 flex flex-col items-center">
                  <div className="w-9 h-9 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/40">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 mt-1">Your Address</span>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* RIGHT COL: ORDER RECEIPT & MACRO RECAP */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-slate-800 pb-3">
              Order Receipt & Macro Recap
            </h3>

            {/* CUSTOMER DETAILS */}
            <div className="text-xs space-y-1.5 bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-400">Customer:</span>
                <span className="font-bold text-white">{selectedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="font-bold text-white">{selectedOrder.customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Address:</span>
                <span className="font-bold text-slate-300 text-right max-w-[180px] line-clamp-2">{selectedOrder.address}</span>
              </div>
            </div>

            {/* ORDER ITEMS LIST */}
            <div className="space-y-3">
              {selectedOrder.items.map((item) => {
                let customObj: any = {};
                try {
                  customObj = JSON.parse(item.customizationSummary || '{}');
                } catch (e) {}

                return (
                  <div key={item.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between text-xs font-bold text-white">
                      <span>{item.dishName} x{item.quantity}</span>
                      <span className="text-emerald-400">₹{item.price * item.quantity}</span>
                    </div>

                    {/* CUSTOMIZATIONS */}
                    <div className="flex flex-wrap gap-1 text-[10px] text-slate-400">
                      {customObj.carbBase && <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">🌾 {customObj.carbBase}</span>}
                      {customObj.extraProtein && <span className="bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">💪 {customObj.extraProtein}</span>}
                      {customObj.oilGhee && <span className="bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded border border-amber-500/20">✨ {customObj.oilGhee}</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* TOTAL MACROS SUMMARY */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 grid grid-cols-4 gap-1 text-center">
              <div>
                <div className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-0.5">
                  <Flame className="w-2.5 h-2.5 text-amber-400" /> Cals
                </div>
                <div className="text-xs font-extrabold text-white mt-0.5">{selectedOrder.totalCalories}</div>
              </div>
              <div>
                <div className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-0.5">
                  <Dumbbell className="w-2.5 h-2.5 text-emerald-400" /> Prot
                </div>
                <div className="text-xs font-extrabold text-emerald-400 mt-0.5">{selectedOrder.totalProtein}g</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold">Carbs</div>
                <div className="text-xs font-extrabold text-sky-400 mt-0.5">{selectedOrder.totalCarbs}g</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-bold">Fats</div>
                <div className="text-xs font-extrabold text-amber-400 mt-0.5">{selectedOrder.totalFats}g</div>
              </div>
            </div>

            {/* TOTAL PAID */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">Total Amount Paid</span>
              <span className="text-xl font-black text-emerald-400">₹{selectedOrder.totalPrice}</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
