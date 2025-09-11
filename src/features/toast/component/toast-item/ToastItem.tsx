import React from 'react'
import { useDispatch } from 'react-redux'
import { toastActions } from '../../model/toast-slice'
import { Button } from '../../../../shared/ui/Button/Button'
import styles from './ToastItem.module.css'
import { useNavigate } from 'react-router-dom'

export interface ToastItemProps {
	id: string
	title: string
	description: string
	createdAt: Date
	actionUrl?: string
	isRead: boolean
}

export const ToastItem: React.FC<ToastItemProps> = ({
	id,
	title,
	description,
	createdAt,
	actionUrl,
	isRead,
}) => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleMarkAsRead = () => {
		dispatch(toastActions.markAsRead(id))
	}

  // Нажатие на кнопку - Перейти
	const handleGo = () => {
		handleMarkAsRead()
		if (actionUrl) {
			navigate(actionUrl)
		}
	}

  // Форматирование даты в нужный формат для отображения на элементе уведомления
	const formatDate = (date: Date): string => {
		const today = new Date()
		const yesterday = new Date()
		yesterday.setDate(today.getDate() - 1)

		const isToday = date.toDateString() === today.toDateString()
		const isYesterday = date.toDateString() === yesterday.toDateString()

		if (isToday) return 'сегодня'
		if (isYesterday) return 'вчера'

		return date.toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'long',
		})
	}

	return (
		<div className={styles.toastItem}>
			<div className={styles.content}>
				<div className={styles.contentHeader}>
					<img src='/icons/idea.svg' alt='idea-icon' className={styles.icon} />
					<div className='contentHeaderMain'>
						<div className={styles.title}>{title}</div>
						<div className={styles.description}>{description}</div>
					</div>
				</div>

				{!isRead && actionUrl && (
					<Button
						variant='primary'
						onClick={() => handleGo()}
						className={styles.goButton}
					>
						Перейти
					</Button>
				)}
			</div>

			<div className={styles.date}>{formatDate(new Date(createdAt))}</div>
		</div>
	)
}
