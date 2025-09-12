import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toastActions } from '../../model/toast-slice'
import { ToastItemUI } from './ToastItemUI'

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
		<ToastItemUI
			title={title}
			description={description}
			displayDate={formatDate(new Date(createdAt))}
			isRead={isRead}
			actionUrl={actionUrl}
			onGo={handleGo}
		/>
	)
}
