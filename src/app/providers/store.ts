import {
	configureStore,
	ThunkAction,
	Action,
	combineReducers,
} from '@reduxjs/toolkit'
import {
	TypedUseSelectorHook,
	useDispatch as dispatchHook,
	useSelector as selectorHook,
} from 'react-redux'

export const rootReducer = combineReducers({
  //импортируем и вписываем слайсы
});

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
