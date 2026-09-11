export interface Dish {
  id: string;
  name: string;
  description: string;
  category: 'High Protein' | 'Low Carb' | 'Balanced';
  cuisine: 'North Indian' | 'South Indian' | 'East Indian' | 'West Indian';
  dietary: 'Veg' | 'Non-Veg' | 'Vegan';
  basePrice: number;
  baseCalories: number;
  baseProtein: number;
  baseCarbs: number;
  baseFats: number;
  fiber?: number;
  sodium?: number;
  glycemicIndex?: 'Low' | 'Medium' | 'High';
  allergens?: string[];
  imageUrl: string;
  isAvailable: boolean;
}

export interface CustomizationOption {
  id: string;
  category: 'BASE_CARB' | 'EXTRA_PROTEIN' | 'OIL_GHEE';
  optionName: string;
  extraPrice: number;
  extraCalories: number;
  extraProtein: number;
  extraCarbs: number;
  extraFats: number;
}

export interface SelectedCustomizations {
  carbBase: CustomizationOption;
  extraProtein: CustomizationOption;
  oilGhee: CustomizationOption;
}

export interface CartItem {
  id: string; // unique ID for cart row
  dish: Dish;
  customizations: SelectedCustomizations;
  calculatedPrice: number;
  calculatedCalories: number;
  calculatedProtein: number;
  calculatedCarbs: number;
  calculatedFats: number;
  quantity: number;
}

export interface OrderItemRecord {
  id: string;
  dishId: string;
  dishName: string;
  quantity: number;
  price: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  customizationSummary: string; // JSON
}

export interface Payment {
  id: string;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  transactionId: string;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  address: string;
  deliverySlot: string;
  totalPrice: number;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  status: 'PLACED' | 'PREPARING' | 'DISPATCHED' | 'DELIVERED';
  isSubscriptionDelivery: boolean;
  createdAt: string;
  updatedAt: string;
  items: OrderItemRecord[];
  payments?: Payment[];
}

export interface Ingredient {
  id: string;
  name: string;
  currentStock: number;
  minimumThreshold: number;
  unit: string;
  isLowStock?: boolean;
  lastRestockedAt: string;
}

export interface Subscription {
  id: string;
  userName: string;
  userPhone: string;
  userAddress: string;
  planType: '1x_MEAL_DAILY' | '2x_MEAL_DAILY';
  activeDays: 'MON_FRI' | 'MON_SAT' | 'ALL_DAYS';
  deliverySlot: string;
  startDate: string;
  endDate: string;
  pausedDates: string; // JSON array string
  status: 'ACTIVE' | 'PAUSED' | 'EXPIRED';
  monthlyPrice: number;
  createdAt: string;
}

export interface PrepForecast {
  activeSubscriptionsCount: number;
  openOrdersCount: number;
  estimatedMealsToday: number;
  totalRevenue?: number;
  ingredientBreakdown: {
    chickenKg: number;
    paneerKg: number;
    brownRiceKg: number;
    quinoaKg: number;
    multigrainRotisCount: number;
  };
}

