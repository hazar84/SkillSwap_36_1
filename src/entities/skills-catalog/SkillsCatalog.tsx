import { useState } from 'react'
import { useSelector, useDispatch } from '../../app/providers/store'
import { selectCategoriesForFilter } from '../skills/model/skillsSlice'
import { filtersActions } from '../../features/filters/model/filtersSlice'
import SkillsCatalogUI from './SkillsCatalogUI'

export const SkillsCatalog = () => {
	const [isOpen, setIsOpen] = useState(false)
	const dispatch = useDispatch()
	const categories = useSelector(selectCategoriesForFilter)

	const toggleCatalog = () => setIsOpen((prev) => !prev)

	const handleSubcategoryClick = (subcategoryId: string) => {
		dispatch(filtersActions.setSkillIds([subcategoryId]))
		setIsOpen(false)
	}

	return (
		<SkillsCatalogUI
			categories={categories}
			isOpen={isOpen}
			onToggle={toggleCatalog}
			onSubcategoryClick={handleSubcategoryClick}
		/>
	)
}

export default SkillsCatalog
