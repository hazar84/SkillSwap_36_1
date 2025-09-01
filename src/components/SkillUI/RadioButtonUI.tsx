import React from 'react'
import s from './RadioButtonUI.module.css'

//импортируем из src/assets/icons
import ActiveIcon from '@/assets/icons/radiobutton-active.svg?react'
import EmptyIcon from '@/assets/icons/radiobutton-empty.svg?react'

export type RadioButtonUIProps = {
	checked?: boolean
	disabled?: boolean
	ariaLabel: string
	className?: string
	onClick?: () => void
}

export const RadioButtonUI: React.FC<RadioButtonUIProps> = ({
	checked = false,
	disabled = false,
	ariaLabel,
	className,
	onClick,
}) => {
	const Icon = checked ? ActiveIcon : EmptyIcon
	const rootCls = [
		s.btn,
		checked && s.checked,
		disabled && s.disabled,
		className,
	]
		.filter(Boolean)
		.join(' ')

	return (
		<button
			type='button'
			className={rootCls}
			aria-label={ariaLabel}
			aria-pressed={checked}
			disabled={disabled}
			onClick={onClick}
		>
			<Icon className={s.icon} />
		</button>
	)
}

export default RadioButtonUI
