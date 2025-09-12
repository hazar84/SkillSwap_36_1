import styles from './registration-step-one.module.css'
import { HeaderMin } from '../../widgets/header-min/header-min'
import { LayoutAuth } from '../../features/auth/layout-auth/layoutAuth'
import type { Hint } from '../../features/auth/layout-auth/layoutAuth'
import { SocialAuthButtonsUI } from '../../features/auth/social-auth-buttons/socialAuthButtonsUI'
import { RegistrationStepOneForm } from '../../features/auth/forms/registration-step-one-form/RegistrationStepOneForm'

export const RegistrationStepOnePage = () => {
	const hintLayoutAuth: Hint = {
		src: '/icons/light-bulb.svg',
		title: 'Добро пожаловать в SkillSwap!',
		description:
			'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми',
	}

	return (
		<div className={styles.login}>
			<HeaderMin />
			<LayoutAuth
				title={'Шаг 1 из 3'}
				hint={hintLayoutAuth}
				currentStep={1}
				totalSteps={3}
			>
				<div className={styles.form}>
					<SocialAuthButtonsUI />
					<RegistrationStepOneForm />
				</div>
			</LayoutAuth>
		</div>
	)
}
