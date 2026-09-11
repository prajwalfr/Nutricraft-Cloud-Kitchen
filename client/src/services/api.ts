import { Dish, CustomizationOption, Order, Subscription, PrepForecast, Ingredient } from '../types';

const API_BASE = '/api';

export const api = {
  // Dishes
  getDishes: async (): Promise<Dish[]> => {
    const res = await fetch(`${API_BASE}/dishes`);
    if (!res.ok) throw new Error('Failed to fetch dishes');
    return res.json();
  },

  toggleDishStock: async (dishId: string): Promise<Dish> => {
    const res = await fetch(`${API_BASE}/dishes/${dishId}/toggle`, {
      method: 'PATCH'
    });
    if (!res.ok) throw new Error('Failed to toggle dish stock');
    return res.json();
  },

  // Inventory
  getInventory: async (): Promise<Ingredient[]> => {
    const res = await fetch(`${API_BASE}/inventory`);
    if (!res.ok) throw new Error('Failed to fetch inventory');
    return res.json();
  },

  restockIngredient: async (ingredientId: string, addedQuantity: number): Promise<Ingredient> => {
    const res = await fetch(`${API_BASE}/inventory/restock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredientId, addedQuantity })
    });
    if (!res.ok) throw new Error('Failed to restock ingredient');
    return res.json();
  },

  // Customization Options
  getCustomizationOptions: async (): Promise<CustomizationOption[]> => {
    const res = await fetch(`${API_BASE}/customizations`);
    if (!res.ok) throw new Error('Failed to fetch customization options');
    return res.json();
  },

  // Orders
  getOrders: async (): Promise<Order[]> => {
    const res = await fetch(`${API_BASE}/orders`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  },

  getOrderById: async (id: string): Promise<Order> => {
    const res = await fetch(`${API_BASE}/orders/${id}`);
    if (!res.ok) throw new Error('Failed to fetch order');
    return res.json();
  },

  createOrder: async (orderPayload: any): Promise<Order> => {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (!res.ok) throw new Error('Failed to create order');
    return res.json();
  },

  updateOrderStatus: async (id: string, status: string): Promise<Order> => {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update order status');
    return res.json();
  },

  // Subscriptions
  getSubscriptions: async (): Promise<Subscription[]> => {
    const res = await fetch(`${API_BASE}/subscriptions`);
    if (!res.ok) throw new Error('Failed to fetch subscriptions');
    return res.json();
  },

  createSubscription: async (payload: any): Promise<Subscription> => {
    const res = await fetch(`${API_BASE}/subscriptions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to create subscription');
    return res.json();
  },

  updateSubscriptionPauseDates: async (id: string, pausedDates: string[]): Promise<Subscription> => {
    const res = await fetch(`${API_BASE}/subscriptions/${id}/pause-dates`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pausedDates })
    });
    if (!res.ok) throw new Error('Failed to update paused dates');
    return res.json();
  },

  // Kitchen Prep Forecast
  getPrepForecast: async (): Promise<PrepForecast> => {
    const res = await fetch(`${API_BASE}/kitchen/forecast`);
    if (!res.ok) throw new Error('Failed to fetch prep forecast');
    return res.json();
  }
};

