import styles from './ProfileSectionHeader.module.css'
import IconsHeader from './icons/IconsHeader'
import UserHeader from './user/UserHeader'
import LoginButtons from './buttons/LoginButtons'
import { useSelector } from 'react-redux'
import {
	selectUser,
	selectIsAuthenticated,
} from '../../features/auth/model/userSlice'

const ProfileSectionHeader = () => {
	const isAuthenticated = useSelector(selectIsAuthenticated)
	const user = useSelector(selectUser)
	const name = user?.name || ''
	const userId = user?.id || ''

	return (
		<div className={styles.profileHeaderContainer}>
			<div className={styles.headerContent}>
				<IconsHeader isAuthenticated={isAuthenticated} userId={userId} />
				{isAuthenticated ? <UserHeader name={name} /> : <LoginButtons />}
			</div>
		</div>
	)
}

export default ProfileSectionHeader
