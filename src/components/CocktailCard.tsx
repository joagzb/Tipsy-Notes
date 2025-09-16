import { useContext, useMemo, useState } from "react";
import type { ICocktail } from "../models/ICocktail";
import { AppContext } from "../context/CocktailContext";

export function CocktailCard({ cocktail }: { cocktail: ICocktail }) {
	const context = useContext(AppContext);

	const [liked, setLiked] = useState(false);

	const orderedSteps = useMemo(() => {
		return [...cocktail.steps].sort((a, b) => a.order - b.order);
	}, [cocktail.steps]);

	const onLikeBtnClick = () => {
		setLiked(!liked);
		context.onLikeToggleCocktail(cocktail.id, !liked);
	};

	return (
		<div>
			<h1>{cocktail.title}</h1>
			<h2>elements:</h2>
			<ul>
				{
					cocktail.ingredients.map((element, idx) => (
						<li key={`${cocktail.id}-ingredient-${idx}`}>{element.name} {element.units} {element.measurementType}</li>
					))
				}
			</ul>

			<h2>steps:</h2>
			<ol>
				{
					orderedSteps.map((step) => (
						<li key={`${cocktail.id}-step-${step.order}`}>{step.description}</li>
					))
				}
			</ol>
			<button onClick={onLikeBtnClick}>{liked ? "Liked" : "Like"}</button>
		</div>
	);
}
