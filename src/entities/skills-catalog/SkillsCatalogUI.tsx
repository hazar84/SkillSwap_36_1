import React from 'react'
import styles from './SkillsCatalog.module.css'
import { SkillCategoryUI } from '../skills/skill-category-UI/skillCategoryUI'
import type { TCategory, TSubcategory } from '../../shared/lib/types'

export type SkillsCatalogUIProps = {
  categories: (TCategory & { subcategories: TSubcategory[] })[]
  isOpen: boolean
  onToggle: () => void
  onSubcategoryClick: (subcategoryId: string) => void
}

export const SkillsCatalogUI: React.FC<SkillsCatalogUIProps> = ({ categories, isOpen, onToggle, onSubcategoryClick }) => (
  <div className={styles.container}>
    <button className={styles.tab} onClick={onToggle} aria-expanded={isOpen}>
      <span className={styles.tabText}>Все навыки</span>
      <span className={`${styles.arrow} ${isOpen ? styles.arrowUp : styles.arrowDown}`}>▼</span>
    </button>
    {isOpen && (
      <div className={styles.catalog}>
        {categories.length > 0 ? (
          categories.map((category) => (
            <SkillCategoryUI
              key={category.id}
              skillCategory={category}
              subSkills={category.subcategories}
              callback={onSubcategoryClick}
            />
          ))
        ) : (
          <div className={styles.empty}>Категории не найдены</div>
        )}
      </div>
    )}
  </div>
)

export default SkillsCatalogUI
