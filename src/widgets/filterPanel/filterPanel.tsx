import styles from './FilterPanel.module.css'
import { CityFilter } from '../../features/filters/cityFilter'
import { GenderFilter } from '../../features/filters/genderFilter'
import { SkillsFilter } from '../../features/filters/skillFilter'
import { SkillTypeFilter } from '../../features/filters/SkillTypeFilter'
import { useDispatch, useSelector } from '../../app/providers/store'
import { filtersActions, selectCity, selectGender, selectMode, selectSkillIds } from '../../features/filters/model/filtersSlice'


export const FilterPanel: React.FC = () => {
  const dispatch = useDispatch()

  const role = useSelector(selectMode)
  const gender = useSelector(selectGender)
  const cities = useSelector(selectCity)
  const skills = useSelector(selectSkillIds)

	const activeFiltersCount = [
		role !== 'all',
		gender !== null,
		cities !== null,
		...skills,
	].filter(Boolean).length

	const resetFilters = () => {
		dispatch(filtersActions.resetFilters())
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.mainTitle}>
					Фильтры
					{activeFiltersCount > 0 && (
						<span className={styles.filtersCount}> ({activeFiltersCount})</span>
					)}
				</h2>
				{activeFiltersCount > 0 && (
					<button className={styles.resetButton} onClick={resetFilters}>
						<span>Сбросить</span>
					</button>
				)}
			</div>

			<SkillTypeFilter />
			<SkillsFilter />
			<GenderFilter />
			<CityFilter />
		</div>
	)
}
