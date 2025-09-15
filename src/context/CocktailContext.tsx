import { createContext, useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { ICocktail } from "../models/ICocktail";
import { cocktails as data } from "../repository/cocktails";

type AppContextValue = {
	cocktails: ICocktail[];
	createCocktail: (newCocktail: ICocktail) => void;
};

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext<AppContextValue>({} as AppContextValue);

export function AppContextProvider({ children }: { children: ReactNode }) {

	const [cocktails, setCocktails] = useState<ICocktail[]>([]);

	const createCocktail = useCallback((newCocktail: ICocktail) => {
		setCocktails((prev) => [...prev, newCocktail]);
	}, [setCocktails]);

	useEffect(() => {
		setCocktails(data);
	}, [])

	return (
		<AppContext.Provider value={{
			cocktails: cocktails,
			createCocktail: createCocktail,
		}}>
			{children}
		</AppContext.Provider>
	);
}
