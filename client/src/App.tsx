import React, { useState } from 'react';
import { Header } from './components/Header';
import { StatsBanner } from './components/StatsBanner';
import { MenuGrid } from './components/MenuGrid';
import { MealBuilderModal } from './components/MealBuilderModal';
import { SubscriptionPlannerModal } from './components/SubscriptionPlannerModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTracker } from './components/OrderTracker';
import { KitchenDashboard } from './components/KitchenDashboard';
import { Dish, CustomizationOption, CartItem, SelectedCustomizations } from './types';
import { MOCK_DISHES, MOCK_CUSTOMIZATION_OPTIONS, MOCK_ORDERS } from './services/mockData';
import { calculateMealMacros } from './utils/macroCalculator';

export function App() {
  const [activeTab, setActiveTab] = useState<'menu' | 'tracker' | 'kitchen'>('menu');
  const [dishes, setDishes] = useState<Dish[]>(MOCK_DISHES);
  const [customizationOptions] = useState<CustomizationOption[]>(MOCK_CUSTOMIZATION_OPTIONS);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [customizingDish, setCustomizingDish] = useState<Dish | null>(null);

  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [activeOrdersCount, setActiveOrdersCount] = useState<number>(
    MOCK_ORDERS.filter((o) => o.status !== 'DELIVERED').length
  );

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
