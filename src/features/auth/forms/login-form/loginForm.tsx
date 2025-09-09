import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import InputUI from '../../../../shared/ui/Input'
import { Button } from '../../../../shared/ui/Button'
import * as yup from 'yup'
import styles from './LoginForm.module.css'
import { getLocalUser } from '../../../../features/auth/model/thunks'
import { useDispatch } from '../../../../app/providers/store'

const loginSchema = yup.object({
	email: yup
		.string()
		.email('Введите корректный email')
		.required('Email обязателен для заполнения'),
	password: yup
		.string()
		.min(6, 'Пароль должен содержать минимум 6 символов')
		.required('Пароль обязателен для заполнения'),
})

export type LoginFormData = yup.InferType<typeof loginSchema>

export const LoginForm = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const {
		control,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
		reset,
		setError,
	} = useForm<LoginFormData>({
		resolver: yupResolver(loginSchema),
		mode: 'onChange',
	})

	const handleFormSubmit = async (data: LoginFormData) => {
		try {
			const result = await dispatch(getLocalUser(data)).unwrap()
			reset()
			navigate('/')
		} catch (error) {
			setError('root', {
				type: 'manual',
				message:
					typeof error === 'string' ? error : 'Произошла ошибка при входе',
			})
		}
	}

	const isFormInvalid = !isValid

	return (
		<form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
			<div className='form-group'>
				<Controller
					name='email'
					control={control}
					defaultValue=''
					render={({ field }) => (
						<InputUI
							label='Email'
							placeholder='Введите email'
							type='email'
							error={!!errors.email}
							textError={errors.email?.message || ''}
							helpText='Введите ваш email адрес'
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</div>

			<div className='form-group'>
				<Controller
					name='password'
					control={control}
					defaultValue=''
					render={({ field }) => (
						<InputUI
							label='Пароль'
							placeholder='Введите пароль'
							type='password'
							error={!!errors.password}
							textError={errors.password?.message || ''}
							helpText='Минимум 6 символов'
							value={field.value}
							onChange={field.onChange}
						/>
					)}
				/>
			</div>

			{/* Отображение общей ошибки формы */}
			{errors.root && (
				<div className={styles.error}>
					Пользователь с такими данными не найден
				</div>
			)}

			<Button
				variant='primary'
				disabled={isSubmitting || isFormInvalid}
				className={styles.button}
			>
				{isSubmitting ? 'Вход...' : 'Войти'}
			</Button>
		</form>
	)
}

export default LoginForm
