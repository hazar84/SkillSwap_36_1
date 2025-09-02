import type { TUser, TApiResponse } from '../shared/lib/types'

// Получение всех пользователей
export const getUsers = (): Promise<TApiResponse<{ users: TUser[] }>> => {
	return fetch('/public/db/users.json')
		.then((response) => {
			if (!response.ok) {
				throw new Error('Ошибка при получении пользователей')
			}
			return response.json()
		})
		.then((data) => {
			// Преобразование строковых дат в объекты Date
			const transformedData = data.users.map((user: TUser) => ({
				...user,
				birthDate: new Date(user.birthDate),
				createdProfile: new Date(user.createdProfile),
			}))

			return {
				success: true as const,
				data: {
					users: transformedData,
				},
			}
		})
		.catch((error) => ({
			success: false as const,
			error: {
				message: `Ошибка получения пользователей: ${error.message}`,
			},
		}))
}
