import { CocktailForm } from "./components/CocktailForm";
import { CocktailList } from "./components/CocktailList";
import type { ICocktail } from "./models/ICocktail";
import { cocktails as data } from "./repository/cocktails";
import { useState, useEffect, useCallback } from "react";

function App() {

	const [cocktails, setCocktails] = useState<ICocktail[]>([]);

	useEffect(() => {
		setCocktails(data);
	}, [])

	const createCocktail = useCallback((newCocktail: ICocktail) => {
		setCocktails((prev) => [...prev, newCocktail]);
	}, [setCocktails]);

	return (
		<>
			<CocktailForm createCocktail={createCocktail} />
			<CocktailList cocktails={cocktails} />
		</>
	)
}

export default App
