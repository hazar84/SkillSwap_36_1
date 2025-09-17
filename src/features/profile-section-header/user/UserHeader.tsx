import React from 'react'
import styles from './UserHeader.module.css'
import { ProfileIcon } from '../../profile/profile-icon'

interface UserHeaderProps {
	name: string
}

const UserHeader: React.FC<UserHeaderProps> = ({ name }) => {
	return (
		<div className={styles.userHeader}>
			<div className={styles.userName}>{name}</div>
			<ProfileIcon />
		</div>
	)
}

export default UserHeader
