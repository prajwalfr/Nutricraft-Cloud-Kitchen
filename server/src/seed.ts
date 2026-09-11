import { PrismaClient } from '@prisma/client';
import { INITIAL_DISHES, GLOBAL_CUSTOMIZATION_OPTIONS } from './data/dishesData.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting NutriCraft database seeding...');

  // 1. Seed Dishes
  const existingDishesCount = await prisma.dish.count();
  if (existingDishesCount === 0) {
    console.log('Adding 30 staple Indian dishes...');
    for (const dish of INITIAL_DISHES) {
      await prisma.dish.create({
        data: dish
      });
    }
    console.log(`✅ Seeded ${INITIAL_DISHES.length} dishes.`);
  } else {
    console.log(`ℹ️ ${existingDishesCount} dishes already exist in DB.`);
  }

  // 2. Seed Customization Options
  const existingOptionsCount = await prisma.customizationOption.count();
  if (existingOptionsCount === 0) {
    console.log('Adding customization options (Carbs, Protein, Ghee)...');
    for (const option of GLOBAL_CUSTOMIZATION_OPTIONS) {
      await prisma.customizationOption.create({
        data: option
      });
    }
    console.log(`✅ Seeded ${GLOBAL_CUSTOMIZATION_OPTIONS.length} customization options.`);
  } else {
    console.log(`ℹ️ ${existingOptionsCount} customization options already exist in DB.`);
  }

  // 3. Create Sample Initial Orders if empty
  const existingOrdersCount = await prisma.order.count();
  if (existingOrdersCount === 0) {
    console.log('Creating sample kitchen orders...');
    const dishes = await prisma.dish.findMany({ take: 3 });
    
    if (dishes.length >= 2) {
      await prisma.order.create({
        data: {
          orderNumber: 'NC-8901',
          customerName: 'Rahul Sharma',
          customerPhone: '+91 98765 43210',
          address: 'Flat 402, Green Acres Apt, Indiranagar, Bengaluru',
          deliverySlot: '12:30 PM - 01:30 PM',
          totalPrice: 420,
          totalCalories: 562,
          totalProtein: 43.5,
          totalCarbs: 45,
          totalFats: 17.8,
          status: 'PREPARING',
          items: {
            create: [
              {
                dishId: dishes[0].id,
                dishName: dishes[0].name,
                quantity: 1,
                price: 420,
                calories: 562,
                protein: 43.5,
                carbs: 45,
                fats: 17.8,
                customizationSummary: JSON.stringify({
                  carbBase: 'Brown Basmati Rice (150g)',
                  extraProtein: '+50g Grilled Chicken Breast',
                  oilGhee: 'Low Oil / Less Ghee (-50% fat)'
                })
              }
            ]
          }
        }
      });

      await prisma.order.create({
        data: {
          orderNumber: 'NC-8902',
          customerName: 'Priya Sundaram',
          customerPhone: '+91 98123 76543',
          address: 'House #12, HSR Layout Sector 3, Bengaluru',
          deliverySlot: '01:00 PM - 02:00 PM',
          totalPrice: 340,
          totalCalories: 330,
          totalProtein: 33,
          totalCarbs: 10,
          totalFats: 16,
          status: 'PLACED',
          items: {
            create: [
              {
                dishId: dishes[1].id,
                dishName: dishes[1].name,
                quantity: 1,
                price: 340,
                calories: 330,
                protein: 33,
                carbs: 10,
                fats: 16,
                customizationSummary: JSON.stringify({
                  carbBase: 'Cauliflower Keto Rice (150g)',
                  extraProtein: 'No Extra Protein',
                  oilGhee: 'Zero Oil / Steamed Cooking'
                })
              }
            ]
          }
        }
      });
      console.log('✅ Created initial sample kitchen orders.');
    }
  }

  // 4. Create Sample Subscription if empty
  const existingSubCount = await prisma.subscription.count();
  if (existingSubCount === 0) {
    console.log('Creating sample active subscription...');
    await prisma.subscription.create({
      data: {
        userName: 'Ananya Verma',
        userPhone: '+91 99001 12233',
        userAddress: 'Tower B-1104, Prestige Lakeside, Marathahalli, Bengaluru',
        planType: '1x_MEAL_DAILY',
        activeDays: 'MON_FRI',
        deliverySlot: '12:30 PM - 01:30 PM',
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        pausedDates: JSON.stringify([]),
        status: 'ACTIVE',
        monthlyPrice: 6500
      }
    });
    console.log('✅ Created sample subscription.');
  }

  console.log('🎉 Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
