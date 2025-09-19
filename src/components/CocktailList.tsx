import { UseGlobalState } from "../hooks/UseGlobalState";
import { CocktailCard } from "./CocktailCard";

export function CocktailList() {
	const { cocktails } = UseGlobalState();

	return (
		<div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950 dark:via-orange-950 dark:to-yellow-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {cocktails.map((cocktail) => (
            <CocktailCard key={cocktail.id} cocktail={cocktail} />
          ))}
        </div>
      </div>
    </div>
	);
}
