import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from '../../../app/providers/store'
import {
	fetchSkillsData,
	selectCategories,
	selectError,
	selectLoading,
	type TCategoryWithSubcategories,
} from '../../../entities/skills/model/skillsSlice'
import { filtersActions, selectSkillIds } from '../model/filtersSlice'
import { SkillsFilterUI } from './skillsFilterUI'

export const SkillsFilter: React.FC = () => {
	const dispatch = useDispatch()

	const skills = useSelector(selectCategories)
	const selectedSkillIds = useSelector(selectSkillIds)
	const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
		new Set()
	)
	const [activatedCategories, setActivatedCategories] = useState<Set<string>>(
		new Set()
	)
	useEffect(() => {
		dispatch(fetchSkillsData())
	}, [dispatch])

	const categoryCheckboxStates = useMemo(() => {
		const states: Record<string, 'empty' | 'partial' | 'checked'> = {}
		for (const category of skills) {
			const subcategoryIds = category.subcategories.map((sc) => sc.id)
			const totalSubcategories = subcategoryIds.length

			if (totalSubcategories === 0) {
				states[category.id] = 'empty'
				continue
			}

			const selectedCount = subcategoryIds.filter((id) =>
				selectedSkillIds.includes(id)
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
	}, [skills, selectedSkillIds, activatedCategories])

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
				const newSelectedSkillIds = selectedSkillIds.filter(
					(id) => !subcategoryIds.includes(id)
				)
				dispatch(filtersActions.setSkillIds(newSelectedSkillIds))
			} else {
				setExpandedCategories((prev) => new Set(prev).add(category.id))
				setActivatedCategories((prev) => new Set(prev).add(category.id))
			}
		},
		[categoryCheckboxStates, dispatch, selectedSkillIds]
	)

	const handleSelectSubcategory = useCallback(
		(subcategoryId: string, e: React.MouseEvent) => {
			e.stopPropagation()
			const newSelectedSkillIds = selectedSkillIds.includes(subcategoryId)
				? selectedSkillIds.filter((id) => id !== subcategoryId)
				: [...selectedSkillIds, subcategoryId]
			dispatch(filtersActions.setSkillIds(newSelectedSkillIds))
		},
		[selectedSkillIds, dispatch]
	)

	return (
		<SkillsFilterUI
			subcategories={skills}
			selectedSubcategoryIds={selectedSkillIds}
			expandedCategories={expandedCategories}
			categoryCheckboxStates={categoryCheckboxStates}
			onCategoryClick={handleCategoryClick}
			onSelectSubcategory={handleSelectSubcategory}
		/>
	)
}
