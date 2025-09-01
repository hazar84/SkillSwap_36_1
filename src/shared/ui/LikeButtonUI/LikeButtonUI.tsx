import React from 'react'
import s from './LikeButtonUI.module.css'
import FilledIcon from '@/assets/icons/Like-1.svg?react'
import OutlineIcon from '@/assets/icons/like.svg?react'

export type LikeButtonUIProps = {
	active?: boolean
	disabled?: boolean
	ariaLabel: string
	className?: string
	onClick?: () => void
}

export const LikeButtonUI: React.FC<LikeButtonUIProps> = ({
	active = false,
	disabled = false,
	ariaLabel,
	className,
	onClick,
}) => {
	const Icon = active ? FilledIcon : OutlineIcon
	const rootCls = [
		s.btn,
		active && s.checked,
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
			<Icon className={s.icon} />
		</button>
	)
}

export default LikeButtonUI
