import { useCallback, type FC, type SyntheticEvent } from 'react'
import styles from './header.module.css'
import LogoUI from '../../shared/ui/Logo'
import { Link } from 'react-router-dom'
import { SearchInput } from '../../features/search/component/searchInput'
import { ProfileSectionHeader } from '../../features/profile-section-header'
import { useDispatch } from '../../app/providers/store'
import { SkillsCatalog } from '../../entities/skills-catalog'
import { filtersActions } from '../../features/filters/model/filtersSlice'

export const Header: FC = () => {
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
				<ProfileSectionHeader />
			</nav>
		</header>
	)
}
