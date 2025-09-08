// Пример использования компонента

// import React, { useState } from 'react';
// import Select from './src/shared/ui/select/Select';

// const GendrSelect = () => {
//   const [selectedValue, setSelectedValue] = useState('');
//   const valueList = ['Мужской', 'Женский'];

//   return (
//     <Select
//       label="Выберите пол"
//       placeholder="Не указан"
//       error={selectedValue === '' ? 'Пожалуйста, выберите значение' : undefined}
//       value={selectedValue}
//       valueList={valueList}
//       onChange={(value) => setSelectedValue(value)}
//     />
//   );
// };

// export default GendrSelect;

import React, { useState, useEffect, useRef } from 'react'
import styles from './Select.module.css'

// Хук для отслеживания кликов вне компонента
function useOutsideClick(callback: () => void) {
	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback()
			}
		}

		document.addEventListener('mousedown', handleClick)
		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	}, [callback])

	return ref
}

interface SelectProps {
	label: string
	placeholder: string
	error?: string
	value: string
	valueList: string[]
	onChange: (value: string) => void
}

const Select: React.FC<SelectProps> = ({
	label,
	placeholder,
	error,
	value,
	valueList,
	onChange,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [showError, setShowError] = useState(false)

	const containerRef = useOutsideClick(() => {
		setIsOpen(false)
		if (!value && !isOpen) {
			setShowError(true)
		}
	})

	const handleChange = (newValue: string) => {
		onChange(newValue)
		setIsOpen(false)
		setShowError(false)
	}

	const handleClick = () => {
		setIsOpen(!isOpen)
		setShowError(false)
	}

	const handleBlur = () => {
		if (!value && !isOpen) {
			setShowError(true)
		}
	}

	const hasError = showError || (error && !value && !isOpen)

	return (
		<div ref={containerRef} className={styles.selectWrapper}>
			<label htmlFor='select' className={styles.label}>
				{label}
			</label>
			<div
				className={`${styles.selectContainer} ${isOpen ? styles.open : ''}`}
				onClick={handleClick}
				onBlur={handleBlur}
			>
				<div
					className={`${styles.select} ${hasError ? styles.error : ''}`}
					id='select'
				>
					{value || placeholder}
				</div>
				{isOpen && (
					<ul className={styles.list}>
						{valueList.map((item) => (
							<li
								key={item}
								className={`${styles.listItem} ${
									value === item ? styles.selected : ''
								}`}
								onClick={() => handleChange(item)}
							>
								{item}
							</li>
						))}
					</ul>
				)}
			</div>
			{hasError && !isOpen && (
				<div className={styles.errorText}>{error || 'Обязательное поле'}</div>
			)}
		</div>
	)
}

export default Select
