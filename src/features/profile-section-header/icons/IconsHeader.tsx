import React from 'react'
import styles from './IconsHeader.module.css'
import { ToastIcon } from '../../toast/component/toast-icon/ToastIcon'
import { Link } from 'react-router-dom'

interface IconsHeaderProps {
	isAuthenticated: boolean
	userId: string
}

const IconsHeader: React.FC<IconsHeaderProps> = ({
	isAuthenticated,
	userId,
}) => {
	return (
		<div className={styles.iconsContainer}>
			<div className={styles.iconGroup}>
				<div className={styles.icon}>
					<img src='/icons/moon.svg' alt='theme' className={styles.svgIcon} />
				</div>

				{isAuthenticated && (
					<>
						<div className={styles.icon}>
							<ToastIcon userId={userId} />
						</div>
						<Link to='/profile/favorites'>
							<div className={styles.icon}>
								<img
									src='/icons/like.svg'
									alt='likes'
									className={styles.svgIcon}
								/>
							</div>
						</Link>
					</>
				)}
			</div>
		</div>
	)
}

export default IconsHeader
