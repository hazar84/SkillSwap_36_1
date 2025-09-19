import { HeaderMin } from '../../widgets/header-min/header-min'
import { LayoutAuth } from '../../features/auth/layout-auth/layoutAuth'
import { type Hint } from '../../features/auth/layout-auth/layoutAuth'
import RegistrationStep2 from '../../features/auth/forms/registration-step-two-form/registrationStepTwo'
import s from './registration-step-two.module.css'

export const RegistrationStepTwoPage = () => {
	const hintLayoutAuth: Hint = {
		src: '/icons/user-info.svg',
		title: 'Расскажите немного о себе',
		description:
			'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена',
	}

	return (
		<div className={s.page}>
			<HeaderMin />
			<LayoutAuth
				title={'Шаг 2 из 3'}
				hint={hintLayoutAuth}
				currentStep={2}
				totalSteps={3}
			>
				<div className={s.form}>
					<RegistrationStep2 />
				</div>
			</LayoutAuth>
		</div>
	)
}
