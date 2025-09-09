import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/providers/store'
import type { TUser } from '../../../shared/lib/types'
import { getLocalUser } from './thunks'

type UserState = {
	user: TUser | null
	isLoading: boolean
	isAuthenticated: boolean
	error: string | null
}

const initialState: UserState = {
	user: null,
	isLoading: false,
	isAuthenticated: false,
	error: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<TUser>) {
			state.user = action.payload
			state.isAuthenticated = true
		},
		clearUser(state) {
			state.user = null
			state.isAuthenticated = false
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			// Обработка pending состояния
			.addCase(getLocalUser.pending, (state) => {
				state.isLoading = true
				state.error = null // Очищаем предыдущие ошибки при начале нового запроса
			})
			// Обработка fulfilled состояния (успех)
			.addCase(getLocalUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload
				state.isAuthenticated = true
				state.error = null
			})
			// Обработка rejected состояния (неудача)
			.addCase(getLocalUser.rejected, (state, action) => {
				state.isLoading = false
				state.isAuthenticated = false
				state.user = null
				state.error = action.payload as string || 'Произошла неизвестная ошибка'
			})
	},
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions

export const selectUser = (state: RootState) => state.user.user
export const selectUserLoading = (state: RootState) => state.user.isLoading
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated
