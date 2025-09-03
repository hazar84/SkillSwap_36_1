import React from 'react'

import type { TCategoryWithSubcategories } from './useSkillsData'
import {
	CheckboxCategoryUI,
	type CheckboxCategoryUIProps,
} from '../../../shared/ui/CheckboxCategoryUI/CheckboxCategoryUI'
import CheckboxUI from '../../../shared/ui/CheckboxUI/index'
import s from './SkillFilter.module.css'

type CategoryItemProps = {
	category: TCategoryWithSubcategories
	isExpanded: boolean
	state: CheckboxCategoryUIProps['state']
	selectedSkillIds: string[]
	onCategoryClick: (category: TCategoryWithSubcategories) => void
	onSelectSubcategory: (subcategoryId: string, e: React.MouseEvent) => void
}

const CategoryItem: React.FC<CategoryItemProps> = React.memo(
	({
		category,
		isExpanded,
		state,
		selectedSkillIds,
		onCategoryClick,
		onSelectSubcategory,
	}) => {
		const headerCls = `${s.categoryHeader} ${isExpanded ? s.expanded : ''}`
		return (
			<li className={s.categoryItem} onClick={() => onCategoryClick(category)}>
				<div className={headerCls}>
					<CheckboxCategoryUI
						ariaLabel={`Выбрать категорию ${category.name}`}
						state={state}
					/>
					<span className={s.categoryName}>{category.name}</span>
				</div>
				{isExpanded && (
					<ul className={s.subcategoryList}>
						{category.subcategories.map((subcategory) => (
							<li
								key={subcategory.id}
								className={s.subcategoryItem}
								onClick={(e) => onSelectSubcategory(subcategory.id, e)}
							>
								<CheckboxUI
									className={s.checkbox}
									ariaLabel={`Выбрать навык ${subcategory.name}`}
									checked={selectedSkillIds.includes(subcategory.id)}
								/>
								<span className={s.subcategoryName}>{subcategory.name}</span>
							</li>
						))}
					</ul>
				)}
			</li>
		)
	}
)

// Пропсы для основного компонента
type SkillsFilterUIProps = {
	skills: TCategoryWithSubcategories[]
	selectedSkillIds: string[]
	expandedCategories: Set<string>
	categoryCheckboxStates: Record<string, CheckboxCategoryUIProps['state']>
	onCategoryClick: (category: TCategoryWithSubcategories) => void
	onSelectSubcategory: (subcategoryId: string, e: React.MouseEvent) => void
}

export const SkillsFilterUI: React.FC<SkillsFilterUIProps> = React.memo(
	({
		skills,
		selectedSkillIds,
		expandedCategories,
		categoryCheckboxStates,
		onCategoryClick,
		onSelectSubcategory,
	}) => {
		return (
			<div className={s.filterWrapper}>
				<h3 className={s.title}>Навыки</h3>
				<ul className={s.categoryList}>
					{skills.map((category) => (
						<CategoryItem
							key={category.id}
							category={category}
							isExpanded={expandedCategories.has(category.id)}
							state={categoryCheckboxStates[category.id]}
							onCategoryClick={onCategoryClick}
							onSelectSubcategory={onSelectSubcategory}
							selectedSkillIds={selectedSkillIds}
						/>
					))}
				</ul>
					<button type='button' className={s.showAllBtn}>
						<span>Все категории</span>
					</button>
			</div>
		)
	}
)
