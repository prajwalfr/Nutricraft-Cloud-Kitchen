import { Dish, SelectedCustomizations } from '../types';

export interface CalculatedMacros {
  totalPrice: number;
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
  macroPercentages: {
    proteinPct: number;
    carbsPct: number;
    fatsPct: number;
  };
}

export function calculateMealMacros(
  dish: Dish,
  customizations?: Partial<SelectedCustomizations>
): CalculatedMacros {
  let price = dish.basePrice;
  let calories = dish.baseCalories;
  let protein = dish.baseProtein;
  let carbs = dish.baseCarbs;
  let fats = dish.baseFats;

  if (customizations?.carbBase) {
    price += customizations.carbBase.extraPrice;
    calories += customizations.carbBase.extraCalories;
    protein += customizations.carbBase.extraProtein;
    carbs += customizations.carbBase.extraCarbs;
    fats += customizations.carbBase.extraFats;
  }

  if (customizations?.extraProtein) {
    price += customizations.extraProtein.extraPrice;
    calories += customizations.extraProtein.extraCalories;
    protein += customizations.extraProtein.extraProtein;
    carbs += customizations.extraProtein.extraCarbs;
    fats += customizations.extraProtein.extraFats;
  }

  if (customizations?.oilGhee) {
    price += customizations.oilGhee.extraPrice;
    calories += customizations.oilGhee.extraCalories;
    protein += customizations.oilGhee.extraProtein;
    carbs += customizations.oilGhee.extraCarbs;
    fats += customizations.oilGhee.extraFats;
  }

  // Ensure non-negative numbers
  price = Math.max(0, Math.round(price));
  calories = Math.max(0, Math.round(calories));
  protein = Math.max(0, Math.round(protein * 10) / 10);
  carbs = Math.max(0, Math.round(carbs * 10) / 10);
  fats = Math.max(0, Math.round(fats * 10) / 10);

  // Macro Energy % calculation (Protein 4kcal/g, Carbs 4kcal/g, Fats 9kcal/g)
  const proteinKcal = protein * 4;
  const carbsKcal = carbs * 4;
  const fatsKcal = fats * 9;
  const totalKcalCalc = proteinKcal + carbsKcal + fatsKcal || 1;

  const proteinPct = Math.round((proteinKcal / totalKcalCalc) * 100);
  const carbsPct = Math.round((carbsKcal / totalKcalCalc) * 100);
  const fatsPct = Math.round((fatsKcal / totalKcalCalc) * 100);

  return {
    totalPrice: price,
    totalCalories: calories,
    totalProtein: protein,
    totalCarbs: carbs,
    totalFats: fats,
    macroPercentages: {
      proteinPct,
      carbsPct,
      fatsPct
    }
  };
}
