import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalContextProvider } from './context/GlobalContext.tsx'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<GlobalContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</GlobalContextProvider>
	</StrictMode>,
)
