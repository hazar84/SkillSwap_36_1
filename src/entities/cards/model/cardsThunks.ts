import { createAsyncThunk } from "@reduxjs/toolkit"
import { getUsers } from "../../../api/users-api"

export const fetchCards = createAsyncThunk(
	'cards/fetch',
	async (_, { rejectWithValue }) => {
		const response = await getUsers()
		if (response.success) {
			return response.data
		}
		return rejectWithValue(response.error.message)
	}
)
