import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/providers/store'
import type { TUser } from '../../../shared/lib/types'
import { getLocalUser, editLocalUser } from './thunks'

type UserState = {
	user: TUser | null
	isLoading: boolean
	isAuthenticated: boolean
	error: string | null
	successMessage: string | null
}

const initialState: UserState = {
	user: null,
	isLoading: false,
	isAuthenticated: false,
	error: null,
	successMessage: null,
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
		clearSuccessMessage(state) {
			state.successMessage = null
		},
	},
	extraReducers: (builder) => {
		builder
			// Обработка pending состояния
			.addCase(getLocalUser.pending, (state) => {
				state.isLoading = true
				state.error = null
				state.successMessage = null
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
				state.error =
					(action.payload as string) || 'Произошла неизвестная ошибка'
			})
			// Обработка editLocalUser
			.addCase(editLocalUser.pending, (state) => {
				state.isLoading = true
				state.error = null
				state.successMessage = null
			})
			.addCase(editLocalUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.user = action.payload
				state.error = null
				state.successMessage = 'Изменения успешно сохранены!'
			})
			.addCase(editLocalUser.rejected, (state, action) => {
				state.isLoading = false
				state.error =
					(action.payload as string) || 'Ошибка при редактировании профиля'
				state.successMessage = null
			})
	},
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions

export const selectUser = (state: RootState) => state.user.user
export const selectUserLoading = (state: RootState) => state.user.isLoading
export const selectIsAuthenticated = (state: RootState) =>
	state.user.isAuthenticated
export const selectUserError = (state: RootState) => state.user.error
export const selectSuccessMessage = (state: RootState) =>
	state.user.successMessage
