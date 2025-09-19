import type { TSubcategory, TApiResponse } from '../shared/lib/types'

// Получение всех подкатегорий
export const getSubcategories = (): Promise<TApiResponse<TSubcategory[]>> => {
	return fetch('/db/subcategories.json')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Ошибка при получении подкатегорий')
			}
			return response.json()
		})
		.then((data: TSubcategory[]) => ({
			success: true as const,
			data: data,
		}))
		.catch((error) => ({
			success: false as const,
			error: {
				message: `Ошибка получения подкатегорий: ${error.message}`,
			},
		}))
}
