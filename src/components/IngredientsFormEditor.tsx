import type { Dispatch, SetStateAction } from "react";
import type { MeasurementType } from "../models/Types";
import type { ICocktailIngredient } from "../models/ICocktail";

export function IngredientsFormEditor({ ingredients, setIngredients }: { ingredients: ICocktailIngredient[]; setIngredients: Dispatch<SetStateAction<ICocktailIngredient[]>> }) {

	const addIngredient = (): void => {
		setIngredients((existing) => [
			...existing,
			{ name: "", units: "", measurementType: "oz" as MeasurementType },
		]);
	};

	const updateIngredient = (
		index: number,
		field: keyof ICocktailIngredient,
		value: string
	): void => {
		setIngredients((existingIngredients) => {
			const existing = [...existingIngredients];

			if (field === "measurementType") {
				existing[index] = {
					...existing[index],
					measurementType: value as MeasurementType,
				};
			} else if (field === "units" || field === "name") {
				existing[index] = {
					...existing[index],
					[field]: value,
				} as ICocktailIngredient;
			}

			return existing;
		});
	};

	const removeIngredient = (index: number): void => {
		setIngredients((existing) => existing.filter((_, i) => i !== index));
	};

	return (
		<div>
			<h3>Ingredients</h3>
			{ingredients.map((ingredient, idx) => (
				<div key={`ingr-${idx}`}>
					<input
						type="text"
						placeholder="ingredient name"
						value={ingredient.name}
						onChange={(e) => updateIngredient(idx, "name", e.target.value)}
					/>
					<input
						type="text"
						placeholder="units"
						value={ingredient.units}
						onChange={(e) => updateIngredient(idx, "units", e.target.value)}
					/>
					<select
						value={ingredient.measurementType}
						onChange={(e) => updateIngredient(idx, "measurementType", e.target.value)}
					>
						<option value="oz">oz</option>
						<option value="ml">ml</option>
					</select>
					<button type="button" onClick={() => removeIngredient(idx)}>
						Remove
					</button>
				</div>
			))}

			<button type="button" onClick={addIngredient}>
				+ Add Ingredient
			</button>
		</div>
	);
}
