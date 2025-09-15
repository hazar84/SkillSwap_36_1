import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../../../../app/providers/store'
import { prevStep, updateStep2Data } from '../../model/registrationSlice'
import {
	fetchCategories,
	fetchSubcategories,
	selectCategoriesForFilter,
} from '../../../../entities/skills/model/skillsSlice'
import { AvatarSelect } from '../../../../shared/ui/AvatarSelect'
import InputUI from '../../../../shared/ui/Input'
import { Select } from '../../../../shared/ui/Select'
import DataInput from '../../../../shared/ui/DataInput'
import { Button } from '../../../../shared/ui/Button'
import s from './registrationStepTwo.module.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

const RegistrationFormsSep2Schema = yup.object().shape({
	avatar: yup.string().required('Обязательное поле'),
	name: yup
		.string()
		.required('Обязательное поле')
		.min(2, 'Имя должно содержать минимум 2 символа')
		.matches(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, 'Имя может содержать только буквы'),
	birthDate: yup
		.date()
		.nullable()
		.required('Обязательное поле')
		.typeError('Введите корректную дату')
		.max(new Date(), 'Дата рождения не может быть в будущем')
		// Проверка на минимальный возраст (например, 12 лет)
		.test('is-over-twelve', 'Вам должно быть не менее 12 лет', (value) => {
			if (!value) return true
			const today = new Date()
			const birthDate = new Date(value)
			let age = today.getFullYear() - birthDate.getFullYear()
			const m = today.getMonth() - birthDate.getMonth()
			if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
				age--
			}
			return age >= 12
		})
		// Проверка на максимальный возраст (например, 120 лет)
		.test('is-reasonable-age', 'Укажите реальный возраст', (value) => {
			if (!value) return true
			const birthDate = new Date(value)
			const today = new Date()
			const age = today.getFullYear() - birthDate.getFullYear()
			return age <= 120
		}) as yup.Schema<Date | null>,
	gender: yup.string().required('Обязательное поле'),
	city: yup.string().required('Обязательное поле'),
	learnCategoryId: yup.string().required('Обязательное поле'),
	learnSubcategoryId: yup.string().required('Обязательное поле'),
})

const cities = [
	'Москва',
	'Санкт-Петербург',
	'Новосибирск',
	'Екатеринбург',
	'Казань',
] // города как в фильтре

type RegistrationFormData = yup.InferType<typeof RegistrationFormsSep2Schema>

export const RegistrationStep2: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()

	const categories = useSelector(selectCategoriesForFilter)

	const [availableSubcategories, setAvailableSubcategories] = useState<
		string[]
	>([])
	const triggeredOnce = useRef(false)

	// ФОрма
	const {
		control,
		handleSubmit,
		formState: { errors, isValid },
		watch,
		setValue,
		trigger,
	} = useForm<RegistrationFormData>({
		resolver: yupResolver(RegistrationFormsSep2Schema),
		defaultValues: {
			avatar: '',
			name: '',
			birthDate: null,
			gender: '',
			city: '',
			learnCategoryId: '',
			learnSubcategoryId: '',
		},
		mode: 'onChange',
	})

	const selectedCategory = watch('learnCategoryId')

	// Загрузка данных при монтировании
	useEffect(() => {
		dispatch(fetchCategories())
		dispatch(fetchSubcategories())
	}, [dispatch])

	// Обновление подкатегорий при изменении категории
	useEffect(() => {
		if (selectedCategory) {
			const categorySubcategories =
				categories
					.find((cat) => cat.id === selectedCategory)
					?.subcategories.map((sub) => sub.name) || []
			setAvailableSubcategories(categorySubcategories)

			setValue('learnSubcategoryId', '')
			trigger('learnSubcategoryId')
		} else {
			setAvailableSubcategories([])
		}
	}, [selectedCategory, categories, setValue, trigger])

	//Обработчик отправки формы
	const handleFormSubmit = (data: RegistrationFormData) => {
		if (!data.birthDate) {
			return
		}

		const selectedSubcategory = categories
			.find((cat) => cat.id === data.learnCategoryId)
			?.subcategories.find((sub) => sub.name === data.learnSubcategoryId)

		if (selectedSubcategory) {
			dispatch(
				updateStep2Data({
					name: data.name,
					birthDate: data.birthDate,
					gender: data.gender as 'Мужской' | 'Женский',
					city: data.city,
					avatarUrl: data.avatar,
					learnSubcategoryId: selectedSubcategory.id,
				})
			)
			navigate('/registration/step3')
		}
	}

	//Обработчик кнопки "Назад"
	const handleBackClick = () => {
		dispatch(prevStep())
		navigate('/registration/step1')
	}

	//Активирует валидацию при первом взаимодействии
	const handleFormClick = () => {
		if (!triggeredOnce.current) {
			triggeredOnce.current = true
			trigger()
		}
	}

	return (
		<div className={s.container}>
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				onClick={handleFormClick}
				className={s.form}
			>
				{/* Аватар */}
				<div className={s.avatarSection}>
					<Controller
						name='avatar'
						control={control}
						render={({ field }) => (
							<AvatarSelect
								value={field.value || ''}
								onChange={field.onChange}
							/>
						)}
					/>
				</div>

				{/* Имя */}
				<div className={s.name}>
					<Controller
						name='name'
						control={control}
						render={({ field }) => (
							<InputUI
								label='Имя'
								placeholder='Введите ваше имя'
								type='text'
								error={!!errors.name}
								textError={errors.name?.message || ''}
								helpText=''
								value={field.value}
								onChange={field.onChange}
								onBlur={field.onBlur}
							/>
						)}
					/>
				</div>

				{/* Дата рождения и пол - одна строка */}
				<div className={s.dateGenderContainer}>
					<div>
						<Controller
							name='birthDate'
							control={control}
							render={({ field, fieldState }) => (
								<DataInput
									label='Дата рождения'
									value={field.value || null}
									onChange={field.onChange}
									id='birthDate'
									error={fieldState.error?.message}
								/>
							)}
						/>
					</div>

					<div>
						<Controller
							name='gender'
							control={control}
							render={({ field, fieldState }) => (
								<Select
									label='Пол'
									placeholder='Не указан'
									error={fieldState.error?.message}
									value={field.value}
									valueList={['Мужской', 'Женский']}
									onChange={field.onChange}
								/>
							)}
						/>
					</div>
				</div>

				{/* Город */}
				<div className={s.city}>
					<Controller
						name='city'
						control={control}
						render={({ field, fieldState }) => (
							<Select
								label='Город'
								placeholder='Не указан'
								error={fieldState.error?.message}
								value={field.value}
								valueList={cities}
								onChange={field.onChange}
							/>
						)}
					/>
				</div>

				{/* Категория */}
				<div className={s.category}>
					<Controller
						name='learnCategoryId'
						control={control}
						render={({ field, fieldState }) => (
							<Select
								label='Категория навыка, которому хотите научиться'
								placeholder='Выберите категорию'
								error={fieldState.error?.message}
								value={
									categories.find((cat) => cat.id === field.value)?.name || ''
								}
								valueList={categories.map((cat) => cat.name)}
								onChange={(categoryName) => {
									const category = categories.find(
										(cat) => cat.name === categoryName
									)
									if (category) {
										field.onChange(category.id)
									}
								}}
							/>
						)}
					/>
				</div>

				{/* Подкатегория  */}
				<div className={s.subcategory}>
					<Controller
						name='learnSubcategoryId'
						control={control}
						render={({ field, fieldState }) => (
							<Select
								label='Подкатегория навыка, которому хотите научиться'
								placeholder='Выберите подкатегорию'
								error={fieldState.error?.message}
								value={field.value}
								valueList={availableSubcategories}
								onChange={field.onChange}
							/>
						)}
					/>
				</div>

				{/* Кнопки */}
				<div className={s.buttonsContainer}>
					<Button
						variant='secondary'
						onClick={handleBackClick}
						className={s.button}
					>
						Назад
					</Button>
					<Button
						variant='primary'
						disabled={!isValid}
						onClick={handleSubmit(handleFormSubmit)}
						className={s.button}
					>
						Продолжить
					</Button>
				</div>
			</form>
		</div>
	)
}

export default RegistrationStep2
