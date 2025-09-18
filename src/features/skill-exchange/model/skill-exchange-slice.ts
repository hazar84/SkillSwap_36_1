{
	/*
// Создание обмена
dispatch(addExchange({
	skillId: 'skill-123',
	fromUserId: 'user-456', 
	toUserId: 'user-789'
}))

// Обновление статуса
dispatch(updateExchangeStatus({
	id: 'exchange-id-123',
	status: 'accepted'
}))

// Использование селекторов
const userSentExchanges = useSelector((state: RootState) => 
	selectExchangesSentByUser(state, 'user-456')
)

const pendingExchanges = useSelector(selectPendingExchanges)
    
    */
}

import type {
	TSkillExchange,
	TSkillExchangeStatus,
} from './skill-exchange-types'
import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/providers/store'

interface SkillExchangeState {
	exchanges: TSkillExchange[]
}

const initialState: SkillExchangeState = {
	exchanges: [],
}

interface CreateExchangeData {
	skillId: string
	fromUserId: string
	toUserId: string
}

const skillExchangeSlice = createSlice({
	name: 'skillExchange',
	initialState,
	reducers: {
		// Добавить обмен
		addExchange: {
			reducer: (state, action: PayloadAction<TSkillExchange>) => {
				state.exchanges.push(action.payload)
			},
			prepare: (payload: CreateExchangeData) => ({
				payload: {
					id: nanoid(),
					...payload,
					status: 'pending' as const,
				},
			}),
		},

		// Обновить статус обмена
		updateExchangeStatus: (
			state,
			action: PayloadAction<{ id: string; status: TSkillExchange['status'] }>
		) => {
			const exchange = state.exchanges.find((ex) => ex.id === action.payload.id)
			if (exchange) {
				exchange.status = action.payload.status
			}
		},

		// Удалить обмен
		removeExchange: (state, action: PayloadAction<string>) => {
			state.exchanges = state.exchanges.filter((ex) => ex.id !== action.payload)
		},

		// Очистить все обмены
		clearAllExchanges: (state) => {
			state.exchanges = []
		},
	},
})

export const {
	addExchange,
	updateExchangeStatus,
	removeExchange,
	clearAllExchanges,
} = skillExchangeSlice.actions

export const skillExchangeReducer = skillExchangeSlice.reducer

// Все обмены
export const selectAllExchanges = (state: RootState) =>
	state.skillExchange.exchanges

// Найти обмен по id
export const selectExchangeById = (state: RootState, id: string) =>
	state.skillExchange.exchanges.find((ex) => ex.id === id)

// Все обмены отправленные пользователем
export const selectExchangesSentByUser = createSelector(
	[selectAllExchanges, (_: RootState, userId: string) => userId],
	(exchanges, userId) => exchanges.filter((ex) => ex.fromUserId === userId)
)

// Все обмены полученные пользователем
export const selectExchangesReceivedByUser = (
	state: RootState,
	userId: string
) => state.skillExchange.exchanges.filter((ex) => ex.toUserId === userId)

// Все обмены по статусу
export const selectExchangesByStatus = (
	state: RootState,
	status: TSkillExchangeStatus
) => state.skillExchange.exchanges.filter((ex) => ex.status === status)
