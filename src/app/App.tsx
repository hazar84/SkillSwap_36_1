// function App() {
// 	return <div>Hello, SkillSwap_36_1</div>
// }
import React from 'react'
import { useDispatch } from './providers/store'
import { cardsActions } from '../entities/cards/model/cardsSlice'
import {
	fetchCategories,
	fetchSubcategories,
} from '../entities/skills/model/skillsSlice'
import { getUsers } from '../api/users-api'
import { RelatedSkills } from '../widgets/related-skills'

export default function App() {
	const dispatch = useDispatch()

	React.useEffect(() => {
		dispatch(fetchCategories())
		dispatch(fetchSubcategories())
		getUsers().then((res) => {
			if (res.success) dispatch(cardsActions.setCards(res.data))
		})
	}, [dispatch])

	return (
		<div style={{ padding: 24 }}>
			<RelatedSkills categoryId='cat-01' />
		</div>
	)
}

// export default App

// import { RouterProvider } from "react-router-dom"
// import { router } from "./providers/router"
// export default function App() {
// 	return <RouterProvider router={router} />
// }
