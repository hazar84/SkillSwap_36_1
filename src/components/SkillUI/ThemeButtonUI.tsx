import React from 'react'
import s from './CheckboxUI.module.css'

export type ThemeButtonUIProps = {
	theme?: 'light' | 'dark'
	disabled?: boolean
	ariaLabel: string
	className?: string
	onClick?: () => void
}

export const ThemeButtonUI: React.FC<ThemeButtonUIProps> = ({
	theme = 'light',
	disabled = false,
	ariaLabel,
	className,
	onClick,
}) => {
	const iconSrc = theme === 'light' ? '/icons/moon.svg' : '/icons/sun.svg'

	const rootCls = [s.btn, disabled && s.disabled, className]
		.filter(Boolean)
		.join(' ')

	return (
		<button
			type='button'
			className={rootCls}
			aria-label={ariaLabel}
			aria-pressed={theme === 'dark'}
			disabled={disabled}
			onClick={onClick}
		>
			<img src={iconSrc} alt='' className={s.icon} />
		</button>
	)
}

export default ThemeButtonUI
