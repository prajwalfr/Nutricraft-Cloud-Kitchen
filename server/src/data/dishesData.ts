export interface InitialDish {
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
  imageUrl: string;
}

export const INITIAL_DISHES: InitialDish[] = [
  // NORTH INDIAN (8 Dishes)
  {
    name: "Palak Paneer & Brown Rice Bowl",
    description: "Cottage cheese cubes simmered in fresh spinach puree, served with high-fiber brown basmati rice.",
    category: "High Protein",
    cuisine: "North Indian",
    dietary: "Veg",
    basePrice: 280,
    baseCalories: 480,
    baseProtein: 28,
    baseCarbs: 45,
    baseFats: 16,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Tandoori Chicken Breast & Mint Salad",
    description: "Lean chicken breast marinated in Greek yogurt and spices, charcoal grilled with crisp salad.",
    category: "High Protein",
    cuisine: "North Indian",
    dietary: "Non-Veg",
    basePrice: 320,
    baseCalories: 420,
    baseProtein: 48,
    baseCarbs: 12,
    baseFats: 14,
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Low-Oil Dal Makhani & Multigrain Rotis",
    description: "Slow-cooked black lentils prepared with minimal A2 cow ghee and served with 2 multigrain rotis.",
    category: "Balanced",
    cuisine: "North Indian",
    dietary: "Veg",
    basePrice: 240,
    baseCalories: 460,
    baseProtein: 22,
    baseCarbs: 58,
    baseFats: 12,
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Rajma Jammu & Quinoa Meal",
    description: "Protein-dense red kidney beans curry cooked with aromatic North Indian spices over quinoa base.",
    category: "Balanced",
    cuisine: "North Indian",
    dietary: "Vegan",
    basePrice: 260,
    baseCalories: 440,
    baseProtein: 20,
    baseCarbs: 62,
    baseFats: 8,
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Kadai Chicken & Brown Rice",
    description: "Juicy chicken chunks tossed with bell peppers, tomato gravy, served with steamed brown rice.",
    category: "High Protein",
    cuisine: "North Indian",
    dietary: "Non-Veg",
    basePrice: 310,
    baseCalories: 510,
    baseProtein: 42,
    baseCarbs: 48,
    baseFats: 15,
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Paneer Bhurji & Bajra Rotis",
    description: "Scrambled cottage cheese cooked with onions, green chilies, herbs served with 2 Bajra rotis.",
    category: "Low Carb",
    cuisine: "North Indian",
    dietary: "Veg",
    basePrice: 270,
    baseCalories: 450,
    baseProtein: 30,
    baseCarbs: 32,
    baseFats: 20,
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Egg White Curry & Steamed Rice",
    description: "Boiled egg whites simmered in a light onion-tomato gravy with steamed brown basmati rice.",
    category: "Low Carb",
    cuisine: "North Indian",
    dietary: "Non-Veg",
    basePrice: 230,
    baseCalories: 380,
    baseProtein: 36,
    baseCarbs: 35,
    baseFats: 9,
    imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Sarson Ka Saag & Missi Roti",
    description: "Traditional mustard and spinach greens tempered with garlic served with high-fiber chickpea flour roti.",
    category: "Balanced",
    cuisine: "North Indian",
    dietary: "Veg",
    basePrice: 250,
    baseCalories: 410,
    baseProtein: 18,
    baseCarbs: 52,
    baseFats: 12,
    imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
  },

  // SOUTH INDIAN (8 Dishes)
  {
    name: "Chettinad Chicken & Red Matta Rice",
    description: "Fiery spicy Chettinad chicken curry cooked in dry roasted spices with high-antioxidant Red Matta rice.",
    category: "High Protein",
    cuisine: "South Indian",
    dietary: "Non-Veg",
    basePrice: 330,
    baseCalories: 520,
    baseProtein: 44,
    baseCarbs: 46,
    baseFats: 16,
    imageUrl: "https://images.unsplash.com/photo-1610057099443-f68a5c37107c?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Oats & Vegetable Uttapam with Sambar",
    description: "Rolled oats batter topped with bell peppers, carrots, served with protein lentil vegetable sambar.",
    category: "Balanced",
    cuisine: "South Indian",
    dietary: "Vegan",
    basePrice: 210,
    baseCalories: 360,
    baseProtein: 16,
    baseCarbs: 55,
    baseFats: 7,
    imageUrl: "https://images.unsplash.com/photo-1626074353765-517a681e40be?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Moong Dal & Spinach High-Protein Dosa",
    description: "Crispy green gram and spinach crepe filled with spiced paneer, served with mint chutney.",
    category: "High Protein",
    cuisine: "South Indian",
    dietary: "Veg",
    basePrice: 230,
    baseCalories: 410,
    baseProtein: 24,
    baseCarbs: 42,
    baseFats: 12,
    imageUrl: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Kerala Fish Curry & Steamed Brown Rice",
    description: "Fresh coastal fish simmered in kokum and light coconut milk broth with brown basmati rice.",
    category: "High Protein",
    cuisine: "South Indian",
    dietary: "Non-Veg",
    basePrice: 350,
    baseCalories: 460,
    baseProtein: 38,
    baseCarbs: 42,
    baseFats: 13,
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Curd Foxtail Millet & Pomegranate",
    description: "Probiotic Greek yogurt mixed with cooked foxtail millet, tempered with mustard seeds and fresh pomegranate.",
    category: "Low Carb",
    cuisine: "South Indian",
    dietary: "Veg",
    basePrice: 200,
    baseCalories: 330,
    baseProtein: 14,
    baseCarbs: 38,
    baseFats: 9,
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Hyderabadi High-Protein Soya Biryani",
    description: "Soya chunks marinated in mint-yogurt and spices dum cooked with brown basmati rice.",
    category: "High Protein",
    cuisine: "South Indian",
    dietary: "Veg",
    basePrice: 260,
    baseCalories: 490,
    baseProtein: 32,
    baseCarbs: 58,
    baseFats: 11,
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Kerala Egg Roast & Whole Wheat Appam",
    description: "Boiled eggs tossed in caramelized onion and pepper roast gravy served with steamed wheat appam.",
    category: "Balanced",
    cuisine: "South Indian",
    dietary: "Non-Veg",
    basePrice: 240,
    baseCalories: 410,
    baseProtein: 22,
    baseCarbs: 45,
    baseFats: 12,
    imageUrl: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Sambar Lentil Bowl & Steamed Oats Idlis",
    description: "3 steamed oats idlis served with vegetable-loaded tuar dal sambar and fresh coconut mint chutney.",
    category: "Balanced",
    cuisine: "South Indian",
    dietary: "Vegan",
    basePrice: 190,
    baseCalories: 350,
    baseProtein: 15,
    baseCarbs: 56,
    baseFats: 5,
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
  },

  // WEST INDIAN (7 Dishes)
  {
    name: "Kolhapuri Spicy Grilled Chicken & Bajra Roti",
    description: "Robust spiced chicken cooked in Kolhapuri dry red chili gravy served with pearl millet flatbread.",
    category: "High Protein",
    cuisine: "West Indian",
    dietary: "Non-Veg",
    basePrice: 330,
    baseCalories: 500,
    baseProtein: 45,
    baseCarbs: 38,
    baseFats: 14,
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Nutri-Khichdi with Moong & Cow Ghee",
    description: "Comforting split green gram and brown rice dish tempered with cumin, turmeric, and 1 tsp A2 ghee.",
    category: "Balanced",
    cuisine: "West Indian",
    dietary: "Veg",
    basePrice: 210,
    baseCalories: 390,
    baseProtein: 18,
    baseCarbs: 54,
    baseFats: 9,
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Soya Methi Thepla & High Protein Curd",
    description: "3 fenugreek wheat theplas prepared with soya flour, served with hung curd dip.",
    category: "High Protein",
    cuisine: "West Indian",
    dietary: "Veg",
    basePrice: 220,
    baseCalories: 430,
    baseProtein: 25,
    baseCarbs: 44,
    baseFats: 13,
    imageUrl: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Goan Light Coconut Fish Curry & Rice",
    description: "Kingfish cooked in light Goan coconut curry, spiced with triphala and tamarind, served with rice.",
    category: "High Protein",
    cuisine: "West Indian",
    dietary: "Non-Veg",
    basePrice: 360,
    baseCalories: 470,
    baseProtein: 37,
    baseCarbs: 40,
    baseFats: 15,
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Sprouted Usal & Protein Quinoa Bowl",
    description: "Mixed mothbean sprouts cooked in Maharashtrian spices served over a bowl of steamed quinoa.",
    category: "High Protein",
    cuisine: "West Indian",
    dietary: "Vegan",
    basePrice: 240,
    baseCalories: 380,
    baseProtein: 22,
    baseCarbs: 52,
    baseFats: 7,
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Chicken Bhuna & Jowar Rotis",
    description: "Dry roasted spicy chicken with caramelized onions served with sorghum flatbreads.",
    category: "Low Carb",
    cuisine: "West Indian",
    dietary: "Non-Veg",
    basePrice: 320,
    baseCalories: 460,
    baseProtein: 46,
    baseCarbs: 28,
    baseFats: 16,
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Methi Poha & Boiled Egg Whites",
    description: "Flattened rice sautéed with fresh fenugreek leaves and peanuts, accompanied by 3 egg whites.",
    category: "Balanced",
    cuisine: "West Indian",
    dietary: "Non-Veg",
    basePrice: 190,
    baseCalories: 370,
    baseProtein: 21,
    baseCarbs: 48,
    baseFats: 9,
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80"
  },

  // EAST INDIAN (7 Dishes)
  {
    name: "Bengali Mustard Fish Curry & Brown Rice",
    description: "Fresh Rohu fish cooked in authentic mustard seed paste gravy (Shorshe Maach) with brown rice.",
    category: "High Protein",
    cuisine: "East Indian",
    dietary: "Non-Veg",
    basePrice: 340,
    baseCalories: 440,
    baseProtein: 36,
    baseCarbs: 42,
    baseFats: 14,
    imageUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Lean Kosha Chicken & Whole Wheat Chapatis",
    description: "Slow roasted chicken curry prepared with ground spices and tomato, served with 2 chapatis.",
    category: "High Protein",
    cuisine: "East Indian",
    dietary: "Non-Veg",
    basePrice: 310,
    baseCalories: 480,
    baseProtein: 43,
    baseCarbs: 42,
    baseFats: 14,
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Odia Dalma & Steamed Red Rice Bowl",
    description: "Nutritious chana dal cooked with raw papaya, pumpkin, brinjal, tempered with roasted cumin-chili powder.",
    category: "Balanced",
    cuisine: "East Indian",
    dietary: "Vegan",
    basePrice: 220,
    baseCalories: 390,
    baseProtein: 17,
    baseCarbs: 60,
    baseFats: 6,
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Chingri Malai Curry (Light) & Brown Rice",
    description: "Prawns cooked in coconut water & light milk coconut curry with cinnamon and cloves.",
    category: "High Protein",
    cuisine: "East Indian",
    dietary: "Non-Veg",
    basePrice: 380,
    baseCalories: 460,
    baseProtein: 34,
    baseCarbs: 40,
    baseFats: 15,
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Tofu Ghugni & Sprouted Mung Salad",
    description: "Spiced yellow dried peas curry served with pan-seared organic tofu cubes and crunchy salad.",
    category: "High Protein",
    cuisine: "East Indian",
    dietary: "Vegan",
    basePrice: 230,
    baseCalories: 390,
    baseProtein: 26,
    baseCarbs: 46,
    baseFats: 10,
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Assamese Fish Pitika & Steamed Quinoa",
    description: "Mashed grilled fish with mustard oil, green chilies, coriander leaves, served over hot quinoa.",
    category: "Low Carb",
    cuisine: "East Indian",
    dietary: "Non-Veg",
    basePrice: 330,
    baseCalories: 410,
    baseProtein: 39,
    baseCarbs: 30,
    baseFats: 13,
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Chana Paneer Tarkari & Bajra Roti",
    description: "Chickpea and cottage cheese curry cooked with Panch Phoron five-spice mix served with Bajra roti.",
    category: "High Protein",
    cuisine: "East Indian",
    dietary: "Veg",
    basePrice: 250,
    baseCalories: 470,
    baseProtein: 27,
    baseCarbs: 50,
    baseFats: 15,
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80"
  }
];

export const GLOBAL_CUSTOMIZATION_OPTIONS = [
  // CARB BASES
  { category: 'BASE_CARB', optionName: 'Brown Basmati Rice (150g)', extraPrice: 0, extraCalories: 0, extraProtein: 0, extraCarbs: 0, extraFats: 0 },
  { category: 'BASE_CARB', optionName: 'Organic Quinoa Base (150g)', extraPrice: 50, extraCalories: 30, extraProtein: 4, extraCarbs: -5, extraFats: 1 },
  { category: 'BASE_CARB', optionName: 'Cauliflower Keto Rice (150g)', extraPrice: 60, extraCalories: -120, extraProtein: 2, extraCarbs: -35, extraFats: 0 },
  { category: 'BASE_CARB', optionName: 'Foxtail Millet Base (150g)', extraPrice: 30, extraCalories: -20, extraProtein: 3, extraCarbs: -10, extraFats: 0 },
  { category: 'BASE_CARB', optionName: '2 Multigrain Rotis', extraPrice: 20, extraCalories: 20, extraProtein: 3, extraCarbs: 5, extraFats: 1 },

  // EXTRA PROTEIN ADD-ONS
  { category: 'EXTRA_PROTEIN', optionName: 'No Extra Protein', extraPrice: 0, extraCalories: 0, extraProtein: 0, extraCarbs: 0, extraFats: 0 },
  { category: 'EXTRA_PROTEIN', optionName: '+50g Grilled Chicken Breast', extraPrice: 70, extraCalories: 82, extraProtein: 15.5, extraCarbs: 0, extraFats: 1.8 },
  { category: 'EXTRA_PROTEIN', optionName: '+100g Grilled Chicken Breast', extraPrice: 130, extraCalories: 165, extraProtein: 31, extraCarbs: 0, extraFats: 3.6 },
  { category: 'EXTRA_PROTEIN', optionName: '+50g Malai Paneer Cubes', extraPrice: 60, extraCalories: 130, extraProtein: 9, extraCarbs: 2, extraFats: 10 },
  { category: 'EXTRA_PROTEIN', optionName: '+100g Soya Chunks', extraPrice: 50, extraCalories: 140, extraProtein: 26, extraCarbs: 8, extraFats: 0.5 },
  { category: 'EXTRA_PROTEIN', optionName: '+3 Egg Whites (Boiled)', extraPrice: 40, extraCalories: 51, extraProtein: 11, extraCarbs: 0.6, extraFats: 0.2 },

  // OIL / GHEE CONTROLS
  { category: 'OIL_GHEE', optionName: 'Standard A2 Ghee (1 tsp)', extraPrice: 0, extraCalories: 0, extraProtein: 0, extraCarbs: 0, extraFats: 0 },
  { category: 'OIL_GHEE', optionName: 'Low Oil / Less Ghee (-50% fat)', extraPrice: 0, extraCalories: -45, extraProtein: 0, extraCarbs: 0, extraFats: -5 },
  { category: 'OIL_GHEE', optionName: 'Zero Oil / Steamed Cooking', extraPrice: 0, extraCalories: -90, extraProtein: 0, extraCarbs: 0, extraFats: -10 },
  { category: 'OIL_GHEE', optionName: 'Extra Virgin Olive Oil Swap', extraPrice: 30, extraCalories: 0, extraProtein: 0, extraCarbs: 0, extraFats: 0 }
];
