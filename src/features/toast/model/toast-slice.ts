import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/providers/store'
import type { TToast } from './toast-types'

type ToastState = {
	items: TToast[]
}

const initialState: ToastState = {
	items: [],
}

const toastSlice = createSlice({
	name: 'toast',
	initialState,
	reducers: {
		// добавить уведомление
		addToast: {
			reducer(state, action: PayloadAction<TToast>) {
				state.items.push(action.payload)
			},
			prepare(toast: Partial<Omit<TToast, 'id' | 'createdAt'>>) {
				return {
					payload: {
						...toast,
						id: nanoid(),
						createdAt: new Date().toISOString(),
						isRead: false,
					} as TToast,
				}
			},
		},
		// удалить уведомление
		removeToast(state, action: PayloadAction<string>) {
			state.items = state.items.filter((toast) => toast.id !== action.payload)
		},
		// удалить все уведомления
		clearAllToasts(state) {
			state.items = []
		},
		// очистить прочитанные уведомления для конкретного юзера
		clearReadToastsForUser(state, action: PayloadAction<string>) {
			state.items = state.items.filter(
				(toast) => !(toast.userId === action.payload && toast.isRead)
			)
		},
		// очистить все уведомления для конкретного юзера
		clearToastsForUser(state, action: PayloadAction<string>) {
			state.items = state.items.filter(
				(toast) => toast.userId !== action.payload
			)
		},
		// поменять статус на "Прочитано" у одного уведомления
		markAsRead(state, action: PayloadAction<string>) {
			const toast = state.items.find((toast) => toast.id === action.payload)
			if (toast) {
				toast.isRead = true
			}
		},
		// поменять статус на "Прочитано" у нескольких уведомлений
		markMultipleAsRead(state, action: PayloadAction<string[]>) {
			const ids = action.payload
			state.items.forEach((toast) => {
				if (ids.includes(toast.id)) {
					toast.isRead = true
				}
			})
		},
	},
})

export const toastReducer = toastSlice.reducer
export const toastActions = toastSlice.actions

export const selectAllToasts = (state: RootState) => state.toast.items

export const selectToastsByUser = createSelector(
	[selectAllToasts, (_: RootState, userId: string) => userId],
	(toasts, userId) => toasts.filter((toast) => toast.userId === userId)
)
