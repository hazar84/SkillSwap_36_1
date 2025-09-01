import { skills } from '../../public/db/index'
import type { TSkill, TApiResponse } from '../shared/lib/types'

// Получение всех навыков
export const getSkills = (): TApiResponse<TSkill[]> => {
	try {
		return {
			success: true,
			data: skills,
		}
	} catch {
		return {
			success: false,
			error: { message: 'Ошибка получения навыков' },
		}
	}
}
