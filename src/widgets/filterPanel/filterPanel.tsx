import { useState } from 'react'
import styles from './FilterPanel.module.css'
import { CityFilter } from '../../features/filters/cityFilter'
import { GenderFilter } from '../../features/filters/genderFilter'
import { SkillsFilter } from '../../features/filters/skillFilter'
import { SkillTypeFilter } from '../../features/filters/SkillTypeFilter'

interface FilterPanelProps {
	onRoleChange: (role: string) => void
	onGenderChange: (gender: string) => void
	onCitiesChange: (cities: string[]) => void
	onSkillsChange: (skills: string[]) => void
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
	onRoleChange,
	onGenderChange,
	onCitiesChange,
	onSkillsChange,
}) => {
	const [role, setRole] = useState('Всё')
	const [gender, setGender] = useState('Не имеет значения')
	const [cities, setCities] = useState<string[]>([])
	const [skills, setSkills] = useState<string[]>([])

	const activeFiltersCount = [
		role !== 'Всё',
		gender !== 'Не имеет значения',
		cities.length > 0,
		skills.length > 0,
	].filter(Boolean).length

	const resetFilters = () => {
		setRole('Всё')
		setGender('Не имеет значения')
		setCities([])
		setSkills([])

		onRoleChange('Всё')
		onGenderChange('Не имеет значения')
		onCitiesChange([])
		onSkillsChange([])
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
