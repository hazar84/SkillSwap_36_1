import React, { forwardRef, useRef, useState, type ChangeEvent, type FocusEvent } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { ru } from 'date-fns/locale/ru' // Импорт русской локали

import 'react-datepicker/dist/react-datepicker.css' // Стили для календаря
import s from './dateInput.module.css'
import type { KeyboardEvent } from 'react'
import { Button } from '../Button'
import { isValid, parse } from 'date-fns'

registerLocale('ru', ru)
type CustomInputProps = {
    value?: string
    onClick?: () => void
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void
    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void
    id?: string
    error?: string
}
const CustomInputWithIcon = forwardRef<HTMLInputElement, CustomInputProps>(
    ({ value, onClick, onChange, onKeyDown, id, onBlur, error  }, ref) => (
        <div className={s.inputContainer}>
            <input
                type='text'
				className={`${s.customDateInput} ${error ? s.error : ''}`}
				value={value}
				onChange={onChange}
				onClick={onClick}
				onKeyDown={onKeyDown}
                onBlur={onBlur}
				id={id}
				ref={ref}
				placeholder='дд.мм.гггг'
				autoComplete='off'
				maxLength={10}
            />
            <button
                type="button"
                className={s.calendarIcon}
                onClick={onClick}
                aria-label="Открыть календарь"
            >
                <img src="/icons/calendar.svg" alt="" />
            </button>
        </div>
    )
)
CustomInputWithIcon.displayName = 'CustomInputWithIcon'

type DataInputProps = {
	value: Date | null
	onChange: (date: Date | null) => void
	label: string
	id?: string
    error?: string
}

const DataInput: React.FC<DataInputProps> = ({
    value,
    onChange,
    label,
    id = 'date-input',
    error,
}) => {
    const [dateOnOpen, setDateOnOpen] = useState<Date | null>(null)
    const [inputError, setInputError] = useState<string | null>(null)
    const datepickerRef = useRef<DatePicker>(null)

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (
            !/[\d.]/.test(event.key) &&
            !['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(event.key) &&
            !((event.ctrlKey || event.metaKey) && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase()))
        ) {
            event.preventDefault()
        }
    }

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        const dateString = event.target.value
        if (!dateString) {
            onChange(null)
            setInputError(null)
            return
        }

        const parsedDate = parse(dateString, 'dd.MM.yyyy', new Date())
        if (isValid(parsedDate) && dateString.length === 10) {
            onChange(parsedDate)
            setInputError(null)
        } else {
            onChange(null)
            setInputError('Неверный формат даты')
        }
    }

    const handleSelectClick = () => {
        datepickerRef.current?.setOpen(false)
    }

    const handleCancelClick = () => {
        onChange(dateOnOpen)
        setInputError(null)
        datepickerRef.current?.setOpen(false)
    }

      const handleDateChange = (date: Date | null) => {
        onChange(date)
        setInputError(null)
    }

     const displayedError = inputError || error

    return (
        <div className={s.dateInputContainer}>
            <label htmlFor={id} className={s.dateInputLabel}>
                {label}
            </label>
            <DatePicker
                ref={datepickerRef}
                selected={value}
                onChange={handleDateChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                onCalendarOpen={() => setDateOnOpen(value)}
                shouldCloseOnSelect={false}
                onClickOutside={handleCancelClick}
                customInput={<CustomInputWithIcon id={id} error={displayedError} />}
                dateFormat="dd.MM.yyyy"
                locale="ru"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                popperPlacement="bottom-start"
            >
                <div className={s.calendarButton}>
                    <Button variant="secondary" onClick={handleCancelClick}>
                        Отменить
                    </Button>
                    <Button variant="primary" onClick={handleSelectClick}>
                        Выбрать
                    </Button>
                </div>
            </DatePicker>
            {displayedError && <p className={s.errorText}>{displayedError}</p>}
        </div>
    )
}
export default DataInput
