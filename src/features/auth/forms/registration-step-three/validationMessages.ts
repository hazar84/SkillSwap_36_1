import * as yup from 'yup'

// Интерфейс для описания формата сообщений
interface ValidationMessages {
	mixed: {
		required: string
		notType: string
	}
	string: {
		min: string
		max: string
		length: string
		matches: string
	}
	number: {
		min: string
		max: string
	}
}

// Русские переводы
const messages: ValidationMessages = {
	mixed: {
		required: '${path} обязателен',
		notType: '${path} не соответствует требуемому типу',
	},
	string: {
		min: '${path} должен содержать минимум ${min} символов',
		max: '${path} должен содержать максимум ${max} символов',
		length: '${path} должен содержать ровно ${length} символов',
		matches: '${path} не соответствует указанному шаблону',
	},
	number: {
		min: '${path} должен быть больше или равен ${min}',
		max: '${path} должен быть меньше или равен ${max}',
	},
}

// Экспорт объектов с правильной локализацией
export function setRussianLocalization(): void {
	yup.setLocale(messages)
}

// Предоставляем возможность экспорта настроек
export default messages
