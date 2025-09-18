import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUsers } from '../../../api/users-api'

export const fetchCards = createAsyncThunk(
	'cards/fetch',
	async (_, { rejectWithValue }) => {
		const response = await getUsers()
		if (response.success) {
			const storedUsers = localStorage.getItem('users')
			const lokalUsers = storedUsers ? JSON.parse(storedUsers) : []
			const data = [...lokalUsers, ...response.data]
			return data
		}
		return rejectWithValue(response.error.message)
	}
)
