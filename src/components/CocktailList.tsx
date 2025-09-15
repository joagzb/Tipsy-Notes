import type { ICocktail } from "../models/ICocktail";
import { CocktailCard } from "./CocktailCard";

export function CocktailList({ cocktails }: { cocktails: ICocktail[] }) {

	return (
		<>
			{
				cocktails.map((cocktail) => (
					<CocktailCard key={cocktail.id} cocktail={cocktail} />
				))
			}
		</>
	);
}
