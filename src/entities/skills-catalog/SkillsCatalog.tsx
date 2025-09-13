import { useState } from 'react';
import { useSelector, useDispatch } from '../../app/providers/store';
import { selectCategoriesForFilter } from '../skills/model/skillsSlice';
import { filtersActions } from '../../features/filters/model/filtersSlice';
import { SkillCategoryUI } from '../skills/skill-category-UI/skillCategoryUI';
import styles from './SkillsCatalog.module.css';

export const SkillsCatalog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector(selectCategoriesForFilter);


  const toggleCatalog = () => setIsOpen(prev => !prev);

  const handleSubcategoryClick = (subcategoryId: string) => {
    dispatch(filtersActions.setSkillIds([subcategoryId]));
    setIsOpen(false);
  };

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
          {categories.length > 0 ? (
            categories.map((category) => (
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
  );
};

export default SkillsCatalog;