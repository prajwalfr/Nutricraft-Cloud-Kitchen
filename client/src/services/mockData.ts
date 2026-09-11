import { Dish, CustomizationOption, Order } from '../types';

// ── 30 Real Dishes (all cuisines) ───────────────────────────────────────────
export const MOCK_DISHES: Dish[] = [
  // NORTH INDIAN
  { id: 'd1', name: 'Palak Paneer & Brown Rice Bowl', description: 'Cottage cheese cubes simmered in fresh spinach puree, served with high-fiber brown basmati rice.', category: 'High Protein', cuisine: 'North Indian', dietary: 'Veg', basePrice: 280, baseCalories: 480, baseProtein: 28, baseCarbs: 45, baseFats: 16, imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd2', name: 'Tandoori Chicken Breast & Mint Salad', description: 'Lean chicken breast marinated in Greek yogurt and spices, charcoal grilled with crisp salad.', category: 'High Protein', cuisine: 'North Indian', dietary: 'Non-Veg', basePrice: 320, baseCalories: 420, baseProtein: 48, baseCarbs: 12, baseFats: 14, imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd3', name: 'Low-Oil Dal Makhani & Multigrain Rotis', description: 'Slow-cooked black lentils prepared with minimal A2 cow ghee and served with 2 multigrain rotis.', category: 'Balanced', cuisine: 'North Indian', dietary: 'Veg', basePrice: 240, baseCalories: 460, baseProtein: 22, baseCarbs: 58, baseFats: 12, imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd4', name: 'Rajma Jammu & Quinoa Meal', description: 'Protein-dense red kidney beans curry cooked with aromatic North Indian spices over quinoa base.', category: 'Balanced', cuisine: 'North Indian', dietary: 'Vegan', basePrice: 260, baseCalories: 440, baseProtein: 20, baseCarbs: 62, baseFats: 8, imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd5', name: 'Kadai Chicken & Brown Rice', description: 'Juicy chicken chunks tossed with bell peppers, tomato gravy, served with steamed brown rice.', category: 'High Protein', cuisine: 'North Indian', dietary: 'Non-Veg', basePrice: 310, baseCalories: 510, baseProtein: 42, baseCarbs: 48, baseFats: 15, imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd6', name: 'Keto Keema Bowl', description: 'Spiced minced chicken cooked in onion-tomato masala, served with cauliflower rice for keto macros.', category: 'Low Carb', cuisine: 'North Indian', dietary: 'Non-Veg', basePrice: 330, baseCalories: 390, baseProtein: 45, baseCarbs: 15, baseFats: 18, imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd7', name: 'Moong Dal Chilla & Mint Chutney', description: 'High-protein green moong dal savory pancakes served with homemade coriander-mint chutney.', category: 'High Protein', cuisine: 'North Indian', dietary: 'Vegan', basePrice: 210, baseCalories: 360, baseProtein: 24, baseCarbs: 38, baseFats: 8, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd8', name: 'Paneer Bhurji & Jowar Roti', description: 'Scrambled cottage cheese with tomatoes, onions and spices served with sorghum flatbread.', category: 'High Protein', cuisine: 'North Indian', dietary: 'Veg', basePrice: 270, baseCalories: 470, baseProtein: 32, baseCarbs: 35, baseFats: 20, imageUrl: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80', isAvailable: false },
  // SOUTH INDIAN
  { id: 'd9', name: 'Pesarattu Protein Dosa & Sambar', description: 'Whole green moong dal crispy crepe rich in plant protein, served with lentil sambar.', category: 'High Protein', cuisine: 'South Indian', dietary: 'Vegan', basePrice: 200, baseCalories: 360, baseProtein: 22, baseCarbs: 48, baseFats: 6, imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd10', name: 'Chettinad Chicken & Red Rice', description: 'Aromatic Chettinad spiced chicken curry with nutmeg and kalpasi spices served with red matta rice.', category: 'High Protein', cuisine: 'South Indian', dietary: 'Non-Veg', basePrice: 330, baseCalories: 500, baseProtein: 44, baseCarbs: 46, baseFats: 16, imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd11', name: 'Kerala Oats Kozhukatta & Coconut Stew', description: 'Steamed oat dumplings served with aromatic coconut milk stew and mixed vegetables.', category: 'Balanced', cuisine: 'South Indian', dietary: 'Vegan', basePrice: 230, baseCalories: 380, baseProtein: 12, baseCarbs: 58, baseFats: 10, imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd12', name: 'Ragi Mudde & Bassaru', description: 'Finger millet balls served with drumstick leaves lentil soup — traditional Karnataka nutrition powerhouse.', category: 'Balanced', cuisine: 'South Indian', dietary: 'Vegan', basePrice: 190, baseCalories: 420, baseProtein: 16, baseCarbs: 72, baseFats: 4, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd13', name: 'Egg White Appam & Veg Stew', description: 'Lace-edged hoppers with enriched egg whites at center, served with coconut milk stew.', category: 'Balanced', cuisine: 'South Indian', dietary: 'Non-Veg', basePrice: 240, baseCalories: 400, baseProtein: 20, baseCarbs: 52, baseFats: 9, imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd14', name: 'Tuna Poriyal & Steamed Rice', description: 'Canned light tuna stir fried with coconut shreds, curry leaves, mustard seeds served with steamed rice.', category: 'High Protein', cuisine: 'South Indian', dietary: 'Non-Veg', basePrice: 310, baseCalories: 430, baseProtein: 38, baseCarbs: 44, baseFats: 10, imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd15', name: 'Avial & Brown Rice Macro Bowl', description: 'Kerala mixed vegetable curry in coconut and yogurt base served with low-GI brown rice.', category: 'Low Carb', cuisine: 'South Indian', dietary: 'Veg', basePrice: 220, baseCalories: 380, baseProtein: 14, baseCarbs: 46, baseFats: 14, imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', isAvailable: false },
  // WEST INDIAN
  { id: 'd16', name: 'Soya Methi Thepla & High Protein Curd', description: '3 fenugreek wheat theplas prepared with soya flour, served with hung curd dip.', category: 'High Protein', cuisine: 'West Indian', dietary: 'Veg', basePrice: 220, baseCalories: 430, baseProtein: 25, baseCarbs: 44, baseFats: 13, imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd17', name: 'Goan Light Coconut Fish Curry & Rice', description: 'Kingfish cooked in light Goan coconut curry, spiced with triphala and tamarind, served with rice.', category: 'High Protein', cuisine: 'West Indian', dietary: 'Non-Veg', basePrice: 360, baseCalories: 470, baseProtein: 37, baseCarbs: 40, baseFats: 15, imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd18', name: 'Sprouted Usal & Protein Quinoa Bowl', description: 'Mixed mothbean sprouts cooked in Maharashtrian spices served over a bowl of steamed quinoa.', category: 'High Protein', cuisine: 'West Indian', dietary: 'Vegan', basePrice: 240, baseCalories: 380, baseProtein: 22, baseCarbs: 52, baseFats: 7, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd19', name: 'Chicken Bhuna & Jowar Rotis', description: 'Dry roasted spicy chicken with caramelized onions served with sorghum flatbreads.', category: 'Low Carb', cuisine: 'West Indian', dietary: 'Non-Veg', basePrice: 320, baseCalories: 460, baseProtein: 46, baseCarbs: 28, baseFats: 16, imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd20', name: 'Methi Poha & Boiled Egg Whites', description: 'Flattened rice sautéed with fresh fenugreek leaves and peanuts, accompanied by 3 egg whites.', category: 'Balanced', cuisine: 'West Indian', dietary: 'Non-Veg', basePrice: 190, baseCalories: 370, baseProtein: 21, baseCarbs: 48, baseFats: 9, imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  // EAST INDIAN
  { id: 'd21', name: 'Bengali Mustard Fish Curry & Brown Rice', description: 'Fresh Rohu fish cooked in authentic mustard seed paste gravy (Shorshe Maach) with brown rice.', category: 'High Protein', cuisine: 'East Indian', dietary: 'Non-Veg', basePrice: 340, baseCalories: 440, baseProtein: 36, baseCarbs: 42, baseFats: 14, imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd22', name: 'Lean Kosha Chicken & Whole Wheat Chapatis', description: 'Slow roasted chicken curry prepared with ground spices and tomato, served with 2 chapatis.', category: 'High Protein', cuisine: 'East Indian', dietary: 'Non-Veg', basePrice: 310, baseCalories: 480, baseProtein: 43, baseCarbs: 42, baseFats: 14, imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd23', name: 'Odia Dalma & Steamed Red Rice Bowl', description: 'Nutritious chana dal cooked with raw papaya, pumpkin, brinjal, tempered with roasted cumin.', category: 'Balanced', cuisine: 'East Indian', dietary: 'Vegan', basePrice: 220, baseCalories: 390, baseProtein: 17, baseCarbs: 60, baseFats: 6, imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd24', name: 'Chingri Malai Curry (Light) & Brown Rice', description: 'Prawns cooked in coconut water & light milk coconut curry with cinnamon and cloves.', category: 'High Protein', cuisine: 'East Indian', dietary: 'Non-Veg', basePrice: 380, baseCalories: 460, baseProtein: 34, baseCarbs: 40, baseFats: 15, imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd25', name: 'Tofu Ghugni & Sprouted Mung Salad', description: 'Spiced yellow dried peas curry served with pan-seared organic tofu cubes and crunchy salad.', category: 'High Protein', cuisine: 'East Indian', dietary: 'Vegan', basePrice: 230, baseCalories: 390, baseProtein: 26, baseCarbs: 46, baseFats: 10, imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd26', name: 'Assamese Fish Pitika & Steamed Quinoa', description: 'Mashed grilled fish with mustard oil, green chilies, coriander leaves, served over hot quinoa.', category: 'Low Carb', cuisine: 'East Indian', dietary: 'Non-Veg', basePrice: 330, baseCalories: 410, baseProtein: 39, baseCarbs: 30, baseFats: 13, imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd27', name: 'Chana Paneer Tarkari & Bajra Roti', description: 'Chickpea and cottage cheese curry cooked with Panch Phoron five-spice mix served with Bajra roti.', category: 'High Protein', cuisine: 'East Indian', dietary: 'Veg', basePrice: 250, baseCalories: 470, baseProtein: 27, baseCarbs: 50, baseFats: 15, imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  // extras to hit 30
  { id: 'd28', name: 'Tomato Egg Drop Rasam & Rice', description: 'Tangy South Indian pepper rasam with soft egg drops served with steamed white rice.', category: 'Low Carb', cuisine: 'South Indian', dietary: 'Non-Veg', basePrice: 180, baseCalories: 310, baseProtein: 18, baseCarbs: 36, baseFats: 7, imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd29', name: 'Chicken Saag & Millet Roti', description: 'Tender chicken pieces slow-cooked in fresh mustard greens and spinach, served with pearl millet roti.', category: 'High Protein', cuisine: 'North Indian', dietary: 'Non-Veg', basePrice: 300, baseCalories: 490, baseProtein: 44, baseCarbs: 38, baseFats: 16, imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80', isAvailable: true },
  { id: 'd30', name: 'Vegan Jackfruit Biryani Bowl', description: 'Pulled raw jackfruit cooked with aromatic biryani spices over brown basmati rice.', category: 'Balanced', cuisine: 'West Indian', dietary: 'Vegan', basePrice: 280, baseCalories: 450, baseProtein: 14, baseCarbs: 72, baseFats: 9, imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80', isAvailable: true },
];

// ── Customization Options ───────────────────────────────────────────────────
export const MOCK_CUSTOMIZATION_OPTIONS: CustomizationOption[] = [
  { id: 'c1', category: 'BASE_CARB', optionName: 'Brown Basmati Rice (150g)', extraPrice: 0, extraCalories: 0, extraProtein: 0, extraCarbs: 0, extraFats: 0 },
  { id: 'c2', category: 'BASE_CARB', optionName: 'Organic Quinoa Base (150g)', extraPrice: 50, extraCalories: 30, extraProtein: 4, extraCarbs: -5, extraFats: 1 },
  { id: 'c3', category: 'BASE_CARB', optionName: 'Cauliflower Keto Rice (150g)', extraPrice: 60, extraCalories: -120, extraProtein: 2, extraCarbs: -35, extraFats: 0 },
  { id: 'c4', category: 'BASE_CARB', optionName: 'Foxtail Millet Base (150g)', extraPrice: 30, extraCalories: -20, extraProtein: 3, extraCarbs: -10, extraFats: 0 },
  { id: 'c5', category: 'BASE_CARB', optionName: '2 Multigrain Rotis', extraPrice: 20, extraCalories: 20, extraProtein: 3, extraCarbs: 5, extraFats: 1 },
  { id: 'c6', category: 'EXTRA_PROTEIN', optionName: 'No Extra Protein', extraPrice: 0, extraCalories: 0, extraProtein: 0, extraCarbs: 0, extraFats: 0 },
  { id: 'c7', category: 'EXTRA_PROTEIN', optionName: '+50g Grilled Chicken Breast', extraPrice: 70, extraCalories: 82, extraProtein: 15.5, extraCarbs: 0, extraFats: 1.8 },
  { id: 'c8', category: 'EXTRA_PROTEIN', optionName: '+100g Grilled Chicken Breast', extraPrice: 130, extraCalories: 165, extraProtein: 31, extraCarbs: 0, extraFats: 3.6 },
  { id: 'c9', category: 'EXTRA_PROTEIN', optionName: '+50g Malai Paneer Cubes', extraPrice: 60, extraCalories: 130, extraProtein: 9, extraCarbs: 2, extraFats: 10 },
  { id: 'c10', category: 'EXTRA_PROTEIN', optionName: '+100g Soya Chunks', extraPrice: 50, extraCalories: 140, extraProtein: 26, extraCarbs: 8, extraFats: 0.5 },
  { id: 'c11', category: 'EXTRA_PROTEIN', optionName: '+3 Egg Whites (Boiled)', extraPrice: 40, extraCalories: 51, extraProtein: 11, extraCarbs: 0.6, extraFats: 0.2 },
  { id: 'c12', category: 'OIL_GHEE', optionName: 'Standard A2 Ghee (1 tsp)', extraPrice: 0, extraCalories: 0, extraProtein: 0, extraCarbs: 0, extraFats: 0 },
  { id: 'c13', category: 'OIL_GHEE', optionName: 'Low Oil / Less Ghee (-50% fat)', extraPrice: 0, extraCalories: -45, extraProtein: 0, extraCarbs: 0, extraFats: -5 },
  { id: 'c14', category: 'OIL_GHEE', optionName: 'Zero Oil / Steamed Cooking', extraPrice: 0, extraCalories: -90, extraProtein: 0, extraCarbs: 0, extraFats: -10 },
  { id: 'c15', category: 'OIL_GHEE', optionName: 'Extra Virgin Olive Oil Swap', extraPrice: 30, extraCalories: 0, extraProtein: 0, extraCarbs: 0, extraFats: 0 },
];

// ── Mock Orders (pre-seeded for Kitchen Dashboard) ──────────────────────────
export const MOCK_ORDERS: Order[] = [
  {
    id: 'o1', orderNumber: 'NC-8901', customerName: 'Rahul Sharma',
    customerPhone: '+91 98765 43210', address: 'Flat 402, Green Acres Apt, Indiranagar, Bengaluru',
    deliverySlot: '12:30 PM - 01:30 PM', totalPrice: 420, totalCalories: 562,
    totalProtein: 43.5, totalCarbs: 45, totalFats: 17.8, status: 'PREPARING',
    isSubscriptionDelivery: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    items: [{ id: 'oi1', dishId: 'd2', dishName: 'Tandoori Chicken Breast & Mint Salad', quantity: 1, price: 420, calories: 562, protein: 43.5, carbs: 45, fats: 17.8, customizationSummary: '{"carbBase":"Brown Basmati Rice","extraProtein":"+50g Grilled Chicken Breast","oilGhee":"Low Oil"}' }]
  },
  {
    id: 'o2', orderNumber: 'NC-8902', customerName: 'Priya Sundaram',
    customerPhone: '+91 98123 76543', address: 'House #12, HSR Layout Sector 3, Bengaluru',
    deliverySlot: '01:00 PM - 02:00 PM', totalPrice: 340, totalCalories: 330,
    totalProtein: 33, totalCarbs: 10, totalFats: 16, status: 'PLACED',
    isSubscriptionDelivery: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    items: [{ id: 'oi2', dishId: 'd6', dishName: 'Keto Keema Bowl', quantity: 1, price: 340, calories: 330, protein: 33, carbs: 10, fats: 16, customizationSummary: '{"carbBase":"Cauliflower Keto Rice","extraProtein":"No Extra Protein","oilGhee":"Zero Oil"}' }]
  },
  {
    id: 'o3', orderNumber: 'NC-8903', customerName: 'Ananya Verma',
    customerPhone: '+91 99001 12233', address: 'Tower B-1104, Prestige Lakeside, Marathahalli',
    deliverySlot: '12:30 PM - 01:30 PM', totalPrice: 280, totalCalories: 480,
    totalProtein: 28, totalCarbs: 45, totalFats: 16, status: 'DISPATCHED',
    isSubscriptionDelivery: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    items: [{ id: 'oi3', dishId: 'd1', dishName: 'Palak Paneer & Brown Rice Bowl', quantity: 1, price: 280, calories: 480, protein: 28, carbs: 45, fats: 16, customizationSummary: '{"carbBase":"Brown Basmati Rice","extraProtein":"No Extra Protein","oilGhee":"Standard A2 Ghee"}' }]
  },
];

// ── Mock Inventory ──────────────────────────────────────────────────────────
export const MOCK_INVENTORY: import('../types').Ingredient[] = [
  { id: 'inv-1', name: 'Fresh Boneless Chicken Breast', currentStock: 28.5, minimumThreshold: 15.0, unit: 'kg', isLowStock: false, lastRestockedAt: 'Today, 06:30 AM' },
  { id: 'inv-2', name: 'Organic Malai Paneer', currentStock: 14.0, minimumThreshold: 10.0, unit: 'kg', isLowStock: false, lastRestockedAt: 'Today, 06:45 AM' },
  { id: 'inv-3', name: 'A2 Cow Desi Ghee', currentStock: 3.2, minimumThreshold: 5.0, unit: 'kg', isLowStock: true, lastRestockedAt: 'Yesterday, 04:00 PM' },
  { id: 'inv-4', name: 'Brown Basmati Rice', currentStock: 45.0, minimumThreshold: 20.0, unit: 'kg', isLowStock: false, lastRestockedAt: 'Yesterday, 11:00 AM' },
  { id: 'inv-5', name: 'Organic Quinoa Grain', currentStock: 8.5, minimumThreshold: 10.0, unit: 'kg', isLowStock: true, lastRestockedAt: '3 days ago' },
  { id: 'inv-6', name: 'Fresh Palak (Spinach)', currentStock: 18.0, minimumThreshold: 12.0, unit: 'kg', isLowStock: false, lastRestockedAt: 'Today, 06:00 AM' },
  { id: 'inv-7', name: 'Multigrain Dough (Atta)', currentStock: 35.0, minimumThreshold: 15.0, unit: 'kg', isLowStock: false, lastRestockedAt: 'Today, 07:00 AM' },
  { id: 'inv-8', name: 'Egg Whites (Crate of 30)', currentStock: 12.0, minimumThreshold: 8.0, unit: 'crates', isLowStock: false, lastRestockedAt: 'Today, 06:15 AM' },
];

// ── Mock Kitchen Prep Forecast ──────────────────────────────────────────────
export const MOCK_FORECAST: import('../types').PrepForecast = {
  activeSubscriptionsCount: 48,
  openOrdersCount: 6,
  estimatedMealsToday: 64,
  totalRevenue: 28450,
  ingredientBreakdown: {
    chickenKg: 16.4,
    paneerKg: 9.8,
    brownRiceKg: 18.5,
    quinoaKg: 5.2,
    multigrainRotisCount: 128,
  }
};

