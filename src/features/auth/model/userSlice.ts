import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/providers/store'
import type { TUser } from '../../../shared/lib/types'

type UserState = {
	user: TUser | null
	isLoading: boolean
	isAuthenticated: boolean
}

const initialState: UserState = {
	user: null,
	isLoading: false,
	isAuthenticated: false,
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
})

export const userReducer = userSlice.reducer
export const userActions = userSlice.actions

export const selectUser = (state: RootState) => state.user.user
export const selectUserLoading = (state: RootState) => state.user.isLoading
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated
