import React from 'react'
import s from './CheckboxCategoryUI.module.css'
import DoneIcon from '@/assets/icons/checkbox-done.svg?react'
import EmptyIcon from '@/assets/icons/checkbox-empty.svg?react'
import RemoveIcon from '@/assets/icons/checkbox-remove.svg?react'

export type CheckboxCategoryUIProps = {
	state?: 'empty' | 'partial' | 'checked'
	disabled?: boolean
	ariaLabel: string
	className?: string
	onClick?: () => void
}

export const CheckboxCategoryUI: React.FC<CheckboxCategoryUIProps> = ({
	state = 'empty',
	disabled = false,
	ariaLabel,
	className,
	onClick,
}) => {
	const Icon =
		state === 'checked'
			? DoneIcon
			: state === 'partial'
				? RemoveIcon
				: EmptyIcon

	const rootCls = [
		s.btn,
		state !== 'empty' && s.checked,
		disabled && s.disabled,
		className,
	]
		.filter(Boolean)
		.join(' ')

	return (
		<button
			type='button'
			className={rootCls}
			role='checkbox'
			aria-label={ariaLabel}
			aria-checked={
				state === 'checked' ? 'true' : state === 'partial' ? 'mixed' : 'false'
			}
			disabled={disabled}
			onClick={onClick}
		>
			<Icon className={s.icon} />
		</button>
	)
}

export default CheckboxCategoryUI
