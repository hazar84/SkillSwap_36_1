import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputUI from '../../../../shared/ui/Input/InputUI'
import Select from '../../../../shared/ui/Select/Select'
import FileDropZone from '../../../../shared/ui/FileDropZone/FileDropZone'
import { Button } from '../../../../shared/ui/Button/Button'
import { useDispatch, useSelector } from '../../../../app/providers/store'
import {
	updateStep3Data,
	generateSkillId,
	setCreatedDate,
} from '../../model/registrationSlice'
import { useNavigate } from 'react-router-dom'
import styles from './RegistrationStepThreeForm.module.css'
import { setRussianLocalization } from './validationMessages.ts'
import {
	selectCategories,
	selectSubcategories,
	fetchCategories,
	fetchSubcategories,
} from '../../../../entities/skills/model/skillsSlice.ts'

type FormValues = {
	teachCategoryId: string
	teachSubcategoryId: string
	skillName: string
	skillDescription: string
}

setRussianLocalization()

const schema = yup.object().shape({
	teachCategoryId: yup.string().required('Категория обязательна'),
	teachSubcategoryId: yup.string().required('Подкатегория обязательна'),
	skillName: yup
		.string()
		.required('Название навыка обязательно')
		.min(3, 'Название навыка должно быть минимум 3 символа')
		.max(50, 'Максимум 50 символов'),
	skillDescription: yup
		.string()
		.required('Описание навыка обязательно')
		.min(10, 'Описание должно быть минимум 10 символов')
		.max(200, 'Максимум 200 символов'),
})

const RegistrationStepThreeForm: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const categories = useSelector(selectCategories)
	const subcategories = useSelector(selectSubcategories)

	const methods = useForm<FormValues>({
		resolver: yupResolver(schema),
		mode: 'onChange',
	})

	useEffect(() => {
		dispatch(fetchCategories())
		dispatch(fetchSubcategories())
	}, [dispatch])

	// Создаем маппинг названий категорий к их ID
	const categoryNameToIdMap: Record<string, string> = {}
	const categoryIdToNameMap: Record<string, string> = {}
	categories.forEach((cat) => {
		categoryNameToIdMap[cat.name] = cat.id
		categoryIdToNameMap[cat.id] = cat.name
	})

	// Создаем маппинг названий подкатегорий к их ID
	const subcategoryNameToIdMap: Record<string, string> = {}
	const subcategoryIdToNameMap: Record<string, string> = {}
	subcategories.forEach((sub) => {
		subcategoryNameToIdMap[sub.name] = sub.id
		subcategoryIdToNameMap[sub.id] = sub.name
	})

	// Получаем выбранное название категории
	const selectedCategoryName = methods.watch('teachCategoryId')

	// Находим ID выбранной категории
	const selectedCategoryId = categoryNameToIdMap[selectedCategoryName]

	// Фильтруем подкатегории для выбранной категории
	const filteredSubcategories = subcategories.filter(
		(sub) => sub.categoryId === selectedCategoryId
	)

	const onSubmit = async (data: FormValues) => {
		// Преобразуем названия обратно в ID перед отправкой
		const formDataWithIds = {
			...data,
			teachCategoryId:
				categoryNameToIdMap[data.teachCategoryId] || data.teachCategoryId,
			teachSubcategoryId:
				subcategoryNameToIdMap[data.teachSubcategoryId] ||
				data.teachSubcategoryId,
		}

		await dispatch(updateStep3Data(formDataWithIds))
		await dispatch(generateSkillId())
		await dispatch(setCreatedDate())
		navigate('/registration/step4')
	}

	const goBack = () => {
		navigate('/registration/step2')
	}

	return (
		<form onSubmit={methods.handleSubmit(onSubmit)} className={styles.form}>
			{/* Название навыка */}
			<Controller
				name='skillName'
				control={methods.control}
				render={({ field }) => (
					<InputUI
						label='Название навыка'
						placeholder='Введите название вашего навыка'
						type='text'
						error={!!methods.formState.errors.skillName}
						textError={methods.formState.errors.skillName?.message || ''}
						value={field.value}
						onChange={field.onChange}
					/>
				)}
			/>

			{/* Категория */}
			<Controller
				name='teachCategoryId'
				control={methods.control}
				render={({ field }) => (
					<Select
						label='Категория навыка'
						placeholder='Выберите категорию навыка'
						value={field.value}
						valueList={categories.map((cat) => cat.name)}
						onChange={field.onChange}
						showError={!!methods.formState.errors.teachCategoryId}
						error={methods.formState.errors.teachCategoryId?.message}
					/>
				)}
			/>

			{/* Подкатегория */}
			<Controller
				name='teachSubcategoryId'
				control={methods.control}
				render={({ field }) => (
					<Select
						label='Подкатегория навыка'
						placeholder={
							selectedCategoryId
								? 'Выберите подкатегорию навыка'
								: 'Сначала выберите категорию'
						}
						value={field.value}
						valueList={filteredSubcategories.map((sub) => sub.name)}
						onChange={field.onChange}
						showError={!!methods.formState.errors.teachSubcategoryId}
						error={methods.formState.errors.teachSubcategoryId?.message}
						disabled={!selectedCategoryId}
					/>
				)}
			/>

			{/* Описание навыка */}
			<Controller
				name='skillDescription'
				control={methods.control}
				render={({ field }) => (
					<InputUI
						height={96}
						label='Описание навыка'
						placeholder='Коротко опишите, чему можете научить'
						type='text'
						error={!!methods.formState.errors.skillDescription}
						textError={methods.formState.errors.skillDescription?.message || ''}
						value={field.value}
						onChange={field.onChange}
					/>
				)}
			/>

			{/* Загрузка изображений */}
			<FileDropZone onFileUpload={() => console.log('Файл загружен')} />

			<div className={styles.buttonGroup}>
				{/* Кнопка шаг назад */}
				<Button variant='secondary' onClick={goBack} className={styles.button}>
					Назад
				</Button>

				{/* Кнопка продолжения */}
				<Button variant='primary' className={styles.button}>
					Продолжить
				</Button>
			</div>
		</form>
	)
}

export default RegistrationStepThreeForm
