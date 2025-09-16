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

import React, { useState } from 'react'
import { useClickOutside } from './useClickOutside'
import SelectUI from './SelectUI'

interface SelectProps {
	label: string
	placeholder: string
	error?: string
	value: string
	valueList: string[]
	onChange: (value: string) => void
	disabled?: boolean
	showError?: boolean
}

const Select: React.FC<SelectProps> = ({
	label,
	placeholder,
	error,
	value,
	valueList,
	onChange,
	disabled = false,
	showError = false,
}) => {
	const [isOpen, setIsOpen] = useState(false)

	const containerRef = useClickOutside(() => {
		setIsOpen(false)
	})

	const handleChange = (newValue: string) => {
		if (disabled) return;
		onChange(newValue)
		setIsOpen(false)
	}

	const handleClick = () => {
		if (disabled) return;
		setIsOpen(!isOpen)
	}

	const handleBlur = () => {}

	return (
		<SelectUI
			ref={containerRef}
			label={label}
			placeholder={placeholder}
			error={error}
			value={value}
			valueList={valueList}
			isOpen={isOpen}
			showError={showError && !value}
			handleClick={handleClick}
			handleBlur={handleBlur}
			handleChange={handleChange}
			disabled={disabled}
		/>
	)
}

export default Select
