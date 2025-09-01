import React from 'react'
import s from './CheckboxUI.module.css'
import n from './NotificationButtonUI.module.css'

export type NotificationButtonUIProps = {
	active?: boolean
	disabled?: boolean
	ariaLabel: string
	className?: string
	onClick?: () => void
}

export const NotificationButtonUI: React.FC<NotificationButtonUIProps> = ({
	active = false,
	disabled = false,
	ariaLabel,
	className,
	onClick,
}) => {
	const rootCls = [s.btn, disabled && s.disabled, className]
		.filter(Boolean)
		.join(' ')
	const iconSrc = '/icons/notification.svg'

	return (
		<button
			type='button'
			className={rootCls}
			aria-label={ariaLabel}
			aria-pressed={active}
			disabled={disabled}
			onClick={onClick}
		>
			<span className={n.wrap}>
				<img src={iconSrc} alt='' className={s.icon} />
				{active && <span className={n.badge} />}
			</span>
		</button>
	)
}

export default NotificationButtonUI
