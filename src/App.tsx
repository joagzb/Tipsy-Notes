import { useCallback, useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { CocktailForm } from "./components/CocktailForm";
import { CocktailList } from "./components/CocktailList";
import { NotFound } from "./components/NotFound";
import './App.css'

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
			<Routes>
				<Route path="/" element={<CocktailList />} />
				<Route path="/home" element={<CocktailList />} />
				<Route path="/cocktails" element={<CocktailList />} />
				<Route path="/cocktails/new" element={<CocktailForm />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	)
}

export default App
