// Пример использования
// const App = () => {
// 	const [isToastVisible, setIsToastVisible] = useState(false)

// 	return (
// 		<div>
// 			<button onClick={() => setIsToastVisible(true)}>Показать уведомление</button>
// 			{isToastVisible && (
// 				<ToastContainer
// 					state={isToastVisible ? 'visible' : 'hide'}
// 					onClose={() => setIsToastVisible(false)}
// 				>
// 					<div>Ваше уведомление здесь</div>
// 				</ToastContainer>
// 			)}
// 		</div>
// 	)
// }

import React, { useState, useEffect, useRef } from 'react'
import styles from './ToastContainer.module.css'

interface ToastContainerProps {
	children: React.ReactNode
	state: 'visible' | 'hide'
	onClose: () => void
}

const ToastContainer: React.FC<ToastContainerProps> = ({
	children,
	state,
	onClose,
}) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isOverlayOpen, setIsOverlayOpen] = useState(false)

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		document.addEventListener('keydown', handleEsc)
		return () => {
			document.removeEventListener('keydown', handleEsc)
		}
	}, [onClose])

	useEffect(() => {
		if (state === 'visible') {
			setIsOverlayOpen(true)
		} else {
			setIsOverlayOpen(false)
		}
	}, [state])

	const handleOverlayClick = (e: React.MouseEvent) => {
		e.stopPropagation() // Дополнительная защита
		onClose()
	}

	return (
		<div className={styles.toastContainer} ref={containerRef}>
			{isOverlayOpen && (
				<div
					className={styles.overlay}
					onClick={handleOverlayClick} // Закрытие по клику на оверлей
				/>
			)}
			<div
				className={`${styles.toastWrapper} ${state}`}
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	)
}

export default ToastContainer
