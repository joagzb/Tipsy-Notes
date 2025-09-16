import { createContext, useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { ICocktail } from "../models/ICocktail";
import { cocktails as data } from "../repository/cocktails";

type AppContextValues = {
	cocktails: ICocktail[];
	createCocktail: (newCocktail: ICocktail) => void;
	onLikeToggleCocktail: (id: string, isLiked: boolean) => boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextValues>({} as AppContextValues);

export function AppContextProvider({ children }: { children: ReactNode }) {

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
			const likes = isLiked ? found.likes + 1 : Math.max(0, found.likes - 1);
			next[idx] = { ...found, likes };
			return next;
		});
		return updated;
	}, [setCocktails]);

	useEffect(() => {
		setCocktails(data);
	}, [])

	return (
		<AppContext.Provider value={{
			cocktails: cocktails,
			createCocktail: createCocktail,
			onLikeToggleCocktail: onLikeToggleCocktail,
		}}>
			{children}
		</AppContext.Provider>
	);
}
