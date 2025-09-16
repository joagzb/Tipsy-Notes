export type MeasurementType = "oz" | "ml" | "unit" | "dashes";

export const RECIPE_TAGS = [
	"classic",
	"modern",
	"refreshing",
	"spritz", // For cocktails topped with sparkling wine / prosecco / bubbly elements
	"fizz", // For drinks with soda or carbonation and citrus & sugar base
	"fruity",
	"citrus",
	"sweet",
	"dessert",
	"smoky",
	"herbal",
	"floral",
	"dry",
	"bitter",
	"strong",
	"tiki",
	"aperitif",
	"sour",
	"seasonal",
	"craft",
	"mocktail" // non-alcoholic cocktail
] as const;

export type RecipeTag = typeof RECIPE_TAGS[number];