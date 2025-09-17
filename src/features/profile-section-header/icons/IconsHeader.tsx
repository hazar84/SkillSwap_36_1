import React from 'react'
import styles from './IconsHeader.module.css'
import { ToastIcon } from '../../toast/component/toast-icon/ToastIcon'

interface IconsHeaderProps {
	isAuthenticated: boolean,
	userId: string
}

const IconsHeader: React.FC<IconsHeaderProps> = ({ isAuthenticated, userId }) => {
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
