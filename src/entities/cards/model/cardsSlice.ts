import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../app/providers/store'
import type { TUser } from '../../../shared/lib/types.ts'

type CardsState = {
	items: TUser[]
	isLoading: boolean
	error: string | null
}

const initialState: CardsState = {
	items: [],
	isLoading: false,
	error: null,
}

const cardsSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		setCards(state, action: PayloadAction<TUser[]>) {
			state.items = action.payload
		},
		setLoading(state, action: PayloadAction<boolean>) {
			state.isLoading = action.payload
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload
		},
	},
})

export const cardsReducer = cardsSlice.reducer
export const cardsActions = cardsSlice.actions

export const selectCards = (state: RootState) => state.cards.items
export const selectCardsLoading = (state: RootState) => state.cards.isLoading
export const selectCardsError = (state: RootState) => state.cards.error