import { useState, useEffect, useCallback } from 'react'
import type { TUser } from '../../../shared/lib/types'

export type TAuthUser = TUser & { password: string }

export const useLocalUsers = () => {
	const [users, setUsers] = useState<TAuthUser[]>([])

	// Загрузка пользователей из localStorage при монтировании
	useEffect(() => {
		const loadUsers = () => {
			try {
				const storedUsers = localStorage.getItem('users')
				if (storedUsers) {
					const parsedUsers = JSON.parse(storedUsers)
					const usersWithDates = parsedUsers.map((user: any) => ({
						...user,
						birthDate: new Date(user.birthDate),
						createdProfile: new Date(user.createdProfile),
					}))
					setUsers(usersWithDates)
				} else {
					setUsers([])
				}
			} catch (error) {
				console.error(
					'Ошибка при загрузке пользователей из localStorage:',
					error
				)
				setUsers([])
			}
		}

		loadUsers()
	}, [])

    // Функция для добавления нового пользователя
	const addUser = useCallback((newUser: TAuthUser) => {
		setUsers((prevUsers) => {
			const userExists = prevUsers.some((user) => user.email === newUser.email)

			if (userExists) {
				throw new Error('Пользователь с таким email уже существует')
			}

			const updatedUsers = [...prevUsers, newUser]

			try {
				localStorage.setItem('users', JSON.stringify(updatedUsers))
			} catch (error) {
				console.error(
					'Ошибка при сохранении пользователей в localStorage:',
					error
				)
			}

			return updatedUsers
		})
	}, [])

	return {
		users,
		addUser,
	}
}
