import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppContextProvider } from './context/CocktailContext.tsx'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
		<AppContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</AppContextProvider>
  </StrictMode>,
)
