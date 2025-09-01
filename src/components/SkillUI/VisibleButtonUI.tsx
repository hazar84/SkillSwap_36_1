import React from 'react'
import s from './CheckboxUI.module.css'

export type VisibleButtonUIProps = {
	active?: boolean
	disabled?: boolean
	ariaLabel: string
	className?: string
	onClick?: () => void
}

export const VisibleButtonUI: React.FC<VisibleButtonUIProps> = ({
	active = false,
	disabled = false,
	ariaLabel,
	className,
	onClick,
}) => {
	const rootCls = [s.btn, disabled && s.disabled, className]
		.filter(Boolean)
		.join(' ')

	const iconSrc = active ? '/icons/eye-slash.svg' : '/icons/eye.svg'

	return (
		<button
			type='button'
			className={rootCls}
			aria-label={ariaLabel}
			aria-pressed={active}
			disabled={disabled}
			onClick={onClick}
		>
			<img src={iconSrc} alt='' className={s.icon} />
		</button>
	)
}

export default VisibleButtonUI
