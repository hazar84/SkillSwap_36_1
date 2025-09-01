import { subcategories } from '../../public/db/index'
import type { TSubcategory, TApiResponse } from '../shared/lib/types'

// Получение всех подкатегорий
export const getSubcategories = (): TApiResponse<TSubcategory[]> => {
	try {
		return {
			success: true,
			data: subcategories,
		}
	} catch {
		return {
			success: false,
			error: { message: 'Ошибка получения подкатегорий' },
		}
	}
}
