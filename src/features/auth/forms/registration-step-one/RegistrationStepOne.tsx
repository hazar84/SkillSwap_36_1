import type { FC } from 'react'
import { Button } from '../../../../shared/ui/Button'
import InputUI from '../../../../shared/ui/Input'
import styles from './RegistrationStepOne.module.css'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'

type FormData = {
	email: string
	password: string
}

// Схема валидации
const RegistrationSchema = yup.object({
	//валидация email
	email: yup
		.string()
		.email('Введите корректный email')
		.required('Email обязателен для заполнения')
		//проверка существует ли указанный email
		.test('email-availability', 'Email уже используется', async (value) => {
			if (!value) return true
			await new Promise((resolve) => setTimeout(resolve, 500))
			return value !== 'petrov@mail.ru'
		}),
	// Валидация пароля
	password: yup
		.string()
		.required('Пароль обязателен для заполнения')
		.test(
			'password-strength',
			'Пароль должен содержать не менее 8 знаков', // Сообщение по умолчанию
			(value) => {
				if (!value) return false

				const hasUpperCase = /[A-ZА-Я]/.test(value) //Заглавные буквы кириллицы и латиницы
				const hasLowerCase = /[a-zа-я]/.test(value) //Строчные буквы кириллицы и латиницы
				const hasNumbers = /\d/.test(value) // Цифры
				const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value) //Спецсимволы
				const isLongEnough = value.length >= 8

				const throwError = (message: string) => {
					throw new yup.ValidationError(message, value, 'password')
				}

				// Детальная проверка с сообщениями
				if (!isLongEnough)
					throwError('Пароль должен содержать не менее 8 знаков')

				if (!hasUpperCase) throwError('Добавьте заглавные буквы')

				if (!hasLowerCase) throwError('Добавьте строчные буквы')

				if (!hasNumbers) throwError('Добавьте цифры')

				if (!hasSpecialChar) throwError('Добавьте специальные символы')

				return true // Пароль прошел все проверки
			}
		),
})

export const RegistrationStepOne: FC = () => {
	const navigate = useNavigate()

	const {
		control, // Контроллер для управления полями
		handleSubmit, // Функция обработки отправки данных
		formState: { errors, isValid, isSubmitting }, // Состояние формы
	} = useForm<FormData>({
		resolver: yupResolver(RegistrationSchema), // Подключение Yup валидации
		mode: 'onChange', // Валидация при изменении полей
		defaultValues: {
			//Начальные значения
			email: '',
			password: '',
		},
	})

	// Обработчик отправки формы
	const onSubmit = (data: FormData) => {
		localStorage.setItem('registrationData', JSON.stringify(data))
		navigate('/step-two')
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			{/* Поле Email */}
			<Controller
				name='email'
				control={control}
				render={({ field }) => (
					<InputUI
						{...field}
						label='Email'
						placeholder='Введите email'
						type='email'
						error={!!errors.email} // Boolean: наличие ошибки
						textError={errors.email?.message || ''} // Текст ошибки
						helpText={!field.value ? 'Введите ваш email адрес' : ''} // Подсказка
					/>
				)}
			/>

			{/* Поле Password */}
			<Controller
				name='password'
				control={control}
				render={({ field }) => (
					<InputUI
						{...field}
						label='Пароль'
						placeholder='Придумайте надёжный пароль'
						type='password'
						error={!!errors.password}
						textError={errors.password?.message || ''}
						helpText={
							!errors.password && field.value
								? 'Надёжный' // Если нет ошибок и есть значение
								: 'Пароль должен содержать не менее 8 знаков' // стандартная подсказка
						}
					/>
				)}
			/>

			<Button
				variant={'primary'}
				disabled={!isValid || isSubmitting} // Блокировка если форма невалидна или отправляется
				className={styles.button}
			>
				{isSubmitting ? 'Проверка...' : 'Далее'}
			</Button>
		</form>
	)
}
