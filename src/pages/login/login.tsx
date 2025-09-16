import styles from './login.module.css'
import { Link } from 'react-router-dom'
import { HeaderMin } from '../../widgets/header-min/header-min'
import { LayoutAuth } from '../../features/auth/layout-auth/layoutAuth'
import type { Hint } from '../../features/auth/layout-auth/layoutAuth'
import { SocialAuthButtonsUI } from '../../features/auth/social-auth-buttons/socialAuthButtonsUI'
import { LoginForm } from '../../features/auth/forms/login-form/loginForm'
import { Button } from '../../shared/ui/Button/Button'
import { useNavigate } from 'react-router-dom'

export const LoginPage = () => {
	const hintLayoutAuth: Hint = {
		src: '/icons/light-bulb.svg',
		title: 'Добро пожаловать в SkillSwap!',
		description:
			'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми',
	}

    const navigate = useNavigate()
    const handleRegistration    = () => {
        navigate('/registration/step1')
    }

	return (
		<div className={styles.page}>
			<HeaderMin />
			<LayoutAuth title={'Вход'} hint={hintLayoutAuth}>
				<div className={styles.form}>
					<SocialAuthButtonsUI />
					<LoginForm />
					<Button variant={'tertiary'} onClick={handleRegistration} className='greenColor'>Зарегистрироваться</Button>
				</div>
			</LayoutAuth>
		</div>
	)
}
