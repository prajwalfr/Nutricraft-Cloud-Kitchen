import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Flame, Dumbbell, MapPin, Clock } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onOrderPlaced: (orderId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  setCart,
  onOrderPlaced
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('Rahul Sharma');
  const [customerPhone, setCustomerPhone] = useState('+91 98765 43210');
  const [address, setAddress] = useState('Flat 402, Green Acres Apt, Indiranagar, Bengaluru');
  const [deliverySlot, setDeliverySlot] = useState('12:30 PM - 01:30 PM');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  // Cart Totals
  const totalCartPrice = cart.reduce((acc, item) => acc + item.calculatedPrice * item.quantity, 0);
  const totalCartCalories = cart.reduce((acc, item) => acc + item.calculatedCalories * item.quantity, 0);
  const totalCartProtein = Math.round(cart.reduce((acc, item) => acc + item.calculatedProtein * item.quantity, 0) * 10) / 10;
  const totalCartCarbs = Math.round(cart.reduce((acc, item) => acc + item.calculatedCarbs * item.quantity, 0) * 10) / 10;
  const totalCartFats = Math.round(cart.reduce((acc, item) => acc + item.calculatedFats * item.quantity, 0) * 10) / 10;

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'COD'>('UPI');

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsSubmitting(true);

    try {
      const orderPayload = {
        customerName,
        customerPhone,
        address,
        deliverySlot,
        paymentMethod,
        items: cart.map((item) => ({
          dishId: item.dish.id,
          dishName: item.dish.name,
          quantity: item.quantity,
          price: item.calculatedPrice,
          calories: item.calculatedCalories,
          protein: item.calculatedProtein,
          carbs: item.calculatedCarbs,
          fats: item.calculatedFats,
          customizationSummary: {
            carbBase: item.customizations.carbBase?.optionName,
            extraProtein: item.customizations.extraProtein?.optionName,
            oilGhee: item.customizations.oilGhee?.optionName
          }
        }))
      };

      // Mock order creation — no backend needed
      const mockOrderId = `mock-${Date.now()}`;
      console.log('Order placed (mock):', orderPayload);
      setIsSubmitting(false);
      setCart([]);
      onOrderPlaced(mockOrderId);
      onClose();
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* DRAWER HEADER */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-black text-white">Your Macro Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-900 text-slate-400 hover:text-white flex items-center justify-center border border-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* DRAWER BODY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {cart.length > 0 ? (
            <>
              {/* TOTAL CART MACRO BAR */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 grid grid-cols-4 gap-1 text-center">
                <div>
                  <div className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-0.5">
                    <Flame className="w-2.5 h-2.5 text-amber-400" /> Cals
                  </div>
                  <div className="text-xs font-black text-white mt-0.5">{totalCartCalories}</div>
                </div>
                <div>
                  <div className="text-[10px] text-emerald-400 font-bold flex items-center justify-center gap-0.5">
                    <Dumbbell className="w-2.5 h-2.5 text-emerald-400" /> Prot
                  </div>
                  <div className="text-xs font-black text-emerald-400 mt-0.5">{totalCartProtein}g</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold">Carbs</div>
                  <div className="text-xs font-black text-sky-400 mt-0.5">{totalCartCarbs}g</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold">Fats</div>
                  <div className="text-xs font-black text-amber-400 mt-0.5">{totalCartFats}g</div>
                </div>
              </div>

              {/* CART ITEMS LIST */}
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-white">{item.dish.name}</h4>
                        <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                          ₹{item.calculatedPrice} x {item.quantity} = ₹{item.calculatedPrice * item.quantity}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* CUSTOMIZATION TAGS */}
                    <div className="flex flex-wrap gap-1 text-[10px]">
                      {item.customizations.carbBase && (
                        <span className="bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                          🌾 {item.customizations.carbBase.optionName}
                        </span>
                      )}
                      {item.customizations.extraProtein && item.customizations.extraProtein.extraProtein > 0 && (
                        <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                          💪 {item.customizations.extraProtein.optionName}
                        </span>
                      )}
                      {item.customizations.oilGhee && (
                        <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                          ✨ {item.customizations.oilGhee.optionName}
                        </span>
                      )}
                    </div>

                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                      <div className="text-[10px] text-slate-400">
                        {item.calculatedCalories * item.quantity} kcal | {Math.round(item.calculatedProtein * item.quantity * 10) / 10}g P
                      </div>

                      <div className="flex items-center gap-2 bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-800">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-slate-400 hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>

              {/* DELIVERY ADDRESS & TIME FORM */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Delivery Address & Slot
                </h4>

                <div>
                  <label className="text-[10px] font-bold text-slate-400">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400">Phone</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400">Delivery Address</label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> Kitchen Dispatch Slot
                  </label>
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full mt-1 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                  >
                    <option>12:30 PM - 01:30 PM (Lunch)</option>
                    <option>01:30 PM - 02:30 PM (Late Lunch)</option>
                    <option>07:30 PM - 08:30 PM (Dinner)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-400">Payment Option</label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI')}
                      className={`py-1.5 px-2 rounded-lg border text-xs font-bold transition-all ${
                        paymentMethod === 'UPI'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      ⚡ Instant UPI
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('CARD')}
                      className={`py-1.5 px-2 rounded-lg border text-xs font-bold transition-all ${
                        paymentMethod === 'CARD'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      💳 Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('COD')}
                      className={`py-1.5 px-2 rounded-lg border text-xs font-bold transition-all ${
                        paymentMethod === 'COD'
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      💵 COD
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-16 text-slate-500">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-600" />
              <p className="font-bold text-slate-400">Your cart is empty</p>
              <p className="text-xs text-slate-500 mt-1">Select and customize meals from our 30-staple Indian menu.</p>
            </div>
          )}

        </div>

        {/* DRAWER FOOTER */}
        {cart.length > 0 && (
          <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Total Payable</span>
              <span className="text-2xl font-black text-emerald-400">₹{totalCartPrice}</span>
            </div>

            <button
              disabled={isSubmitting}
              onClick={handleCheckout}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Placing Order...' : `Place Order (₹${totalCartPrice}) & Track Live`}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
