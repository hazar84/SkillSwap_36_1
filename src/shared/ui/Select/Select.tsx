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

	const containerRef = useClickOutside(() => {
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

	const hasError: boolean = showError || (error ? !value && !isOpen : false)

	return (
		<SelectUI
			ref={containerRef}
			label={label}
			placeholder={placeholder}
			error={error}
			value={value}
			valueList={valueList}
			isOpen={isOpen}
			hasError={hasError}
			handleClick={handleClick}
			handleBlur={handleBlur}
			handleChange={handleChange}
		/>
	)
}

export default Select
