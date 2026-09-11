import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { StatsBanner } from './components/StatsBanner';
import { MenuGrid } from './components/MenuGrid';
import { DishCard } from './components/DishCard';
import { MealBuilderModal } from './components/MealBuilderModal';
import { SubscriptionPlannerModal } from './components/SubscriptionPlannerModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTracker } from './components/OrderTracker';
import { KitchenDashboard } from './components/KitchenDashboard';
import { Dish, CustomizationOption, CartItem, SelectedCustomizations, Order } from './types';
import { api } from './services/api';
import { socket } from './services/socket';
import { calculateMealMacros } from './utils/macroCalculator';

export function App() {
  const [activeTab, setActiveTab] = useState<'menu' | 'tracker' | 'kitchen'>('menu');
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [customizationOptions, setCustomizationOptions] = useState<CustomizationOption[]>([]);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [customizingDish, setCustomizingDish] = useState<Dish | null>(null);

  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [activeOrdersCount, setActiveOrdersCount] = useState<number>(0);

  // Initial load
  useEffect(() => {
    api.getDishes().then(setDishes).catch(console.error);
    api.getCustomizationOptions().then(setCustomizationOptions).catch(console.error);
    api.getOrders().then((orders) => {
      const active = orders.filter((o) => o.status !== 'DELIVERED').length;
      setActiveOrdersCount(active);
    }).catch(console.error);

    // Socket listeners for menu stock updates and active order counts
    const handleDishUpdated = (updatedDish: Dish) => {
      setDishes((prev) => prev.map((d) => (d.id === updatedDish.id ? updatedDish : d)));
    };

    const handleOrderCreated = () => {
      setActiveOrdersCount((prev) => prev + 1);
    };

    const handleOrderUpdated = (order: Order) => {
      api.getOrders().then((orders) => {
        const active = orders.filter((o) => o.status !== 'DELIVERED').length;
        setActiveOrdersCount(active);
      }).catch(console.error);
    };

    socket.on('dish:updated', handleDishUpdated);
    socket.on('order:created', handleOrderCreated);
    socket.on('order:updated', handleOrderUpdated);

    return () => {
      socket.off('dish:updated', handleDishUpdated);
      socket.off('order:created', handleOrderCreated);
      socket.off('order:updated', handleOrderUpdated);
    };
  }, []);

  const handleOpenCustomizeModal = (dish: Dish) => {
    setCustomizingDish(dish);
  };

  const handleQuickAdd = (dish: Dish) => {
    // Default customizations
    const defaultCarb = customizationOptions.find((o) => o.category === 'BASE_CARB') || {
      id: 'default-carb',
      category: 'BASE_CARB' as const,
      optionName: 'Brown Basmati Rice (150g)',
      extraPrice: 0,
      extraCalories: 0,
      extraProtein: 0,
      extraCarbs: 0,
      extraFats: 0
    };
    const defaultProt = customizationOptions.find((o) => o.category === 'EXTRA_PROTEIN') || {
      id: 'default-prot',
      category: 'EXTRA_PROTEIN' as const,
      optionName: 'No Extra Protein',
      extraPrice: 0,
      extraCalories: 0,
      extraProtein: 0,
      extraCarbs: 0,
      extraFats: 0
    };
    const defaultOil = customizationOptions.find((o) => o.category === 'OIL_GHEE') || {
      id: 'default-oil',
      category: 'OIL_GHEE' as const,
      optionName: 'Standard A2 Ghee (1 tsp)',
      extraPrice: 0,
      extraCalories: 0,
      extraProtein: 0,
      extraCarbs: 0,
      extraFats: 0
    };

    const selected = { carbBase: defaultCarb, extraProtein: defaultProt, oilGhee: defaultOil };
    const calculated = calculateMealMacros(dish, selected);

    handleAddToCart(dish, selected, calculated);
  };

  const handleAddToCart = (
    dish: Dish,
    customizations: SelectedCustomizations,
    calculated: ReturnType<typeof calculateMealMacros>
  ) => {
    const newItem: CartItem = {
      id: `${dish.id}-${Date.now()}`,
      dish,
      customizations,
      calculatedPrice: calculated.totalPrice,
      calculatedCalories: calculated.totalCalories,
      calculatedProtein: calculated.totalProtein,
      calculatedCarbs: calculated.totalCarbs,
      calculatedFats: calculated.totalFats,
      quantity: 1
    };

    setCart((prev) => [...prev, newItem]);
    setIsCartOpen(true);
  };

  const handleOrderPlaced = (orderId: string) => {
    setCurrentOrderId(orderId);
    setActiveTab('tracker');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* HEADER */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSubscription={() => setIsSubscriptionOpen(true)}
        activeOrderCount={activeOrdersCount}
      />

      {/* STATS BANNER ON MENU TAB */}
      {activeTab === 'menu' && <StatsBanner />}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1">
        {activeTab === 'menu' && (
          <MenuGrid
            dishes={dishes}
            onCustomize={handleOpenCustomizeModal}
            onQuickAdd={handleQuickAdd}
          />
        )}

        {activeTab === 'tracker' && (
          <OrderTracker
            currentOrderId={currentOrderId}
            onBackToMenu={() => setActiveTab('menu')}
          />
        )}

        {activeTab === 'kitchen' && <KitchenDashboard />}
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-300">NutriCraft Platform</span>
            <span>- Health-Focused Indian Cloud Kitchen Engine</span>
          </div>
          <div>Powered by Node.js, Express, Socket.io Real-Time WebSockets & React</div>
        </div>
      </footer>

      {/* MODALS & DRAWERS */}
      <MealBuilderModal
        dish={customizingDish}
        customizationOptions={customizationOptions}
        onClose={() => setCustomizingDish(null)}
        onAddToCart={handleAddToCart}
      />

      <SubscriptionPlannerModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
        onSuccess={() => setActiveTab('tracker')}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
        onOrderPlaced={handleOrderPlaced}
      />

    </div>
  );
}
