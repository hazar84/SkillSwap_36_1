import { createAsyncThunk } from '@reduxjs/toolkit'
import type { TUser } from '../../../shared/lib/types'

export type TAuthUser = TUser & { password: string }

// Thunk для добавления пользователя в localStorage
export const addLocalUser = createAsyncThunk(
	'user/addLocalUser',
	async (user: TAuthUser, { rejectWithValue }) => {
		try {
			const storedUsers = localStorage.getItem('users')
			const existingUsers: TAuthUser[] = storedUsers
				? JSON.parse(storedUsers)
				: []
			const userExists = existingUsers.some((u) => u.email === user.email)

			if (userExists) {
				return rejectWithValue('Пользователь с таким email уже существует')
			}

			const updatedUsers = [...existingUsers, user]
			localStorage.setItem('users', JSON.stringify(updatedUsers))

			return user
		} catch (error) {
			return rejectWithValue(`Ошибка при добавлении пользователя: ${error}`)
		}
	}
)

// Thunk для поиска пользователя по email и паролю
export const getLocalUser = createAsyncThunk(
	'user/getLocalUser',
	async (
		{ email, password }: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const storedUsers = localStorage.getItem('users')
			if (!storedUsers) {
				return rejectWithValue('Пользователи не найдены')
			}

			const users: TAuthUser[] = JSON.parse(storedUsers)
			const foundUser = users.find(
				(user) => user.email === email && user.password === password
			)

			if (!foundUser) {
				return rejectWithValue(
					'Пользователь с такими учетными данными не найден'
				)
			}

			const userWithDates: TAuthUser = {
				...foundUser,
				birthDate: new Date(foundUser.birthDate).toISOString(),
				createdProfile: new Date(foundUser.createdProfile).toISOString(),
			}

			return userWithDates
		} catch (error) {
			return rejectWithValue(`Ошибка при поиске пользователя: ${error}`)
		}
	}
)

//редактирование данных пользователя
export const editLocalUser = createAsyncThunk(
	'user/editLocalUser',
	async (user: TUser, { rejectWithValue }) => {
		try {
			const storedUsers = localStorage.getItem('users')
			const users: TUser[] = storedUsers ? JSON.parse(storedUsers) : [] // TAuthUser → TUser

			const userIndex = users.findIndex((u) => u.id === user.id)

			if (userIndex === -1) {
				return rejectWithValue('Пользователь не найден')
			}

			const updatedUsers = [...users]
			updatedUsers[userIndex] = user

			localStorage.setItem('users', JSON.stringify(updatedUsers))
			return user
		} catch (error) {
			return rejectWithValue(
				error instanceof Error
					? error.message
					: 'Ошибка при редактировании пользователя'
			)
		}
	}
)
