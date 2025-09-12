import React from 'react'
import { Button } from '../../../../shared/ui/Button/Button'
import styles from './ToastItem.module.css'

export interface ToastItemUIProps {
	title: string
	description: string
	displayDate: string
	isRead: boolean
	actionUrl?: string
	onGo?: () => void
}

export const ToastItemUI: React.FC<ToastItemUIProps> = ({
	title,
	description,
	displayDate,
	isRead,
	actionUrl,
	onGo,
}) => {
	return (
		<div className={styles.toastItem}>
			<div className={styles.content}>
				<div className={styles.contentHeader}>
					<img src='/icons/idea.svg' alt='idea-icon' className={styles.icon} />
					<div className={styles.contentHeaderMain}>
						<div className={styles.title}>{title}</div>
						<div className={styles.description}>{description}</div>
					</div>
				</div>

				{!isRead && actionUrl && (
					<Button variant='primary' onClick={onGo} className={styles.goButton}>
						Перейти
					</Button>
				)}
			</div>

			<div className={styles.date}>{displayDate}</div>
		</div>
	)
}
