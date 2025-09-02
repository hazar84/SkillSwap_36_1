import type { TSkill, TApiResponse } from '../shared/lib/types'

// Получение всех навыков
export const getSkills = (): Promise<TApiResponse<TSkill[]>> => {
	return fetch('/public/db/skills.json')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Ошибка при получении навыков')
			}
			return response.json()
		})
		.then((data: TSkill[]) => ({
			success: true as const,
			data: data,
		}))
		.catch((error) => ({
			success: false as const,
			error: {
				message: `Ошибка получения навыков: ${error.message}`,
			},
		}))
}
