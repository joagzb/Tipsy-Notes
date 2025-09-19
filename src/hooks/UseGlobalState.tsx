import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export const UseGlobalState = () => {
	const context = useContext(GlobalContext);
	return context
}