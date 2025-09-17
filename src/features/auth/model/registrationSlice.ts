{
	/*
    Шаг 1 - регистрации:

dispatch(updateStep1Data({ 
  email: 'user@example.com', 
  password: 'password123' 
}))
dispatch(nextStep())
    
    Шаг 2 - регистрации:

dispatch(updateStep2Data({
  name: 'Иван Иванов',
  birthDate: new Date('1990-01-01'),
  gender: 'Мужской',
  city: 'Москва',
  avatarUrl: 'https://example.com/avatar.jpg',
  learnSubcategoryId: 'javascript-subcat-id'
}))
dispatch(nextStep())    
    
    Шаг 3 - Регистрации:

dispatch(updateStep3Data({
  teachCategoryId: 'design-cat-id',
  teachSubcategoryId: 'ui-design-subcat-id',
  skillName: 'UI/UX дизайн',
  skillDescription: 'Профессиональный дизайнер с опытом работы',
  skillImages: ['https://example.com/design1.jpg']
}))


// Завершение регистрации
dispatch(generateUserId())
dispatch(generateSkillId())
dispatch(setCreatedDate())

// Отправка данных
const userData: TAuthUser = {
  ...state.userData,
  id: state.userData.id!,
  email: state.userData.email!,
  password: state.userData.password!,
  name: state.userData.name!,
  birthDate: state.userData.birthDate!,
  gender: state.userData.gender!,
  city: state.userData.city!,
  createdProfile: state.userData.createdProfile!,
  skillCanTeach: state.userData.skillCanTeach!,
  subcategoriesWantToLearn: state.userData.subcategoriesWantToLearn || [],
  likes: [],
  favorites: [],
  skillExchanges: []
} as TAuthUser

dispatch(addLocalUser(userData))
    
    */}

import type { RootState } from '../../../app/providers/store'
import { addLocalUser } from './thunks'
import type { TAuthUser } from './thunks'
import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Состояние для формы регистрации
interface RegistrationState {
	currentStep: number
	userData: Partial<TAuthUser>
	isLoading: boolean
	error: string | null
	isRegistered: boolean
}

// Начальное состояние
const initialState: RegistrationState = {
	currentStep: 1,
	userData: {
		id: '',
		name: '',
		email: '',
		password: '',
		birthDate: '',
		gender: 'Мужской' as const,
		city: '',
		avatarUrl: '',
		createdProfile: '',
		skillCanTeach: {
			id: '',
			subcategoryId: '',
			name: '',
			description: '',
			images: [],
		},
		subcategoriesWantToLearn: [],
		likes: [],
		favorites: [],
		skillExchanges: [],
	},
	isLoading: false,
	error: null,
	isRegistered: false,
}

const registrationSlice = createSlice({
	name: 'registration',
	initialState,
	reducers: {
		nextStep: (state) => {
			if (state.currentStep < 3) {
				state.currentStep += 1
			}
		},

		prevStep: (state) => {
			if (state.currentStep > 1) {
				state.currentStep -= 1
			}
		},

		updateStep1Data: (
			state,
			action: PayloadAction<{ email: string; password: string }>
		) => {
			state.userData.email = action.payload.email
			state.userData.password = action.payload.password
		},

		updateStep2Data: (
			state,
			action: PayloadAction<{
				name: string
				birthDate: Date
				gender: 'Мужской' | 'Женский'
				city: string
				avatarUrl?: string
				learnSubcategoryId: string
			}>
		) => {
			state.userData.name = action.payload.name
			state.userData.birthDate = action.payload.birthDate.toISOString()
			state.userData.gender = action.payload.gender
			state.userData.city = action.payload.city
			state.userData.avatarUrl = action.payload.avatarUrl
			state.userData.subcategoriesWantToLearn = [
				action.payload.learnSubcategoryId,
			]
		},

		updateStep3Data: (
			state,
			action: PayloadAction<{
				teachCategoryId: string
				teachSubcategoryId: string
				skillName: string
				skillDescription: string
				skillImages?: string[]
			}>
		) => {
			if (state.userData.skillCanTeach) {
				state.userData.skillCanTeach.name = action.payload.skillName
				state.userData.skillCanTeach.description =
					action.payload.skillDescription
				state.userData.skillCanTeach.images = action.payload.skillImages || []
				state.userData.skillCanTeach.subcategoryId =
					action.payload.teachSubcategoryId
			}
		},

		addWantToLearnSubcategories: (state, action: PayloadAction<string[]>) => {
			state.userData.subcategoriesWantToLearn = [
				...(state.userData.subcategoriesWantToLearn || []),
				...action.payload,
			]
		},

		resetRegistration: (state) => {
			state.currentStep = 1
			state.userData = initialState.userData
			state.isLoading = false
			state.error = null
			state.isRegistered = false
		},

		generateUserId: (state) => {
				state.userData.id = nanoid()
		},

		generateSkillId: (state) => {
			if (state.userData.skillCanTeach ) {
				state.userData.skillCanTeach.id = nanoid()
			}
		},

		setCreatedDate: (state) => {
			state.userData.createdProfile = new Date().toISOString()
		},

		clearError: (state) => {
			state.error = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(addLocalUser.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(addLocalUser.fulfilled, (state, action) => {
				state.isLoading = false
				state.isRegistered = true
				state.userData = initialState.userData
				state.currentStep = 1
			})
			.addCase(addLocalUser.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
	},
})

export const {
	nextStep,
	prevStep,
	updateStep1Data,
	updateStep2Data,
	updateStep3Data,
	addWantToLearnSubcategories,
	resetRegistration,
	generateUserId,
	generateSkillId,
	setCreatedDate,
	clearError,
} = registrationSlice.actions

export const selectRegistrationData = (state: RootState) => state.registration.userData


export const registrationReducer = registrationSlice.reducer;
