import type { TUser, TApiResponse } from '../shared/lib/types'

// Получение всех пользователей
export const getUsers = (): Promise<TApiResponse<TUser[]>> => {
	return fetch('/db/users.json')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Ошибка при получении пользователей')
			}
			return response.json()
		})
		.then((data) => {
			return {
				success: true as const,
				data,
			}
		})
		.catch((error) => ({
			success: false as const,
			error: {
				message: `Ошибка получения пользователей: ${error.message}`,
			},
		}))
}
