import type { CATEGORIES } from "./CategoriesEnum";
import type { GLASS_TYPES } from "./GlassesEnum";

export type MeasurementType = "oz" | "ml" | "unit" | "dashes";

export type RecipeCategory = typeof CATEGORIES[number];

export type GlassType = typeof GLASS_TYPES[number];