import type { MeasurementType, RecipeTag } from "./Types";

export interface ICocktail {
    id: string,
    title: string,
		description: string,
    author: string,
    date: Date,
    glass: string,
    tags: RecipeTag[],
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