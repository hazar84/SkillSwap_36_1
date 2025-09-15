import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ProfileSidebar.module.css'

interface ProfileSidebarProps {
	activeItem:
		| 'requests'
		| 'exchanges'
		| 'favorites'
		| 'skills'
		| 'personal-data'
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeItem }) => {
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

	return (
		<div className={styles.sidebar}>
			<ul className={styles.menu}>
				{menuItems.map((item) => (
					<li key={item.id}>
						<Link
							to={`/profile/${item.id}`}
							className={`${styles.menuItem} ${activeItem === item.id ? styles.active : ''}`}
						>
							<img src={item.icon} alt='' className={styles.icon} />
							<span className={styles.text}>{item.text}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ProfileSidebar
