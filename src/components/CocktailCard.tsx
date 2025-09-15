import { useMemo } from "react";
import type { ICocktail } from "../models/ICocktail";

export function CocktailCard({ cocktail }: { cocktail: ICocktail }) {

	const orderedSteps = useMemo(() => {
		return [...cocktail.steps].sort((a, b) => a.order - b.order);
	}, [cocktail.steps]);

	return (
		<div>
			<h1>{cocktail.title}</h1>
			<h2>elements:</h2>
			<ul>
				{
					cocktail.ingredients.map((element, idx) => (
						<li key={`ing-${idx}`}>{element.name} {element.units} {element.measurementType}</li>
					))
				}
			</ul>

			<h2>steps:</h2>
			<ol>
				{
					orderedSteps.map((step) => (
						<li key={`step-${step.order}`}>{step.description}</li>
					))
				}
			</ol>
		</div>
	);
}
