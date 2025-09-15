import type { ICocktailStep, ICocktail } from "../models/ICocktail";

export function CocktailCard({ cocktail }: { cocktail: ICocktail }) {

	const orderCocktailSteps = (cocktailSteps: ICocktailStep[]) => {
		return cocktailSteps.sort((stepA, stepB) => stepA.order - stepB.order);
	}

	return (
		<div key={cocktail.id}>
			<h1>{cocktail.title}</h1>
			<h2>elements:</h2>
			<ul>
				{
					cocktail.ingredients.map((element) => (
						<li>{element.name} {element.units} {element.measurementType}</li>
					))
				}
			</ul>

			<h2>steps:</h2>
			<ol>
				{
					orderCocktailSteps(cocktail.steps).map((step) => (
						<li>{step.description}</li>
					))
				}
			</ol>
		</div>
	);
}