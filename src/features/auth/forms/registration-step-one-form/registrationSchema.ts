import * as yup from 'yup'

// Схема валидации
export const registrationSchema = yup.object({
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
