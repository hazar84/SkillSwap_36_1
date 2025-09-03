import React from 'react'
import styles from './IconsHeader.module.css'

interface IconsHeaderProps {
	isAuthenticated: boolean
}

const IconsHeader: React.FC<IconsHeaderProps> = ({ isAuthenticated }) => {
	return (
		<div className={styles.iconsContainer}>
			<div className={styles.iconGroup}>
				<div className={styles.icon}>
					<img src='/icons/moon.svg' alt='theme' className={styles.svgIcon} />
				</div>

				{isAuthenticated && (
					<>
						<div className={styles.icon}>
							<img
								src='/icons/notification.svg'
								alt='notifications'
								className={styles.svgIcon}
							/>
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
