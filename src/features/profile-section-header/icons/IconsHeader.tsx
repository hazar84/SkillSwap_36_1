import React from 'react'
import styles from './IconsHeader.module.css'
import { ToastIcon } from '../../toast/component/toast-icon/ToastIcon'
import { useSelector } from 'react-redux'
import { selectUser } from '../../auth/model/userSlice'

interface IconsHeaderProps {
	isAuthenticated: boolean
}

const IconsHeader: React.FC<IconsHeaderProps> = ({ isAuthenticated }) => {
	const currentUser = useSelector(selectUser)

	return (
		<div className={styles.iconsContainer}>
			<div className={styles.iconGroup}>
				<div className={styles.icon}>
					<img src='/icons/moon.svg' alt='theme' className={styles.svgIcon} />
				</div>

				{isAuthenticated && (
					<>
						<ToastIcon userId={currentUser?.id ?? ''} />
						<div className={styles.icon}>
							<img
								src='/icons/like.svg'
								alt='likes'
								className={styles.svgIcon}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default IconsHeader
