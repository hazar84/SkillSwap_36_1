import {
	createSlice,
	createAsyncThunk,
	type PayloadAction,
} from '@reduxjs/toolkit'
import { getCategories } from '../../../api/categories-api'
import { getSubcategories } from '../../../api/subcategories-api'
import type {
	TCategory,
	TSubcategory,
	TApiResponse,
} from '../../../shared/lib/types'

export type TCategoryWithSubcategories = TCategory & {
	subcategories: TSubcategory[]
}

interface SkillsState {
	categories: TCategoryWithSubcategories[]
	loading: boolean
	error: string | null
}

const initialState: SkillsState = {
	categories: [],
	loading: false,
	error: null,
}

// Async Thunk
export const fetchSkillsData = createAsyncThunk<
	TCategoryWithSubcategories[],
	void,
	{ rejectValue: string }
>('skills/fetchSkillsData', async (_, { rejectWithValue }) => {
	const [categoriesResponse, subcategoriesResponse]: [
		TApiResponse<TCategory[]>,
		TApiResponse<TSubcategory[]>,
	] = await Promise.all([getCategories(), getSubcategories()])

	if (!categoriesResponse.success) {
		return rejectWithValue(categoriesResponse.error.message)
	}
	if (!subcategoriesResponse.success) {
		return rejectWithValue(subcategoriesResponse.error.message)
	}

	const { data: categories } = categoriesResponse
	const { data: subcategories } = subcategoriesResponse

	const subcategoriesByCategoryId = subcategories.reduce(
		(acc, sub) => {
			;(acc[sub.categoryId] = acc[sub.categoryId] || []).push(sub)
			return acc
		},
		{} as Record<string, TSubcategory[]>
	)

	const combinedData = categories.map((category) => ({
		...category,
		subcategories: subcategoriesByCategoryId[category.id] || [],
	}))

	return combinedData
})

const skillsSlice = createSlice({
	name: 'skills',
	initialState,
	reducers: {},
	selectors: {
		selectCategories: (state) => state.categories,
		selectLoading: (state) => state.loading,
		selectError: (state) => state.error,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSkillsData.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(
				fetchSkillsData.fulfilled,
				(state, action: PayloadAction<TCategoryWithSubcategories[]>) => {
					state.loading = false
					state.categories = action.payload
				}
			)
			.addCase(fetchSkillsData.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload ?? 'Произошла неизвестная ошибка'
			})
	},
})

export const skillsReducer = skillsSlice.reducer

export const { selectCategories, selectLoading, selectError } =
	skillsSlice.selectors
