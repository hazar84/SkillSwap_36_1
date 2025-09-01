import React from 'react'
import s from './VisibleButtonUI.module.css'

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
	const src = active ? '/icons/eye-slash.svg' : '/icons/eye.svg'

	const rootCls = [s.btn, disabled && s.disabled, className]
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
			<img src={src} alt='' className={s.icon} />
		</button>
	)
}

export default VisibleButtonUI
