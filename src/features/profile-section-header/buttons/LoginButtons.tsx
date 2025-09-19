import React from 'react'
import { Button } from '../../../shared/ui/Button'
import styles from './LoginButtons.module.css'
import { useNavigate } from 'react-router-dom'

const LoginButtons = () => {
	const navigate = useNavigate()

	const handleLoginClick = () => {
		// Временная заглушка для навигации
		navigate('/login')
	}

	const handleRegisterClick = () => {
		// Временная заглушка для навигации
		navigate('/registration/step1')
	}

	return (
		<div className={styles.container}>
			<Button
				variant='secondary'
				onClick={handleLoginClick}
				className={styles.buttons}
			>
				Войти
			</Button>
			<Button
				variant='primary'
				onClick={handleRegisterClick}
				className={styles.buttons}
			>
				Зарегистрироваться
			</Button>
		</div>
	)
}

export default LoginButtons
