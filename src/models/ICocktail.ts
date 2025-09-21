import type { GlassType, MeasurementType, RecipeCategory } from "./Types";

export interface ICocktail {
	id: string,
	title: string,
	description: string,
	author: string,
	date: Date,
	imageUrl: string,
	glass: GlassType,
	tags: RecipeCategory[],
	ingredients: ICocktailIngredient[]
	steps: ICocktailStep[],
	likes: number,
}

export interface ICocktailStep {
	order: number,
	description: string,
}

export interface ICocktailIngredient {
	name: string,
	units: string,
	measurementType: MeasurementType,
}