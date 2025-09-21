import { Routes, Route } from 'react-router-dom';
import { CocktailForm } from "./components/CocktailForm";
import { CocktailList } from "./components/CocktailList";
import { NotFound } from "./components/NotFound";
import './App.css'


function App() {

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
