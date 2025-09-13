import type { FC, SyntheticEvent } from 'react'
import styles from './header.module.css'
import LogoUI from '../../shared/ui/Logo'
import { Link } from 'react-router-dom'
import { SearchInput } from '../../features/search/component/searchInput'
import { ProfileSectionHeader } from '../../features/profile-section-header'
import { useSelector } from '../../app/providers/store'
import { selectIsAuthenticated, selectUser } from '../../features/auth/model/userSlice'

export const Header: FC = () => {
	const user = useSelector(selectUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

	const handleClick = (e: SyntheticEvent) => {
		e.preventDefault()
		alert('Раздел в разработке')
	}

	return (
		<header>
			<nav className={styles.menu}>
				<LogoUI />
				<div className={styles.menu_part_left}>
					<Link to='' onClick={handleClick}> 
						О проекте
					</Link>
					<Link to='' onClick={handleClick}> {/* заменить на выпадающий список*/}
						Все навыки
					</Link>
				</div>
				<SearchInput />
				<ProfileSectionHeader name={user?.name} avatar={user?.avatarUrl} isAuthenticated={isAuthenticated} />
			</nav>
		</header>
	)
}
