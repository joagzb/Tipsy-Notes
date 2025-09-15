import { useContext } from "react";
import { CocktailCard } from "./CocktailCard";
import { AppContext } from "../context/CocktailContext";

export function CocktailList() {
	const { cocktails } = useContext(AppContext);

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
