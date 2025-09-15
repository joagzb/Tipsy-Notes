import type { ICocktail } from "../models/ICocktail";
import { CocktailCard } from "./CocktailCard";

export function CocktailList({ cocktails }: { cocktails: ICocktail[] }) {

	return (
		<div>
			{
				cocktails.map((cocktail) => (
					<CocktailCard cocktail={cocktail} />
				))
			}
		</div>
	);
}