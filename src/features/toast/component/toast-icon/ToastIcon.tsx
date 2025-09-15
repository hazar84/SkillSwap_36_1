import { useState, type FC } from 'react'
import NotificationButtonUI from '../../../../shared/ui/NotificationButtonUI'
import { ToastContainer } from '../toast-container'
import { ToastList } from '../toast-list/ToastList'
import { useDispatch, useSelector } from '../../../../app/providers/store'
import { selectToastsByUser, toastActions } from '../../model/toast-slice'
import { selectUser } from '../../../auth/model/userSlice'


export const ToastIcon: FC = () => {
	const dispatch = useDispatch()
  const user = useSelector(selectUser) //получаем данные пользователя
	const toastsUser = useSelector((state) => selectToastsByUser(state, user?.id || '')) //получаем массив уведомлений
	const [isToastVisible, setIsToastVisible] = useState(false)

	const newToasts = toastsUser.filter((toast) => !toast.isRead) // новые уведомления
	const readToasts = toastsUser.filter((toast) => toast.isRead) // прочитанные уведомления

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
		dispatch(toastActions.clearReadToastsForUser(user?.id || ''))
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
