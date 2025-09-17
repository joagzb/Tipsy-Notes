import { useCallback, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { CocktailForm } from "./components/CocktailForm";
import { CocktailList } from "./components/CocktailList";

async function loadPreline() {
	return import('preline/dist/index.js');
}

function App() {
	const location = useLocation();

	const initPreline = useCallback(async () => {
		await loadPreline();

		if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
			window.HSStaticMethods.autoInit();
		}
	}, []);

	useEffect(() => {
		initPreline();
	}, [location.pathname, initPreline]);

	return (
		<>
			<CocktailForm />
			<CocktailList />
		</>
	)
}

export default App
