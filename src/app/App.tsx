import { useEffect } from 'react'
import { useDispatch } from './providers/store'
import { fetchCards } from '../entities/cards/model/cardsThunks'
import {
	fetchCategories,
	fetchSubcategories,
} from '../entities/skills/model/skillsSlice'
import { RouterProvider } from 'react-router-dom'
import { router } from './providers/router'

function App() {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchCards())
		dispatch(fetchCategories())
		dispatch(fetchSubcategories())
	}, [dispatch])

	return <RouterProvider router={router} />
}

export default App

// import { RouterProvider } from "react-router-dom"
// import { router } from "./providers/router"
// export default function App() {
// 	return <RouterProvider router={router} />
// }
