import { createContext, useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { ICocktail } from "../models/ICocktail";
import { cocktails as data } from "../repository/cocktails";
import type { GlobalStateValues } from "./GlobalStateValues";

// eslint-disable-next-line react-refresh/only-export-components
export const GlobalContext = createContext<GlobalStateValues>({} as GlobalStateValues);

export function GlobalContextProvider({ children }: { children: ReactNode }) {
	const [cocktails, setCocktails] = useState<ICocktail[]>([]);

	const createCocktail = useCallback((newCocktail: ICocktail) => {
		setCocktails((existing) => [...existing, newCocktail]);
	}, [setCocktails]);

	const onLikeToggleCocktail = useCallback((id: string, isLiked: boolean) => {
		let updated = false;
		setCocktails((existing) => {
			const idx = existing.findIndex((c) => c.id === id);
			if (idx < 0) {
				return existing;
			}
			updated = true;
			const next = [...existing];
			const found = next[idx];
			const likes = isLiked ? found.likeCounter + 1 : Math.max(0, found.likeCounter - 1);
			next[idx] = { ...found, likeCounter: likes, liked: isLiked };
			return next;
		});
		return updated;
	}, [setCocktails]);

	useEffect(() => {
		setCocktails(data);
	}, [])


	return (
		<GlobalContext.Provider value={{
			cocktails: cocktails,
			createCocktail: createCocktail,
			onLikeToggleCocktail: onLikeToggleCocktail,
		}}>
			{children}
		</GlobalContext.Provider>
	);
}
