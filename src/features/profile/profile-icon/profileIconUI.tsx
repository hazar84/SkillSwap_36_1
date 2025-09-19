import { forwardRef } from 'react'
import styles from './profileIcon.module.css'

type Props = {
	isOpen: boolean
	onToggle: () => void
	onLogout: () => void
	onNavigate: () => void
	avatar?: string
}

export const ProfileIconUI = forwardRef<HTMLDivElement, Props>(
	({ isOpen, onToggle, onLogout, onNavigate, avatar }, ref) => {
		return (
			<div className={styles.wrapper} ref={ref}>
				<button
					type='button'
					onClick={onToggle}
					aria-haspopup='menu'
					aria-expanded={isOpen}
					className={styles.iconbutton}
				>
					<img
						src={avatar || '/icons/user-avatar.svg'}
						alt='Аватар'
						className={styles.avatar}
					/>
				</button>
				{isOpen && (
					<div className={styles.dropdown}>
						<button onClick={onNavigate} className={styles.button}>
							Личный кабинет
						</button>
						<button onClick={onLogout} className={styles.button}>
							Выйти из аккаунта
						</button>
					</div>
				)}
			</div>
		)
	}
)
