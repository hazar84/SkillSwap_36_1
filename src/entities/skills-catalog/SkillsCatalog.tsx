import { useState } from 'react'
<<<<<<< HEAD
import { useSelector, useDispatch } from '../../app/providers/store'
import { fetchCategories, fetchSubcategories, selectCategoriesForFilter } from '../skills/model/skillsSlice'
import { useEffect } from 'react'
import SkillsCatalogUI from './SkillsCatalogUI.tsx'
=======
import { useSelector } from '../../app/providers/store'
import { SkillCategoryUI } from '../skills/skill-category-UI/skillCategoryUI'
import { selectCategoriesForFilter } from '../skills/model/skillsSlice'
import styles from './SkillsCatalog.module.css'
>>>>>>> 07fb68812f454ff5a506ffc2a9df29ee1faf9523

export type SkillsCatalogProps = {
	onSubcategoryClick?: (subcategoryId: string) => void
}

export const SkillsCatalog = ({ onSubcategoryClick }: SkillsCatalogProps) => {
	const [isOpen, setIsOpen] = useState(false)
<<<<<<< HEAD
	const dispatch = useDispatch()
	const categories = useSelector(selectCategoriesForFilter)
	useEffect(() => {
		dispatch(fetchCategories())
		dispatch(fetchSubcategories())
	}, [dispatch])
	const toggleCatalog = () => setIsOpen(prev => !prev)
=======

	const categoriesWithSubcategories = useSelector(selectCategoriesForFilter)

	const toggleCatalog = () => {
		setIsOpen((prev) => !prev)
	}

>>>>>>> 07fb68812f454ff5a506ffc2a9df29ee1faf9523
	const handleSubcategoryClick = (subcategoryId: string) => {
		onSubcategoryClick?.(subcategoryId)
		setIsOpen(false)
	}

	return (
<<<<<<< HEAD
		<SkillsCatalogUI
			categories={categories}
			isOpen={isOpen}
			onToggle={toggleCatalog}
			onSubcategoryClick={handleSubcategoryClick}
		/>
=======
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
>>>>>>> 07fb68812f454ff5a506ffc2a9df29ee1faf9523
	)
}

export default SkillsCatalog