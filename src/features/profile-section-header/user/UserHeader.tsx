import React from 'react'
import styles from './UserHeader.module.css'

interface UserHeaderProps {
	name: string
	avatar: string
}

const UserHeader: React.FC<UserHeaderProps> = ({ name, avatar }) => {
	return (
		<div className={styles.userHeader}>
			<div className={styles.userName}>{name}</div>
			<img src={avatar} alt='avatar' className={styles.avatar} />
		</div>
	)
}

export default UserHeader
