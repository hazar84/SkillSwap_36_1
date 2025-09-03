import { useState, useEffect } from 'react'

import type { TCategory, TSubcategory } from '../../../shared/lib/types'
import { getCategories } from '../../../api/categories-api'
import { getSubcategories } from '../../../api/subcategories-api'

export type TCategoryWithSubcategories = TCategory & {
	subcategories: TSubcategory[]
}

export const useSkillsData = () => {
	const [skills, setSkills] = useState<TCategoryWithSubcategories[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [categoriesResponse, subcategoriesResponse] = await Promise.all([
					getCategories(),
					getSubcategories(),
				])

				if (!categoriesResponse.success)
					throw new Error(categoriesResponse.error.message)
				if (!subcategoriesResponse.success)
					throw new Error(subcategoriesResponse.error.message)

				const { data: categories } = categoriesResponse
				const { data: subcategories } = subcategoriesResponse

				const subcategoriesByCategoryId = subcategories.reduce(
					(acc, sub) => {
						;(acc[sub.categoryId] = acc[sub.categoryId] || []).push(sub)
						return acc
					},
					{} as Record<string, TSubcategory[]>
				)

				const combinedData = categories.map((category) => ({
					...category,
					subcategories: subcategoriesByCategoryId[category.id] || [],
				}))

				setSkills(combinedData)
			} catch (e: any) {
				setError(e.message || 'Не удалось загрузить данные')
			} finally {
				setIsLoading(false)
			}
		}

		fetchData()
	}, [])

	return { skills, isLoading, error }
}
