import type { TCategory, TApiResponse } from '../shared/lib/types'

// Получение всех категорий
export const getCategories = (): Promise<TApiResponse<TCategory[]>> => {
	return fetch('/public/db/categories.json')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Ошибка при получении категорий')
			}
			return response.json()
		})
		.then((data: TCategory[]) => ({
			success: true as const,
			data: data,
		}))
		.catch((error) => ({
			success: false as const,
			error: {
				message: `Ошибка получения категорий: ${error.message}`,
			},
		}))
}
