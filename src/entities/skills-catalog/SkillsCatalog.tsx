import { useState } from 'react'
import { useSelector } from '../../app/providers/store'
import { SkillCategoryUI } from '../skills/skill-category-UI/skillCategoryUI'
import { selectCategoriesForFilter } from '../skills/model/skillsSlice'
import styles from './SkillsCatalog.module.css'

export type SkillsCatalogProps = {
	onSubcategoryClick?: (subcategoryId: string) => void
}

export const SkillsCatalog = ({ onSubcategoryClick }: SkillsCatalogProps) => {
	const [isOpen, setIsOpen] = useState(false)

	const categoriesWithSubcategories = useSelector(selectCategoriesForFilter)

	const toggleCatalog = () => {
		setIsOpen((prev) => !prev)
	}

	const handleSubcategoryClick = (subcategoryId: string) => {
		onSubcategoryClick?.(subcategoryId)
		setIsOpen(false)
	}

	return (
		<div className={styles.container}>
			<button
				className={styles.tab}
				onClick={toggleCatalog}
				aria-expanded={isOpen}
			>
				<span className={styles.tabText}>Каталог навыков</span>
				<span className={`${styles.arrow} ${isOpen ? styles.arrowUp : styles.arrowDown}`}>
					▼
				</span>
			</button>

			{isOpen && (
				<div className={styles.catalog}>
					{categoriesWithSubcategories.length > 0 ? (
						categoriesWithSubcategories.map((category) => (
							<SkillCategoryUI
								key={category.id}
								skillCategory={category}
								subSkills={category.subcategories}
								callback={handleSubcategoryClick}
							/>
						))
					) : (
						<div className={styles.empty}>Категории не найдены</div>
					)}
				</div>
			)}
		</div>
	)
}

export default SkillsCatalog