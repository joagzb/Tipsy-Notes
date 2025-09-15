export type MeasurementType = "oz" | "ml";

export const RECIPE_TAGS = [
	"classic",
	"fresh",
	"fruit",
	"sweet",
	"bitter",
	"strong",
	"homemade",
	"tiki",
	"modern",
] as const;

export type RecipeTag = typeof RECIPE_TAGS[number];