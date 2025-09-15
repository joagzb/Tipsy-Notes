import { useState } from "react";
import { type RecipeTag, type MeasurementType, RECIPE_TAGS } from "../models/Types";
import type { ICocktail, ICocktailIngredient, ICocktailStep } from "../models/ICocktail";
import { IngredientsFormEditor } from "./IngredientsFormEditor";
import { StepsFormEditor } from "./StepsFormEditor";

export function CocktailForm({ createCocktail }: { createCocktail: CallableFunction }) {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [glass, setGlass] = useState("");
	const [tags, setTags] = useState("");

	const [ingredients, setIngredients] = useState<ICocktailIngredient[]>([
		{ name: "", units: "", measurementType: "oz" as MeasurementType },
	]);

	const [steps, setSteps] = useState<ICocktailStep[]>([
		{ order: 1, description: "" },
	]);

	const toRecipeTags = (tag: string): RecipeTag[] => {
		const set = new Set(RECIPE_TAGS);

		return tag.split(",").map(s => s.trim().toLowerCase()).filter((s): s is RecipeTag => set.has(s as RecipeTag));
	};

	const resetForm = (): void => {
		setTitle("");
		setAuthor("");
		setGlass("");
		setTags("");
		setIngredients([
			{ name: "", units: "", measurementType: "oz" as MeasurementType },
		]);
		setSteps([
			{ order: 1, description: "" }
		]);
	}

	const onSubmitBtnClick = (e: React.FormEvent): void => {
		e.preventDefault();
		console.log({ title, author, glass, tags, ingredients: ingredients, steps: steps });

		const newCocktail: ICocktail = {
			id: crypto.randomUUID(),
			title: title,
			author: author,
			date: (new Date()),
			glass: glass,
			tags: toRecipeTags(tags),
			ingredients: ingredients,
			steps: steps,
		}

		createCocktail(newCocktail);

		resetForm();
	};


	return (
		<div>
			<form onSubmit={onSubmitBtnClick}>
				<input
					type="text"
					placeholder="title"
					minLength={0}
					maxLength={128}
					value={title}
					autoFocus
					onChange={(e) => setTitle(e.target.value)}
				/>
				<input
					type="text"
					placeholder="author's name"
					minLength={0}
					maxLength={128}
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
				/>
				<input
					type="text"
					placeholder="glass type"
					minLength={0}
					maxLength={128}
					value={glass}
					onChange={(e) => setGlass(e.target.value)}
				/>
				<input
					type="text"
					placeholder="tags (comma separated)"
					minLength={0}
					maxLength={128}
					value={tags}
					onChange={(e) => setTags(e.target.value)}
				/>

				<IngredientsFormEditor ingredients={ingredients} setIngredients={setIngredients} />
				<StepsFormEditor steps={steps} setSteps={setSteps}/>


				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
