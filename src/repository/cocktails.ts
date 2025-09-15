import type { ICocktail } from "../models/ICocktail";

export const cocktails: ICocktail[] = [
	{
		id: "2o8f73hdncsdsdmnfb82oh",
		title: "Daikiri",
		author: "somebody",
		date: new Date("2025-05-12"),
		glass: "martini",
		tags: ["classic", "fresh", "strong"],
		ingredients: [
			{
				name: "Rhum",
				units: "2",
				measurementType: "oz"
			},
			{
				name: "Lime juice",
				units: "3/4",
				measurementType: "oz"
			},
			{
				name: "Simple Syrup",
				units: "3/4",
				measurementType: "oz"
			}
		],
		steps: [
			{
				order: 1,
				description: "put the liquids inside a shaker"
			},
			{
				order: 2,
				description: "put ice inside the shaker"

			},
			{
				order: 3,
				description: "shake for 10 seconds"

			},
			{
				order: 4,
				description: "double strain into a martini cup"

			},
			{
				order: 5,
				description: "twist a lemon over the cup"
			},
			{
				order: 6,
				description: "decorate with a lemon skyn"
			},
		]
	}
];