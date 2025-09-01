import { categories } from '../../public/db/index'
import type { TCategory, TApiResponse } from '../shared/lib/types'

// Получение всех категорий
export const getCategories = (): TApiResponse<TCategory[]> => {
	try {
		return {
			success: true,
			data: categories,
		}
	} catch {
		return {
			success: false,
			error: { message: 'Ошибка получения категорий' },
		}
	}
}
