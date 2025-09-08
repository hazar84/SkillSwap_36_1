import type { TUser } from '../../../shared/lib/types'

export type TAuthUser = TUser & { password: string }

// Thunk для добавления пользователя в localStorage
export const addLocalUser = (user: TAuthUser) => {
	return async (): Promise<void> => {
		try {
			const storedUsers = localStorage.getItem('users')
			const existingUsers: TAuthUser[] = storedUsers
				? JSON.parse(storedUsers)
				: []
			const userExists = existingUsers.some((u) => u.email === user.email)

			if (userExists) {
				throw new Error('Пользователь с таким email уже существует')
			}
			const updatedUsers = [...existingUsers, user]

			localStorage.setItem('users', JSON.stringify(updatedUsers))
		} catch (error) {
			console.error('Ошибка при добавлении пользователя в localStorage:', error)
			throw error
		}
	}
}

// Thunk для поиска пользователя по email и паролю
export const getLocalUser = (email: string, password: string) => {
	return async (): Promise<TAuthUser> => {
		try {
			const storedUsers = localStorage.getItem('users')
			if (!storedUsers) {
				throw new Error('Пользователи не найдены')
			}

			const users: TAuthUser[] = JSON.parse(storedUsers)
			const foundUser = users.find(
				(user) => user.email === email && user.password === password
			)

			if (!foundUser) {
				throw new Error('Пользователь с такими учетными данными не найден')
			}

			const userWithDates: TAuthUser = {
				...foundUser,
				birthDate: new Date(foundUser.birthDate),
				createdProfile: new Date(foundUser.createdProfile),
			}

			return userWithDates
		} catch (error) {
			console.error('Ошибка при поиске пользователя в localStorage:', error)
			throw error
		}
	}
}
