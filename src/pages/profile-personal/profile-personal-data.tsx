import React from 'react'
import ProfileSidebar from '../../features/profile-sidebar/ProfileSidebar'
import UpdateProfileForm from '../../features/profile/profile-update-form/profileUpdateForm'
import styles from './profile-personal-data.module.css'
import { Header } from '../../widgets/header/header'
import { FooterUI } from '../../widgets/footer/footer'

const ProfilePersonalData: React.FC = () => {
	return (
		<>
			<Header />
			<div className={styles.container}>
				<div className={styles.sidebar}>
					<ProfileSidebar activeItem='personal-data' />
				</div>
				<div className={styles.content}>
					<UpdateProfileForm />
				</div>
			</div>
			<FooterUI />
		</>
	)
}

export default ProfilePersonalData
