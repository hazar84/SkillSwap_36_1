import type { FC } from 'react'
import styles from './profileIcon.module.css'

type Props = {
	isOpen: boolean
	onToggle: () => void
	onLogout: () => void
	onNavigate: () => void
	avatar?: string
}

export const ProfileIconUI: FC<Props> = ({isOpen, onToggle, onLogout, onNavigate, avatar, }) => {
	return (
		<div className={styles.wrapper}>
			<img
				src={avatar}
				alt='Аватар'
				className={styles.avatar}
				onClick={onToggle}
			/>
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
