import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from '../../../app/providers/store'
import {
	fetchCategories,
	fetchSubcategories,
	selectCategoriesForFilter,
} from '../../../entities/skills/model/skillsSlice'
import { filtersActions, selectSkillIds } from '../model/filtersSlice'
import { SkillsFilterUI } from './skillsFilterUI'
import type { TCategory, TSubcategory } from '../../../shared/lib/types'

export type TCategoryWithSubcategories = TCategory & {
	subcategories: TSubcategory[]
}

export const SkillsFilter: React.FC = () => {
	const dispatch = useDispatch()

	const categoriesForFilter = useSelector(selectCategoriesForFilter)
	const selectedSubcategoryIds = useSelector(selectSkillIds)

	const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
		new Set()
	)
	const [activatedCategories, setActivatedCategories] = useState<Set<string>>(
		new Set()
	)

	useEffect(() => {
		dispatch(fetchCategories())
		dispatch(fetchSubcategories())
	}, [dispatch])

	const categoryCheckboxStates = useMemo(() => {
		const states: Record<string, 'empty' | 'partial' | 'checked'> = {}
		for (const category of categoriesForFilter) {
			const subcategoryIds = category.subcategories.map((sc) => sc.id)
			const totalSubcategories = subcategoryIds.length

			if (totalSubcategories === 0) {
				states[category.id] = 'empty'
				continue
			}

			const selectedCount = subcategoryIds.filter((id) =>
				selectedSubcategoryIds.includes(id)
			).length

			if (selectedCount === totalSubcategories) {
				states[category.id] = 'checked'
			} else if (selectedCount > 0 || activatedCategories.has(category.id)) {
				states[category.id] = 'partial'
			} else {
				states[category.id] = 'empty'
			}
		}
		return states
	}, [categoriesForFilter, selectedSubcategoryIds, activatedCategories])

	const handleCategoryClick = useCallback(
		(category: TCategoryWithSubcategories) => {
			const currentState = categoryCheckboxStates[category.id]

			if (currentState === 'checked' || currentState === 'partial') {
				setExpandedCategories((prev) => {
					const newSet = new Set(prev)
					newSet.delete(category.id)
					return newSet
				})
				setActivatedCategories((prev) => {
					const newSet = new Set(prev)
					newSet.delete(category.id)
					return newSet
				})
				const subcategoryIds = category.subcategories.map((sc) => sc.id)
				const newSelectedSkillIds = selectedSubcategoryIds.filter(
					(id) => !subcategoryIds.includes(id)
				)
				dispatch(filtersActions.setSkillIds(newSelectedSkillIds))
			} else {
				setExpandedCategories((prev) => new Set(prev).add(category.id))
				setActivatedCategories((prev) => new Set(prev).add(category.id))
			}
		},
		[categoryCheckboxStates, dispatch, selectedSubcategoryIds]
	)

	const handleSelectSubcategory = useCallback(
		(subcategoryId: string, e: React.MouseEvent) => {
			e.stopPropagation()
			const newSelectedSkillIds = selectedSubcategoryIds.includes(subcategoryId)
				? selectedSubcategoryIds.filter((id) => id !== subcategoryId)
				: [...selectedSubcategoryIds, subcategoryId]
			dispatch(filtersActions.setSkillIds(newSelectedSkillIds))
		},
		[selectedSubcategoryIds, dispatch]
	)

	return (
		<SkillsFilterUI
			subcategories={categoriesForFilter}
			selectedSubcategoryIds={selectedSubcategoryIds}
			expandedCategories={expandedCategories}
			categoryCheckboxStates={categoryCheckboxStates}
			onCategoryClick={handleCategoryClick}
			onSelectSubcategory={handleSelectSubcategory}
		/>
	)
}
