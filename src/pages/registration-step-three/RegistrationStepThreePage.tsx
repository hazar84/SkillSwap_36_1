import { HeaderMin } from '../../widgets/header-min/header-min';
import { LayoutAuth } from '../../features/auth/layout-auth/layoutAuth';
import { type Hint } from '../../features/auth/layout-auth/layoutAuth';
import RegistrationStepThreeForm from '../../features/auth/forms/registration-step-three/RegistrationStepThreeForm';
import styles from './RegistrationStepThreePage.module.css'

export const RegistrationStepThreePage = () => {
    const hintLayoutAuth: Hint = {
        src:'/icons/school-board.svg',
        title: 'Укажите, чем вы готовы поделиться',
        description: 'Так другие люди смогут увидеть ваши предложения и предложить вам обмен!'
    }

    return (
        <div className={styles.page}>
            <HeaderMin />
            <LayoutAuth 
                title={'Шаг 3 из 3'}
                hint={hintLayoutAuth}
                currentStep={3}
                totalSteps={3}
            >
                <div>
                    <RegistrationStepThreeForm />
                </div>

            </LayoutAuth>
        </div>
    )
}