import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { INITIAL_DISHES, GLOBAL_CUSTOMIZATION_OPTIONS } from './data/dishesData.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  }
});

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

async function seedIfEmpty() {
  const count = await prisma.dish.count();
  if (count === 0) {
    console.log('🌱 Empty DB — auto-seeding 30 dishes...');
    for (const dish of INITIAL_DISHES) {
      await prisma.dish.create({ data: dish });
    }
    for (const option of GLOBAL_CUSTOMIZATION_OPTIONS) {
      await prisma.customizationOption.create({ data: option });
    }
    console.log('✅ Auto-seed complete!');
  }
}

app.use(cors());
app.use(express.json());

// --- WEBSOCKET CONNECTION ---
io.on('connection', (socket) => {
  console.log(`🔌 Client connected to NutriCraft WS: ${socket.id}`);

  socket.on('join:order', (orderId: string) => {
    socket.join(`order:${orderId}`);
    console.log(`Socket ${socket.id} joined room order:${orderId}`);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// --- DISHES ENDPOINTS ---
app.get('/api/dishes', async (req, res) => {
  try {
    const dishes = await prisma.dish.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(dishes);
  } catch (error) {
    console.error('Error fetching dishes:', error);
    res.status(500).json({ error: 'Failed to fetch dishes' });
  }
});

app.patch('/api/dishes/:id/toggle', async (req, res) => {
  try {
    const { id } = req.params;
    const dish = await prisma.dish.findUnique({ where: { id } });
    if (!dish) {
      return res.status(404).json({ error: 'Dish not found' });
    }
    const updated = await prisma.dish.update({
      where: { id },
      data: { isAvailable: !dish.isAvailable }
    });

    // Broadcast stock change to all connected clients
    io.emit('dish:updated', updated);

    res.json(updated);
  } catch (error) {
    console.error('Error toggling dish availability:', error);
    res.status(500).json({ error: 'Failed to toggle availability' });
  }
});

// --- CUSTOMIZATIONS ENDPOINT ---
app.get('/api/customizations', async (req, res) => {
  try {
    const options = await prisma.customizationOption.findMany();
    res.json(options);
  } catch (error) {
    console.error('Error fetching customizations:', error);
    res.status(500).json({ error: 'Failed to fetch customizations' });
  }
});

// --- ORDERS ENDPOINTS ---
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await prisma.order.findUnique({
      where: { id },
      include: { items: true }
    });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, customerPhone, address, deliverySlot, items, isSubscriptionDelivery } = req.body;

    const orderNumber = `NC-${Math.floor(1000 + Math.random() * 9000)}`;

    let totalPrice = 0;
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    for (const item of items) {
      totalPrice += item.price * item.quantity;
      totalCalories += item.calories * item.quantity;
      totalProtein += item.protein * item.quantity;
      totalCarbs += item.carbs * item.quantity;
      totalFats += item.fats * item.quantity;
    }

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: customerName || 'Valued Customer',
        customerPhone: customerPhone || '+91 98765 43210',
        address: address || '123 Health Street, Indiranagar, Bengaluru',
        deliverySlot: deliverySlot || '12:30 PM - 01:30 PM',
        totalPrice,
        totalCalories,
        totalProtein: Math.round(totalProtein * 10) / 10,
        totalCarbs: Math.round(totalCarbs * 10) / 10,
        totalFats: Math.round(totalFats * 10) / 10,
        status: 'PLACED',
        isSubscriptionDelivery: Boolean(isSubscriptionDelivery),
        items: {
          create: items.map((item: any) => ({
            dishId: item.dishId,
            dishName: item.dishName,
            quantity: item.quantity,
            price: item.price,
            calories: item.calories,
            protein: item.protein,
            carbs: item.carbs,
            fats: item.fats,
            customizationSummary: JSON.stringify(item.customizationSummary || {})
          }))
        }
      },
      include: { items: true }
    });

    // Notify Kitchen Dashboard live
    io.emit('order:created', order);

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // PLACED, PREPARING, DISPATCHED, DELIVERED

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: { items: true }
    });

    // Broadcast to kitchen dashboard and specific order room for real-time customer tracking
    io.emit('order:updated', order);
    io.to(`order:${id}`).emit('order:status_changed', order);

    res.json(order);
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

// --- SUBSCRIPTIONS ENDPOINTS ---
app.get('/api/subscriptions', async (req, res) => {
  try {
    const subscriptions = await prisma.subscription.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(subscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
});

app.post('/api/subscriptions', async (req, res) => {
  try {
    const { userName, userPhone, userAddress, planType, activeDays, deliverySlot, startDate, endDate, monthlyPrice } = req.body;

    const subscription = await prisma.subscription.create({
      data: {
        userName: userName || 'Subscriber User',
        userPhone: userPhone || '+91 99001 12233',
        userAddress: userAddress || 'Bengaluru Active Gym Community',
        planType: planType || '1x_MEAL_DAILY',
        activeDays: activeDays || 'MON_FRI',
        deliverySlot: deliverySlot || '12:30 PM - 01:30 PM',
        startDate: startDate || new Date().toISOString().split('T')[0],
        endDate: endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        pausedDates: JSON.stringify([]),
        status: 'ACTIVE',
        monthlyPrice: monthlyPrice || 6500
      }
    });

    io.emit('subscription:created', subscription);
    res.status(201).json(subscription);
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
});

app.patch('/api/subscriptions/:id/pause-dates', async (req, res) => {
  try {
    const { id } = req.params;
    const { pausedDates } = req.body; // string[]

    const subscription = await prisma.subscription.update({
      where: { id },
      data: {
        pausedDates: JSON.stringify(pausedDates)
      }
    });

    io.emit('subscription:updated', subscription);
    res.json(subscription);
  } catch (error) {
    console.error('Error updating subscription pause dates:', error);
    res.status(500).json({ error: 'Failed to update subscription dates' });
  }
});

// --- KITCHEN PREP FORECAST ANALYTICS ---
app.get('/api/kitchen/forecast', async (req, res) => {
  try {
    const activeSubscriptions = await prisma.subscription.count({
      where: { status: 'ACTIVE' }
    });

    const openOrders = await prisma.order.findMany({
      where: { status: { in: ['PLACED', 'PREPARING'] } },
      include: { items: true }
    });

    let extraChickenKg = 0;
    let extraPaneerKg = 0;
    let extraRiceKg = 0;
    let totalOrdersCount = openOrders.length;

    for (const order of openOrders) {
      for (const item of order.items) {
        if (item.dishName.toLowerCase().includes('chicken')) {
          extraChickenKg += 0.2 * item.quantity;
        }
        if (item.dishName.toLowerCase().includes('paneer')) {
          extraPaneerKg += 0.18 * item.quantity;
        }
        if (item.dishName.toLowerCase().includes('rice')) {
          extraRiceKg += 0.15 * item.quantity;
        }
      }
    }

    // Baseline prep calculation for active subscription meal plans
    const forecast = {
      activeSubscriptionsCount: activeSubscriptions,
      openOrdersCount: totalOrdersCount,
      estimatedMealsToday: activeSubscriptions * 1.2 + totalOrdersCount,
      ingredientBreakdown: {
        chickenKg: Math.round((activeSubscriptions * 0.18 + extraChickenKg + 4.5) * 10) / 10,
        paneerKg: Math.round((activeSubscriptions * 0.12 + extraPaneerKg + 3.2) * 10) / 10,
        brownRiceKg: Math.round((activeSubscriptions * 0.15 + extraRiceKg + 6.0) * 10) / 10,
        quinoaKg: Math.round((activeSubscriptions * 0.05 + 2.5) * 10) / 10,
        multigrainRotisCount: Math.round(activeSubscriptions * 2.5 + 40)
      }
    };

    res.json(forecast);
  } catch (error) {
    console.error('Error fetching prep forecast:', error);
    res.status(500).json({ error: 'Failed to generate prep forecast' });
  }
});

seedIfEmpty().then(() => {
  httpServer.listen(PORT, () => {
    console.log(`🚀 NutriCraft Server listening on port ${PORT}`);
  });
}).catch((e) => {
  console.error('❌ Seed failed:', e);
  process.exit(1);
});
