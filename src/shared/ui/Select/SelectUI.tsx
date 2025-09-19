import React, { forwardRef } from 'react'
import styles from './Select.module.css'

interface SelectUIProps {
	label: string
	placeholder: string
	error?: string
	value: string
	valueList: string[]
	isOpen: boolean
	showError: boolean
	handleClick: () => void
	handleBlur: () => void
	handleChange: (value: string) => void
	disabled?: boolean
}

const SelectUI = forwardRef<HTMLDivElement, SelectUIProps>((props, ref) => {
	const {
		label,
		placeholder,
		error,
		value,
		valueList,
		isOpen,
		showError,
		handleClick,
		handleBlur,
		handleChange,
		disabled = false,
	} = props

	return (
		<div
			ref={ref}
			className={styles.selectWrapper}
			style={{ zIndex: isOpen ? 1000 : 1 }}
		>
			<label htmlFor='select' className={styles.label} id='select-label'>
				{label}
			</label>
			<div
				className={`${styles.selectContainer} ${isOpen ? styles.open : ''} ${disabled ? styles.disabled : ''}`}
				role='combobox'
				aria-expanded={isOpen}
				aria-haspopup='listbox'
				aria-labelledby='select-label'
				aria-activedescendant={value}
				aria-disabled={disabled}
				onClick={disabled ? undefined : handleClick}
				onBlur={handleBlur}
				tabIndex={disabled ? -1 : 0}
			>
				<div
					className={`${styles.select} ${showError ? styles.error : ''} ${disabled ? styles.disabled : ''}`}
					id='select'
					style={{ zIndex: isOpen ? 1002 : 3 }}
				>
					{value || placeholder}
				</div>
				{isOpen && !disabled && (
					<ul
						className={styles.list}
						role='listbox'
						id='select-list'
						style={{ zIndex: 1 }}
					>
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
			<div className={styles.messageContainer}>
				{showError && !isOpen && (
					<span className={styles.errorText}>
						{error || 'Обязательное поле'}
					</span>
				)}
			</div>
		</div>
	)
})

export default SelectUI
