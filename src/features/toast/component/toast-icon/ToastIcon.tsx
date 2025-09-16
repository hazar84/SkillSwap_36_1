import { useMemo, useState, type FC } from 'react'
import NotificationButtonUI from '../../../../shared/ui/NotificationButtonUI'
import { ToastContainer } from '../toast-container'
import { ToastList } from '../toast-list/ToastList'
import { useDispatch, useSelector } from '../../../../app/providers/store'
import { selectToastsByUser, toastActions } from '../../model/toast-slice'
import type { TToast } from '../../model/toast-types'

type ToastIconProps = {
	userId: string
}

export const ToastIcon: FC<ToastIconProps> = ({ userId }) => {
	const dispatch = useDispatch()
	const toastsUser = useSelector((state) => selectToastsByUser(state, userId)) //получаем массив уведомлений
	const [isToastVisible, setIsToastVisible] = useState(false)

	const { newToasts, readToasts } = useMemo(() => {
		const result = { newToasts: [] as TToast[], readToasts: [] as TToast[] }
		toastsUser.forEach((toast) => {
			(toast.isRead ? result.readToasts : result.newToasts).push(toast)
		})
		return result
	}, [toastsUser])

	// Открыть/закрыть уведомления по клику на кнопку
	const handleButtonClick = () => {
		setIsToastVisible(!isToastVisible)
	}

	// Закрыть контейнер с уведомлениями
	const handleContainerClose = () => {
		setIsToastVisible(false)
	}

	// Перенести в прочитанные все уведомления
	const handleReadToasts = () => {
		const unreadIds = newToasts.map((toast) => toast.id)
		if (unreadIds.length) dispatch(toastActions.markMultipleAsRead(unreadIds))
	}

	// Очистить прочитанные уведомления
	const handleClearToasts = () => {
		dispatch(toastActions.clearReadToastsForUser(userId))
	}

	return (
		<>
			<NotificationButtonUI
				ariaLabel='Уведомления'
				active={newToasts.length > 0}
				onClick={handleButtonClick}
			/>
			{isToastVisible && (
				<ToastContainer state='visible' onClose={handleContainerClose}>
					<ToastList
						titleList='Новые уведомления'
						array={newToasts}
						action={{ title: 'Прочитать все', callback: handleReadToasts }}
					/>
					<ToastList
						titleList='Просмотренные'
						array={readToasts}
						action={{ title: 'Очистить', callback: handleClearToasts }}
					/>
				</ToastContainer>
			)}
		</>
	)
}
