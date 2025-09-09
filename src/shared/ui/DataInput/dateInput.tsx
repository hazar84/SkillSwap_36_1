import React, { forwardRef, useRef, useState, type ChangeEvent } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ru } from 'date-fns/locale/ru' // Импорт русской локали

import 'react-datepicker/dist/react-datepicker.css' // Стили для календаря
import s from './dateInput.module.css'
import type { KeyboardEvent } from 'react'
import { Button } from '../Button'

registerLocale('ru', ru)

const CustomInputWithIcon = forwardRef<
	HTMLInputElement,
	{
		value?: string
		onChange?: (e: ChangeEvent<HTMLInputElement>) => void
		onClick?: () => void
		onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
	}
>(({ value, onChange, onClick, onKeyDown }, ref) => {
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const digitsOnly = event.target.value.replace(/[^\d]/g, '')
		const day = digitsOnly.slice(0, 2)
		const month = digitsOnly.slice(2, 4)
		const year = digitsOnly.slice(4, 8)
		let formattedValue = day
		if (digitsOnly.length > 2) formattedValue = `${day}.${month}`
		if (digitsOnly.length > 4) formattedValue = `${day}.${month}.${year}`

		event.target.value = formattedValue
		if (onChange) {
			onChange(event)
		}
	}
	return (
		<div className={s.inputContainer}>
			<input
				type='text'
				className={s.customDateInput}
				value={value}
				onChange={handleInputChange}
				onClick={onClick}
				onKeyDown={onKeyDown}
				ref={ref}
				placeholder='дд.мм.гггг'
				autoComplete='off'
				maxLength={10}
			/>
			<img
				src='/icons/calendar.svg'
				alt='Открыть календарь'
				className={s.calendarIcon}
				onClick={onClick}
			/>
		</div>
	)
})
CustomInputWithIcon.displayName = 'CustomInputWithIcon'

const DataInput: React.FC = () => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)
	const [dateOnOpen, setDateOnOpen] = useState<Date | null>(null)

	const datepickerRef = useRef<DatePicker>(null)

	const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			datepickerRef.current?.setOpen(false)
		}
	}
	const handleSelectClick = () => {
		datepickerRef.current?.setOpen(false)
	}

	const handleCancelClick = () => {
		setSelectedDate(dateOnOpen)
		datepickerRef.current?.setOpen(false)
	}

	return (
		<DatePicker
			ref={datepickerRef}
			selected={selectedDate}
			onChange={(date) => setSelectedDate(date)}
			shouldCloseOnSelect={false}
			onCalendarOpen={() => setDateOnOpen(selectedDate)}
			onClickOutside={handleCancelClick}
			customInput={<CustomInputWithIcon onKeyDown={handleInputKeyDown} />}
			dateFormat='dd.MM.yyyy'
			locale='ru'
			showMonthDropdown
			showYearDropdown
			dropdownMode='select'
			popperPlacement='bottom-start'
		>
			<div className={s.calendarButton}>
				<Button variant='secondary' onClick={handleCancelClick}>
					Отменить
				</Button>
				<Button variant='primary' onClick={handleSelectClick}>
					Выбрать
				</Button>
			</div>
		</DatePicker>
	)
}
export default DataInput
