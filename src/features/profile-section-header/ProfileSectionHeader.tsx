import React from 'react'
import styles from './ProfileSectionHeader.module.css'
import IconsHeader from './icons/IconsHeader'
import UserHeader from './user/UserHeader'
import LoginButtons from './buttons/LoginButtons'

interface ProfileSectionHeaderProps {
	isAuthenticated: boolean
	name?: string
	avatar?: string
}

const ProfileSectionHeader: React.FC<ProfileSectionHeaderProps> = ({
	isAuthenticated,
	name,
	avatar,
}) => {
	return (
		<div className={styles.profileHeaderContainer}>
			<div className={styles.headerContent}>
				<IconsHeader isAuthenticated={isAuthenticated} />
				{isAuthenticated ? (
					<UserHeader name={name || ''} />
				) : (
					<LoginButtons />
				)}
			</div>
		</div>
	)
}

export default ProfileSectionHeader
