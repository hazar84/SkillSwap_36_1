import { configureStore, combineReducers } from '@reduxjs/toolkit'
import type { ThunkAction, Action } from '@reduxjs/toolkit'
import {
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import { cardsReducer } from '../../entities/cards/model/cardsSlice'
import { filtersReducer } from '../../features/filters/model/filtersSlice.ts'
import { userReducer } from '../../features/auth/model/userSlice.ts'
import { skillsReducer } from '../../entities/skills/model/skillsSlice.ts'
import { registrationReducer } from '../../features/auth/model/registrationSlice.ts'
import { toastReducer } from '../../features/toast/model/toast-slice.ts'
import { skillExchangeReducer } from '../../features/skill-exchange/model/skill-exchange-slice.ts'
export const rootReducer = combineReducers({
	cards: cardsReducer,
	filters: filtersReducer,
	user: userReducer,
	skills: skillsReducer,
	registration: registrationReducer,
	toast: toastReducer,
	skillExchange: skillExchangeReducer,
	//импортируем и вписываем слайсы
})

const store = configureStore({
	reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = () => dispatchHook()
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook

export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>

export default store
