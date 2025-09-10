import React, { forwardRef, useRef, useState, type ChangeEvent } from 'react'
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
    id?: string
}
const CustomInputWithIcon = forwardRef<HTMLInputElement, CustomInputProps>(
    ({ value, onClick, onChange, onKeyDown, id }, ref) => (
        <div className={s.inputContainer}>
            <input
                type='text'
				className={s.customDateInput}
				value={value}
				onChange={onChange}
				onClick={onClick}
				onKeyDown={onKeyDown}
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
}

const DataInput: React.FC<DataInputProps> = ({
    value,
    onChange,
    label,
    id = 'date-input',
}) => {
    const [dateOnOpen, setDateOnOpen] = useState<Date | null>(null)
    const datepickerRef = useRef<DatePicker>(null)

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (
            !/[\d.]/.test(event.key) &&
            !['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(event.key) &&
            !((event.ctrlKey || event.metaKey) && ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase()))
        ) {
            event.preventDefault()
        }

        if (event.key === 'Enter') {
            event.preventDefault()
            const target = event.target as HTMLInputElement;
            const dateString = target.value;
            
            const parsedDate = parse(dateString, 'dd.MM.yyyy', new Date())

            if (isValid(parsedDate)) {
                onChange(parsedDate)
                datepickerRef.current?.setOpen(false)
            }
        }
    }

    const handleSelectClick = () => {
        datepickerRef.current?.setOpen(false)
    }

    const handleCancelClick = () => {
        onChange(dateOnOpen)
        datepickerRef.current?.setOpen(false)
    }

    return (
        <div className={s.dateInputContainer}>
            <label htmlFor={id} className={s.dateInputLabel}>
                {label}
            </label>
            <DatePicker
                ref={datepickerRef}
                selected={value}
                onChange={onChange}
                onKeyDown={handleKeyDown}
                onCalendarOpen={() => setDateOnOpen(value)}
                shouldCloseOnSelect={false}
                onClickOutside={handleCancelClick}
                customInput={<CustomInputWithIcon id={id} />}
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
        </div>
    )
}
export default DataInput
