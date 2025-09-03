import type { FC } from 'react'
import LogoUI from '../../shared/ui/Logo'
import { Button } from '../../shared/ui/Button'
import styles from './header-min.module.css'
import { useNavigate } from 'react-router-dom'

export const HeaderMin: FC = () => {
	const navigate = useNavigate()

	const handleClose = () => {
		navigate('/')
	}

	return (
		<div className={styles.container}>
			<LogoUI />
			<Button
				className={styles.button}
				variant={'tertiary'}
				onClick={handleClose}
			>
				<span>Закрыть</span>
				<img src='/icons/cross.svg' alt='закрыть' />
			</Button>
		</div>
	)
}
