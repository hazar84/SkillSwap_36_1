import React from 'react'
import { ToastItem } from '../toast-item/ToastItem'
import type { TToast } from '../../model/toast-types'
import styles from './ToastList.module.css'

interface ToastListProps {
	titleList: string
	array: TToast[]
	action?: {
		title: string
		callback: () => void
	}
}

export const ToastList: React.FC<ToastListProps> = ({
	titleList,
	array,
	action,
}) => {
	return (
		<div className={styles.toastList}>
			<div className={styles.header}>
				<div className={styles.title}>{titleList}</div>
				{action && (
					<button
						type='button'
						className={styles.actionButton}
						onClick={action.callback}
					>
						{action.title}
					</button>
				)}
			</div>

			<div className={styles.items}>
				{array.length > 0 ? (
					array.map((toast) => <ToastItem key={toast.id} {...toast} />)
				) : (
					<div className={styles.empty}>Нет уведомлений</div>
				)}
			</div>
		</div>
	)
}
