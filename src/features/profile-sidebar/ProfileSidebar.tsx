import React from 'react'
import styles from './ProfileSidebar.module.css'

interface ProfileSidebarProps {
	activeItem?: string
	onItemClick?: (item: string) => void
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
	activeItem = 'personal-data',
	onItemClick,
}) => {
	const menuItems = [
		{
			id: 'requests',
			icon: '/icons/request.svg',
			text: 'Заявки',
		},
		{
			id: 'exchanges',
			icon: '/icons/message-text.svg',
			text: 'Мои обмены',
		},
		{
			id: 'favorites',
			icon: '/icons/like.svg',
			text: 'Избранное',
		},
		{
			id: 'skills',
			icon: '/icons/idea.svg',
			text: 'Мои навыки',
		},
		{
			id: 'personal-data',
			icon: '/icons/user.svg',
			text: 'Личные данные',
		},
	]

	const handleItemClick = (itemId: string) => {
		if (onItemClick) {
			onItemClick(itemId)
		}
	}

	return (
		<div className={styles.sidebar}>
			<div className={styles.menu}>
				{menuItems.map((item) => (
					<div
						key={item.id}
						className={`${styles.menuItem} ${activeItem === item.id ? styles.active : ''}`}
						onClick={() => handleItemClick(item.id)}
					>
						<img src={item.icon} alt={item.text} className={styles.icon} />
						<span className={styles.text}>{item.text}</span>
					</div>
				))}
			</div>
		</div>
	)
}

export default ProfileSidebar
