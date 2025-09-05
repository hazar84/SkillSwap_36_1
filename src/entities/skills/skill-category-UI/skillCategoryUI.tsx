import type { TCategory, TSubcategory } from '../../../shared/lib/types'
import styles from './skillCategoryUI.module.css'

export type SkillCategoryProps = {
	subSkills: TSubcategory[]
	skillCategory: TCategory
	callback: (value: string) => void
}

export const SkillCategoryUI = (props: SkillCategoryProps) => {
	const title: string = props.skillCategory.name

	const iconName: string = props.skillCategory.icon

	const handleSubCategoryClick = (subCategoryId: string) => {
		props.callback(subCategoryId)
	}

	const icons: Record<string, string> = {
		'Бизнес и карьера': 'briefcase',
		'Творчество и искусство': 'palette',
		'Иностранные языки': 'global',
		'Образование и развитие': 'book',
		'Дом и уют': 'home',
		'Здоровье и лайфстайл': 'lifestyle',
	}

	const iconNameStyle = icons[title] || 'default'

	return (
		<div className={styles.container}>
			<div className={`${styles.logo} ${styles[iconNameStyle]}`}>
				<img src={`${iconName}`} alt={title} />
			</div>
			<div className={styles.content}>
				<div className={styles.title}>{title}</div>
				<ul className={styles.list}>
					{props.subSkills.map((subCategory) => (
						<li key={subCategory.id} className={styles.item}>
							<button onClick={() => handleSubCategoryClick(subCategory.id)}>
								{subCategory.name}
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
