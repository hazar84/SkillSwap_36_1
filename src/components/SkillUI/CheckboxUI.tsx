import React from 'react'
import s from './CheckboxUI.module.css'

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
	const src = checked ? '/icons/checkbox-done.svg' : '/icons/checkbox-empty.svg'
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
			<img className={s.icon} src={src} alt='' aria-hidden='true' />
		</button>
	)
}

export default CheckboxUI
