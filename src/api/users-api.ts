import { users } from '../../public/db/index'
import type { TUser, TApiResponse } from '../shared/lib/types'

// Получение всех навыков
export const getUsers = (): TApiResponse<TUser[]> => {
	try {
		// Безопасное приведение типов с преобразованием дат
		return {
			success: true,
			data: (
				users as unknown as {
					birthDate: string
					createdProfile: string
				}[]
			).map((user) => ({
				...user,
				birthDate: new Date(user.birthDate),
				createdProfile: new Date(user.createdProfile),
			})) as TUser[],
		}
	} catch {
		return {
			success: false,
			error: { message: 'Ошибка получения пользователей' },
		}
	}
}
