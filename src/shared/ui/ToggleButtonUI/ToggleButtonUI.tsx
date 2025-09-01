import React from 'react'
import s from './ToggleButtonUI.module.css'

export type ToggleButtonUIProps = {
	active?: boolean
	disabled?: boolean
	ariaLabel: string
	className?: string
	onClick?: () => void
}

export const ToggleButtonUI: React.FC<ToggleButtonUIProps> = ({
	active = false,
	disabled = false,
	ariaLabel,
	className,
	onClick,
}) => {
	const rootCls = [
		s.toggle,
		active && s.active,
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
			aria-pressed={active}
			disabled={disabled}
			onClick={onClick}
		>
			<span className={s.circle} />
		</button>
	)
}

export default ToggleButtonUI
