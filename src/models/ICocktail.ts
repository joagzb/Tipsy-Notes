import type { MeasurementType, RecipeTag } from "./Types";

export interface ICocktail {
    id: string,
    title: string,
    author: string,
    date: Date,
    glass: string,
    tags: RecipeTag[],
    ingredients: ICocktailIngredient[]
    steps: ICocktailStep[],
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