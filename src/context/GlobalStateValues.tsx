import type { ICocktail } from "../models/ICocktail";

export type GlobalStateValues = {
	cocktails: ICocktail[];
	createCocktail: (newCocktail: ICocktail) => void;
	onLikeToggleCocktail: (id: string, isLiked: boolean) => boolean;
};