import React from 'react'
import s from './CheckboxUI.module.css'

//импортируем из src/assets/icons
import DoneIcon from '@/assets/icons/checkbox-done.svg?react'
import EmptyIcon from '@/assets/icons/checkbox-empty.svg?react'

export type CheckboxUIProps = {
	checked?: boolean
	disabled?: boolean
	ariaLabel: string
	className?: string
	onClick?: () => void
}

export const CheckboxUI: React.FC<CheckboxUIProps> = ({
	checked = false,
	disabled = false,
	ariaLabel,
	className,
	onClick,
}) => {
	const Icon = checked ? DoneIcon : EmptyIcon
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

export default CheckboxUI
