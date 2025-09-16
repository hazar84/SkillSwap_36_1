import React from 'react'
import { type UseFormReturn, Controller } from 'react-hook-form'
import InputUI from '../../../../shared/ui/Input/InputUI'
import Select from '../../../../shared/ui/Select/Select'
import FileDropZone from '../../../../shared/ui/FileDropZone/FileDropZone'
import { Button } from '../../../../shared/ui/Button/Button'
import styles from './RegistrationStepThreeForm.module.css'

export type FormValues = {
	teachCategoryId: string
	teachSubcategoryId: string
	skillName: string
	skillDescription: string
}

interface RegistrationStepThreeFormUIProps {
	methods: UseFormReturn<FormValues>
	categories: Array<{ id: string; name: string }>
	filteredSubcategories: Array<{ id: string; name: string }>
	selectedCategoryId: string
	onSubmit: (data: FormValues) => void
	goBack: () => void
}

const RegistrationStepThreeFormUI: React.FC<
	RegistrationStepThreeFormUIProps
> = ({
	methods,
	categories,
	filteredSubcategories,
	selectedCategoryId,
	onSubmit,
	goBack,
}) => {
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
				<Button
					type='button'
					variant='secondary'
					onClick={goBack}
					className={styles.button}
				>
					Назад
				</Button>

				{/* Кнопка продолжения */}
				<Button type='submit' variant='primary' className={styles.button}>
					Продолжить
				</Button>
			</div>
		</form>
	)
}

export default RegistrationStepThreeFormUI
