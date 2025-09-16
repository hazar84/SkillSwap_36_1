import { useCallback, type FC, type SyntheticEvent } from 'react'
import styles from './header.module.css'
import LogoUI from '../../shared/ui/Logo'
import { Link } from 'react-router-dom'
import { SearchInput } from '../../features/search/component/searchInput'
import { ProfileSectionHeader } from '../../features/profile-section-header'
import { useDispatch, useSelector } from '../../app/providers/store'
import {
	selectIsAuthenticated,
	selectUser,
} from '../../features/auth/model/userSlice'
import { SkillsCatalog } from '../../entities/skills-catalog'
import { filtersActions } from '../../features/filters/model/filtersSlice'

export const Header: FC = () => {
	const user = useSelector(selectUser)
	const isAuthenticated = useSelector(selectIsAuthenticated)
	const dispatch = useDispatch()

	const handleClick = (e: SyntheticEvent) => {
		e.preventDefault()
		alert('Раздел в разработке')
	}

	const handleSearchChange = useCallback(
		(value: string) => {
			dispatch(filtersActions.setSearchQuery(value))
		},
		[dispatch]
	)

	return (
		<header>
			<nav className={styles.menu}>
				<LogoUI />
				<div className={styles.menu_part_left}>
					<Link to='' onClick={handleClick}>
						О проекте
					</Link>
					<SkillsCatalog />
				</div>
				<SearchInput onChange={handleSearchChange} />
				<ProfileSectionHeader
					name={user?.name}
					avatar={user?.avatarUrl}
					isAuthenticated={isAuthenticated}
				/>
			</nav>
		</header>
	)
}
