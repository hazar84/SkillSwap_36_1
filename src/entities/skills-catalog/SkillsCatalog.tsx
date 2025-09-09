import { useState } from 'react'
import { useSelector, useDispatch } from '../../app/providers/store'
import { fetchCategories, fetchSubcategories, selectCategoriesForFilter } from '../skills/model/skillsSlice'
import { useEffect } from 'react'
import SkillsCatalogUI from './SkillsCatalogUI.tsx'

export type SkillsCatalogProps = {
	onSubcategoryClick?: (subcategoryId: string) => void
}

export const SkillsCatalog = ({ onSubcategoryClick }: SkillsCatalogProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const dispatch = useDispatch()
	const categories = useSelector(selectCategoriesForFilter)
	useEffect(() => {
		dispatch(fetchCategories())
		dispatch(fetchSubcategories())
	}, [dispatch])
	const toggleCatalog = () => setIsOpen(prev => !prev)
	const handleSubcategoryClick = (subcategoryId: string) => {
		onSubcategoryClick?.(subcategoryId)
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