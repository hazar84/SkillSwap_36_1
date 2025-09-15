import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './profileUpdateForm.module.css'
import InputUI from '../../../shared/ui/Input'
import { Button } from '../../../shared/ui/Button'
import { useDispatch, useSelector } from '../../../app/providers/store'
import {
	selectUser,
	selectUserError,
	selectSuccessMessage,
	userActions, // Правильный импорт
} from '../../auth/model/userSlice'
import { editLocalUser } from '../../auth/model/thunks'
import { useEffect, useState } from 'react'
import { Select } from '../../../shared/ui/Select'
import DataInput from '../../../shared/ui/DataInput'
import { AvatarSelect } from '../../../shared/ui/AvatarSelect'
import type { TUser } from '../../../shared/lib/types'
import type { RootState } from '../../../app/providers/store'

const updateProfileSchema = yup.object({
	avatar: yup.string().required('Обязательное поле'),
	email: yup
		.string()
		.email('Введите корректный email')
		.required('Email обязателен для заполнения'),
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
		.test('is-reasonable-age', 'Укажите реальный возраст', (value) => {
			if (!value) return true
			const birthDate = new Date(value)
			const today = new Date()
			const age = today.getFullYear() - birthDate.getFullYear()
			return age <= 120
		}) as yup.Schema<Date | null>,
	gender: yup.string().required('Обязательное поле'),
	city: yup.string().required('Обязательное поле'),
	aboutUser: yup.string().required('Обязательное поле'),
})

const cities = [
	'Москва',
	'Санкт-Петербург',
	'Новосибирск',
	'Екатеринбург',
	'Казань',
]

type UpdateProfileFormData = yup.InferType<typeof updateProfileSchema>

const UpdateProfileForm: React.FC = () => {
	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isDirty },
		reset,
	} = useForm<UpdateProfileFormData>({
		resolver: yupResolver(updateProfileSchema),
		mode: 'onChange',
	})
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	const isLoading = useSelector((state: RootState) => state.user.isLoading)
	const isSubmitDisabled = !isValid || !isDirty || isLoading
	const error = useSelector(selectUserError)
	const successMessage = useSelector(selectSuccessMessage)
	const [showSuccess, setShowSuccess] = useState(false)

	useEffect(() => {
		if (user) {
			reset({
				avatar: user.avatarUrl || '',
				email: user.email || '',
				name: user.name || '',
				birthDate: user.birthDate ? new Date(user.birthDate) : null,
				gender: user.gender || '',
				city: user.city || '',
				aboutUser: user.aboutUser || '',
			})
		}
	}, [user, reset])

	useEffect(() => {
		if (successMessage) {
			setShowSuccess(true)
			const timer = setTimeout(() => {
				setShowSuccess(false)
				dispatch(userActions.clearSuccessMessage()) // Исправлено здесь
			}, 3000)

			return () => clearTimeout(timer)
		}
	}, [successMessage, dispatch])

	const onSubmit = async (data: UpdateProfileFormData) => {
		if (!user) {
			console.error('Пользователь не найден')
			return
		}

		try {
			const updatedUser: TUser = {
				...user,
				avatarUrl: data.avatar,
				email: data.email,
				name: data.name,
				birthDate: data.birthDate ? data.birthDate.toISOString() : '',
				gender: data.gender as 'Мужской' | 'Женский',
				city: data.city,
				aboutUser: data.aboutUser,
			}
			await dispatch(editLocalUser(updatedUser)).unwrap()
		} catch (error) {
			console.error('Ошибка при обновлении профиля:', error)
		}
	}

	return (
		<div className={styles.container}>
			<form className={styles.form}>
				{/* Аватар */}
				<div className={styles.inputAvatar}>
					<Controller
						name='avatar'
						control={control}
						render={({ field }) => (
							<AvatarSelect
								value={field.value}
								onChange={field.onChange}
								size={'large'}
							/>
						)}
					/>
				</div>
				<div className={styles.inputsForm}>
					{/* Email */}
					<div className={styles.inputEmail}>
						<Controller
							control={control}
							name='email'
							render={({ field }) => (
								<InputUI
									label='Email'
									placeholder='Введите ваш email'
									type='text'
									error={!!errors.email}
									textError={errors.email?.message || ''}
									helpText=''
									value={field.value}
									onChange={field.onChange}
									onBlur={field.onBlur}
								/>
							)}
						/>
						<Button
							className='greenColor'
							variant='tertiary'
							onClick={() => alert('Change password')}
						>
							Изменить пароль
						</Button>
					</div>
					{/* Имя */}
					<div className={styles.inputName}>
						<Controller
							control={control}
							name='name'
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
					<div className={styles.dateGenderContainer}>
						<div className={styles.date}>
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

						<div className={styles.gender}>
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
					<div className={styles.city}>
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
					{/* О себе */}
					<div className={styles.aboutUser}>
						<Controller
							name='aboutUser'
							control={control}
							render={({ field }) => (
								<InputUI
									label='О себе'
									placeholder='Напишите о себе'
									type='text'
									error={!!errors.aboutUser}
									textError={errors.aboutUser?.message || ''}
									helpText=''
									value={field.value}
									onChange={field.onChange}
									onBlur={field.onBlur}
								/>
							)}
						/>
					</div>

					<div className={styles.buttonContainer}>
						<Button
							variant='primary'
							disabled={isSubmitDisabled}
							className={styles.buttonSubmit}
							onClick={handleSubmit(onSubmit)}
						>
							{isLoading ? 'Загрузка...' : 'Сохранить'}
						</Button>
						{error && <div className={styles.errorMessage}>{error}</div>}
						{showSuccess && (
							<div className={styles.successMessage}>{successMessage}</div>
						)}
					</div>
				</div>
			</form>
		</div>
	)
}

export default UpdateProfileForm
