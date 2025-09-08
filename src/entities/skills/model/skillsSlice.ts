import {
	createSlice,
	createAsyncThunk,
	createSelector,
	isPending,
	isRejected,
	isFulfilled,
} from '@reduxjs/toolkit'
import type { RootState } from '../../../app/providers/store'
import { getCategories } from '../../../api/categories-api'
import { getSubcategories } from '../../../api/subcategories-api'
import { getSkills } from '../../../api/skills-api'
import type { TCategory, TSubcategory, TSkill } from '../../../shared/lib/types'

interface SkillsState {
	categories: TCategory[]
	subcategories: TSubcategory[]
	skills: TSkill[]
	loading: boolean
	error: string | null
}

const initialState: SkillsState = {
	categories: [],
	subcategories: [],
	skills: [],
	loading: false,
	error: null,
}

export const fetchCategories = createAsyncThunk(
	'skills/fetchCategories',
	async (_, { rejectWithValue }) => {
		const response = await getCategories()
		if (response.success) {
			return response.data
		}
		return rejectWithValue(response.error.message)
	}
)

export const fetchSubcategories = createAsyncThunk(
	'skills/fetchSubcategories',
	async (_, { rejectWithValue }) => {
		const response = await getSubcategories()
		if (response.success) {
			return response.data
		}
		return rejectWithValue(response.error.message)
	}
)

export const fetchSkills = createAsyncThunk(
	'skills/fetchSkills',
	async (_, { rejectWithValue }) => {
		const response = await getSkills()
		if (response.success) {
			return response.data
		}
		return rejectWithValue(response.error.message)
	}
)

const skillsSlice = createSlice({
	name: 'skills',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCategories.fulfilled, (state, action) => {
				state.categories = action.payload
			})
			.addCase(fetchSubcategories.fulfilled, (state, action) => {
				state.subcategories = action.payload
			})
			.addCase(fetchSkills.fulfilled, (state, action) => {
				state.skills = action.payload
			})

			.addMatcher(
				isPending(fetchCategories, fetchSubcategories, fetchSkills),
				(state) => {
					state.loading = true
					state.error = null
				}
			)
			.addMatcher(
				isFulfilled(fetchCategories, fetchSubcategories, fetchSkills),
				(state) => {
					state.loading = false
				}
			)
			.addMatcher(
				isRejected(fetchCategories, fetchSubcategories, fetchSkills),
				(state, action) => {
					state.loading = false
					state.error = action.payload as string
				}
			)
	},
})

export const skillsReducer = skillsSlice.reducer

export const selectCategories = (state: RootState) => state.skills.categories
export const selectSubcategories = (state: RootState) =>
	state.skills.subcategories
export const selectAllSkills = (state: RootState) => state.skills.skills
export const selectSkillsLoading = (state: RootState) => state.skills.loading
export const selectSkillsError = (state: RootState) => state.skills.error

// Комбинированный селектор для фильтра
export const selectCategoriesForFilter = createSelector(
	[selectCategories, selectSubcategories],
	(categories, subcategories) => {
		const subcategoriesByCategoryId: Record<string, TSubcategory[]> = {}
		subcategories.forEach((sub) => {
			if (!subcategoriesByCategoryId[sub.categoryId]) {
				subcategoriesByCategoryId[sub.categoryId] = []
			}
			subcategoriesByCategoryId[sub.categoryId].push(sub)
		})

		return categories.map((category) => ({
			...category,
			subcategories: subcategoriesByCategoryId[category.id] || [],
		}))
	}
)

export const selectSubcategoryToCategoryMap = createSelector(
  [selectSubcategories], // Зависит только от списка подкатегорий
  (subcategories) => {
    // createSelector кэширует результат. Этот код выполнится, только если subcategories изменятся.
    return subcategories.reduce<Record<string, string>>((acc, sub) => {
      acc[sub.id] = sub.categoryId;
      return acc;
    }, {});
  }
);