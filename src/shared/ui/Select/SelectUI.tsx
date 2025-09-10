import React, { forwardRef } from 'react'
import styles from './Select.module.css'

interface SelectUIProps {
	label: string
	placeholder: string
	error?: string
	value: string
	valueList: string[]
	isOpen: boolean
	hasError: boolean
	handleClick: () => void
	handleBlur: () => void
	handleChange: (value: string) => void
}

const SelectUI = forwardRef<HTMLDivElement, SelectUIProps>((props, ref) => {
	const {
		label,
		placeholder,
		error,
		value,
		valueList,
		isOpen,
		hasError,
		handleClick,
		handleBlur,
		handleChange,
	} = props

	return (
		<div ref={ref} className={styles.selectWrapper}>
			<label htmlFor='select' className={styles.label} id='select-label'>
				{label}
			</label>
			<div
				className={`${styles.selectContainer} ${isOpen ? styles.open : ''}`}
				role='combobox'
				aria-expanded={isOpen}
				aria-haspopup='listbox'
				aria-labelledby='select-label'
				aria-activedescendant={value}
				onClick={handleClick}
				onBlur={handleBlur}
				tabIndex={0}
			>
				<div
					className={`${styles.select} ${hasError ? styles.error : ''}`}
					id='select'
				>
					{value || placeholder}
				</div>
				{isOpen && (
					<ul className={styles.list} role='listbox' id='select-list'>
						{valueList.map((item) => (
							<li
								key={item}
								className={`${styles.listItem} ${
									value === item ? styles.selected : ''
								}`}
								role='option'
								tabIndex={-1}
								aria-selected={value === item}
								onClick={(e) => {
									e.stopPropagation()
									handleChange(item)
								}}
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
})

export default SelectUI
