import type { FC } from 'react'
import { Button } from '../../../../shared/ui/Button'
import InputUI from '../../../../shared/ui/Input'
import styles from './RegistrationStepOneForm.module.css'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { registrationSchema } from './registrationSchema'
import { useDispatch } from '../../../../app/providers/store'
import { nextStep, updateStep1Data } from '../../model/registrationSlice'

type FormData = {
	email: string
	password: string
}

export const RegistrationStepOneForm: FC = () => {
	const navigate = useNavigate()
  const dispatch = useDispatch()

	const {
		control, // Контроллер для управления полями
		handleSubmit, // Функция обработки отправки данных
		formState: { errors, isValid, isSubmitting }, // Состояние формы
    reset // метод для очистки полей формы
	} = useForm<FormData>({
		resolver: yupResolver(registrationSchema), // Подключение Yup валидации
		mode: 'onChange', // Валидация при изменении полей
		defaultValues: {
			//Начальные значения
			email: '',
			password: '',
		},
	})

	// Обработчик отправки формы
	const onSubmit = (data: FormData) => {
		dispatch(updateStep1Data(data)) //сохраняем данные 
    dispatch(nextStep()) 
		navigate('/step-two') //переход к следующему шагу
    reset() // Очищаем поля формы
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
