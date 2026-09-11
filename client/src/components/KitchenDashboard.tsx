import React, { useEffect, useState } from 'react';
import { LayoutDashboard, ChefHat, Bike, CheckCircle2, AlertTriangle, ShieldCheck, Flame, Dumbbell, Radio, BarChart3, ToggleLeft, ToggleRight, Sparkles, PackageCheck, IndianRupee } from 'lucide-react';
import { Order, Dish, PrepForecast, Ingredient } from '../types';
import { api } from '../services/api';
import { socket } from '../services/socket';

export const KitchenDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kanban' | 'menu' | 'forecast' | 'inventory'>('kanban');
  const [orders, setOrders] = useState<Order[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [forecast, setForecast] = useState<PrepForecast | null>(null);
  const [inventory, setInventory] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  const fetchData = async () => {
    try {
      const [orderList, dishList, prepData, invData] = await Promise.all([
        api.getOrders(),
        api.getDishes(),
        api.getPrepForecast(),
        api.getInventory().catch(() => [])
      ]);
      setOrders(orderList);
      setDishes(dishList);
      setForecast(prepData);
      setInventory(invData);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Socket.io Real-time Event Listeners
    const handleNewOrder = (newOrder: Order) => {
      setOrders((prev) => [newOrder, ...prev]);
      api.getPrepForecast().then(setForecast).catch(console.error);
      api.getInventory().then(setInventory).catch(console.error);
    };

    const handleOrderUpdated = (updatedOrder: Order) => {
      setOrders((prev) => prev.map((o) => (o.id === updatedOrder.id ? updatedOrder : o)));
      api.getPrepForecast().then(setForecast).catch(console.error);
    };

    const handleDishUpdated = (updatedDish: Dish) => {
      setDishes((prev) => prev.map((d) => (d.id === updatedDish.id ? updatedDish : d)));
    };

    const handleInventoryUpdated = (updatedInventory: Ingredient[] | Ingredient) => {
      if (Array.isArray(updatedInventory)) {
        setInventory(updatedInventory);
      } else {
        setInventory((prev) => prev.map((i) => (i.id === updatedInventory.id ? updatedInventory : i)));
      }
    };

    socket.on('order:created', handleNewOrder);
    socket.on('order:updated', handleOrderUpdated);
    socket.on('dish:updated', handleDishUpdated);
    socket.on('inventory:updated', handleInventoryUpdated);

    return () => {
      socket.off('order:created', handleNewOrder);
      socket.off('order:updated', handleOrderUpdated);
      socket.off('dish:updated', handleDishUpdated);
      socket.off('inventory:updated', handleInventoryUpdated);
    };
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestock = async (ingredientId: string, addedQty: number) => {
    try {
      await api.restockIngredient(ingredientId, addedQty);
      const invData = await api.getInventory();
      setInventory(invData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStock = async (dishId: string) => {
    try {
      await api.toggleDishStock(dishId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400">
        <Radio className="w-8 h-8 animate-spin mx-auto text-amber-400 mb-2" />
        <p className="font-bold">Loading Live Kitchen Management Board...</p>
      </div>
    );
  }

  // Kanban Columns
  const columns = [
    { key: 'PLACED', title: 'Placed (New)', color: 'border-sky-500', badge: 'bg-sky-500/20 text-sky-400', icon: LayoutDashboard },
    { key: 'PREPARING', title: 'In Kitchen (Cooking)', color: 'border-amber-500', badge: 'bg-amber-500/20 text-amber-400', icon: ChefHat },
    { key: 'DISPATCHED', title: 'Dispatched (Out)', color: 'border-purple-500', badge: 'bg-purple-500/20 text-purple-400', icon: Bike },
    { key: 'DELIVERED', title: 'Delivered (Done)', color: 'border-emerald-500', badge: 'bg-emerald-500/20 text-emerald-400', icon: CheckCircle2 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
      
      {/* HEADER & SUB-TABS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white">Kitchen Operations Command Center</h1>
            <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs px-2.5 py-0.5 rounded-full font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Live Sync Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time Order Processing, Inventory Management & Prep Analytics
          </p>
        </div>

        {/* SUB-TABS NAVIGATION */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('kanban')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'kanban' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Order Queue ({orders.filter(o => o.status !== 'DELIVERED').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'inventory' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Raw Inventory</span>
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'menu' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Dish Availability</span>
          </button>

          <button
            onClick={() => setActiveTab('forecast')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'forecast' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Prep Analytics</span>
          </button>
        </div>
      </div>

      {/* TAB 1: KANBAN BOARD */}
      {activeTab === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const ColumnIcon = col.icon;
            const columnOrders = orders.filter((o) => o.status === col.key);

            return (
              <div key={col.key} className="bg-slate-950/80 rounded-2xl p-4 flex flex-col h-[680px] border border-slate-800">
                {/* COLUMN HEADER */}
                <div className={`pb-3 mb-3 border-b-2 ${col.color} flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <ColumnIcon className="w-4 h-4 text-slate-300" />
                    <h3 className="text-xs font-black uppercase text-white tracking-wider">{col.title}</h3>
                  </div>
                  <span className={`text-[11px] font-extrabold px-2 py-0.5 rounded-md ${col.badge}`}>
                    {columnOrders.length}
                  </span>
                </div>

                {/* ORDER CARDS LIST */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                  {columnOrders.length === 0 ? (
                    <div className="h-40 flex items-center justify-center text-xs text-slate-500 italic">
                      No orders in {col.title}
                    </div>
                  ) : (
                    columnOrders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-slate-900 p-3.5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all space-y-3 shadow-md"
                      >
                        {/* ORDER HEADER */}
                        <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                          <div>
                            <span className="text-xs font-black text-emerald-400">{order.orderNumber}</span>
                            {order.isSubscriptionDelivery && (
                              <span className="ml-1.5 text-[9px] bg-amber-500/20 text-amber-300 font-extrabold px-1.5 py-0.5 rounded">
                                SUB
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold">{order.deliverySlot}</span>
                        </div>

                        {/* CUSTOMER DETAILS */}
                        <div>
                          <div className="text-xs font-bold text-white line-clamp-1">{order.customerName}</div>
                          <div className="text-[10px] text-slate-400 line-clamp-1">{order.address}</div>
                        </div>

                        {/* ITEMS LIST */}
                        <div className="space-y-1.5 bg-slate-950 p-2 rounded-lg border border-slate-800/40 text-[11px]">
                          {order.items.map((item) => {
                            const custom = JSON.parse(item.customizationSummary || '{}');
                            return (
                              <div key={item.id} className="text-slate-300">
                                <div className="flex justify-between font-bold">
                                  <span>{item.quantity}x {item.dishName}</span>
                                  <span className="text-slate-400">₹{item.price * item.quantity}</span>
                                </div>
                                {(custom.carbBase || custom.extraProtein) && (
                                  <div className="text-[9px] text-slate-400 font-sans mt-0.5 pl-1.5 border-l border-emerald-500/40">
                                    {custom.carbBase && <div>• {custom.carbBase}</div>}
                                    {custom.extraProtein && <div>• {custom.extraProtein}</div>}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        {/* MACRO TOTAL & PRICE */}
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                          <div>
                            <span className="text-emerald-400 font-bold">{order.totalProtein}g P</span> |{' '}
                            <span>{order.totalCalories} cals</span>
                          </div>
                          <div className="text-xs font-extrabold text-white">₹{order.totalPrice}</div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div className="pt-2 border-t border-slate-800/60 flex items-center gap-1.5">
                          {col.key === 'PLACED' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'PREPARING')}
                              className="w-full py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                            >
                              <ChefHat className="w-3.5 h-3.5" /> Start Cooking
                            </button>
                          )}

                          {col.key === 'PREPARING' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'DISPATCHED')}
                              className="w-full py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                            >
                              <Bike className="w-3.5 h-3.5" /> Dispatch Rider
                            </button>
                          )}

                          {col.key === 'DISPATCHED' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'DELIVERED')}
                              className="w-full py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" /> Mark Delivered
                            </button>
                          )}

                          {col.key === 'DELIVERED' && (
                            <div className="w-full text-center text-[10px] text-emerald-400 font-bold py-1 bg-emerald-500/10 rounded-lg">
                              ✓ Completed
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: RAW INVENTORY MANAGEMENT */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-black text-white">Kitchen Raw Ingredient Inventory</h3>
                <p className="text-xs text-slate-400">
                  Real-time stock deduction per order & instant restock controls
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-rose-500/20 text-rose-300 border border-rose-500/30 px-3 py-1 rounded-lg font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Low Stock Alerts: {inventory.filter(i => i.currentStock <= i.minimumThreshold).length}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inventory.map((ing) => {
                const isLow = ing.currentStock <= ing.minimumThreshold;
                return (
                  <div
                    key={ing.id}
                    className={`p-4 rounded-xl border flex flex-col justify-between space-y-4 transition-all ${
                      isLow ? 'bg-rose-950/20 border-rose-500/50' : 'bg-slate-900/90 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">{ing.name}</h4>
                        {isLow && (
                          <span className="text-[10px] bg-rose-500 text-slate-950 font-extrabold px-2 py-0.5 rounded uppercase">
                            Low Stock
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-baseline justify-between">
                        <div className="text-2xl font-black text-emerald-400">
                          {Math.round(ing.currentStock * 10) / 10} <span className="text-xs font-normal text-slate-400">{ing.unit}</span>
                        </div>
                        <div className="text-xs text-slate-400">Min Threshold: {ing.minimumThreshold} {ing.unit}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 border-t border-slate-800/80 pt-3">
                      <button
                        onClick={() => handleRestock(ing.id, ing.unit === 'units' ? 50 : 10)}
                        className="flex-1 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 rounded-lg text-xs font-bold transition-colors"
                      >
                        + Restock {ing.unit === 'units' ? '50 Units' : '10 Kg'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DISH AVAILABILITY MANAGEMENT */}
      {activeTab === 'menu' && (
        <div className="space-y-6">
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-black text-white">Live Menu Availability Toggle</h3>
              <p className="text-xs text-slate-400">
                Mark dishes as Out of Stock in real-time. Changes are instantly broadcast to all connected customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                    dish.isAvailable
                      ? 'bg-slate-900/90 border-slate-800'
                      : 'bg-rose-950/20 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={dish.imageUrl} alt={dish.name} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <h4 className="text-xs font-bold text-white line-clamp-1">{dish.name}</h4>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        {dish.cuisine} | {dish.category} | ₹{dish.basePrice}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleStock(dish.id)}
                    className={`p-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      dish.isAvailable
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-emerald-500/20 hover:text-emerald-400'
                    }`}
                  >
                    {dish.isAvailable ? (
                      <>
                        <ToggleRight className="w-5 h-5 text-emerald-400" /> In Stock
                      </>
                    ) : (
                      <>
                        <ToggleLeft className="w-5 h-5 text-rose-400" /> Out of Stock
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: DAILY PREP FORECAST & REVENUE ANALYTICS */}
      {activeTab === 'forecast' && forecast && (
        <div className="space-y-6">
          <div className="bg-slate-950/80 p-6 rounded-2xl border border-slate-800 space-y-6">
            <div>
              <h3 className="text-lg font-black text-white">Daily Prep & Revenue Forecast</h3>
              <p className="text-xs text-slate-400">
                Automated calculation of raw ingredients (kg / units) required for today based on active subscriptions and open orders.
              </p>
            </div>

            {/* PREP STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 font-bold flex items-center gap-1">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-400" /> Total Revenue
                </div>
                <div className="text-2xl font-black text-emerald-400 mt-1">₹{forecast.totalRevenue || 760}</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 font-bold">Active Subscriptions</div>
                <div className="text-2xl font-black text-amber-400 mt-1">{forecast.activeSubscriptionsCount} Users</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 font-bold">Open On-Demand Orders</div>
                <div className="text-2xl font-black text-purple-400 mt-1">{forecast.openOrdersCount} Orders</div>
              </div>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="text-xs text-slate-400 font-bold">Estimated Meals Today</div>
                <div className="text-2xl font-black text-sky-400 mt-1">{forecast.estimatedMealsToday} Meals</div>
              </div>
            </div>

            {/* INGREDIENT BREAKDOWN TABLE */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
              <div className="p-4 border-b border-slate-800 font-bold text-xs text-white uppercase tracking-wider">
                Raw Material Requirements For Today's Prep
              </div>

              <div className="divide-y divide-slate-800 text-xs">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Dumbbell className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-bold text-white">Lean Chicken Breast</div>
                      <div className="text-[10px] text-slate-400">For Tandoori, Chettinad, Kadai & Kolhapuri dishes</div>
                    </div>
                  </div>
                  <div className="text-base font-black text-emerald-400">{forecast.ingredientBreakdown.chickenKg} kg</div>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="font-bold text-white">Fresh Malai Paneer</div>
                      <div className="text-[10px] text-slate-400">For Palak Paneer, Paneer Bhurji & Chana Paneer</div>
                    </div>
                  </div>
                  <div className="text-base font-black text-amber-400">{forecast.ingredientBreakdown.paneerKg} kg</div>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Flame className="w-4 h-4 text-sky-400" />
                    <div>
                      <div className="font-bold text-white">High-Fiber Brown Basmati Rice</div>
                      <div className="text-[10px] text-slate-400">Steamed grain bases</div>
                    </div>
                  </div>
                  <div className="text-base font-black text-sky-400">{forecast.ingredientBreakdown.brownRiceKg} kg</div>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ChefHat className="w-4 h-4 text-purple-400" />
                    <div>
                      <div className="font-bold text-white">Organic Quinoa Grain</div>
                      <div className="text-[10px] text-slate-400">Low-GI carb swap bases</div>
                    </div>
                  </div>
                  <div className="text-base font-black text-purple-400">{forecast.ingredientBreakdown.quinoaKg} kg</div>
                </div>

                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="font-bold text-white">Multigrain & Bajra Rotis</div>
                      <div className="text-[10px] text-slate-400">Fresh flatbread prep count</div>
                    </div>
                  </div>
                  <div className="text-base font-black text-emerald-400">{forecast.ingredientBreakdown.multigrainRotisCount} Rotis</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
