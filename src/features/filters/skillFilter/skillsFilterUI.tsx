import React from 'react'

import type { TCategoryWithSubcategories } from './skillsFilter'
import {
	CheckboxCategoryUI,
	type CheckboxCategoryUIProps,
} from '../../../shared/ui/CheckboxCategoryUI/CheckboxCategoryUI'
import CheckboxUI from '../../../shared/ui/CheckboxUI/index'
import s from './SkillsFilter.module.css'


type CategoryItemProps = {
	category: TCategoryWithSubcategories
	isExpanded: boolean
	state: CheckboxCategoryUIProps['state']
	selectedSubcategoryIds: string[]
	onCategoryClick: (category: TCategoryWithSubcategories) => void
	onSelectSubcategory: (subcategoryId: string, e: React.MouseEvent) => void
}

const CategoryItem: React.FC<CategoryItemProps> = React.memo(
	({
		category,
		isExpanded,
		state,
		selectedSubcategoryIds,
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
					<ul
						className={s.subcategoryList}
						onClick={(e) => e.stopPropagation()}
					>
						{category.subcategories.map((subcategory) => (
							<li
								key={subcategory.id}
								className={s.subcategoryItem}
								onClick={(e) => onSelectSubcategory(subcategory.id, e)}
							>
								<CheckboxUI
									className={s.checkbox}
									ariaLabel={`Выбрать подкатегорию ${subcategory.name}`}
									checked={selectedSubcategoryIds.includes(subcategory.id)}
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

type SkillsFilterUIProps = {
	subcategories: TCategoryWithSubcategories[]
	selectedSubcategoryIds: string[]
	expandedCategories: Set<string>
	categoryCheckboxStates: Record<string, CheckboxCategoryUIProps['state']>
	onCategoryClick: (category: TCategoryWithSubcategories) => void
	onSelectSubcategory: (subcategoryId: string, e: React.MouseEvent) => void
}

export const SkillsFilterUI: React.FC<SkillsFilterUIProps> = React.memo(
	({
		subcategories,
		selectedSubcategoryIds,
		expandedCategories,
		categoryCheckboxStates,
		onCategoryClick,
		onSelectSubcategory,
	}) => {
		return (
			<div className={s.filterWrapper}>
				<h3 className={s.title}>Навыки</h3>
				<ul className={s.categoryList}>
					{subcategories.map((category) => (
						<CategoryItem
							key={category.id}
							category={category}
							isExpanded={expandedCategories.has(category.id)}
							state={categoryCheckboxStates[category.id]}
							onCategoryClick={onCategoryClick}
							onSelectSubcategory={onSelectSubcategory}
							selectedSubcategoryIds={selectedSubcategoryIds}
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
