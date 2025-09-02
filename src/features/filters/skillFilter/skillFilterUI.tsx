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
		return (
			<li className={s.categoryItem} onClick={() => onCategoryClick(category)}>
				<div className={s.categoryHeader}>
					<CheckboxCategoryUI
						ariaLabel={`Выбрать категорию ${category.name}`}
						state={state}
					/>
					<span className={s.categoryName}>{category.name}</span>
					<button
						type='button'
						className={`${s.arrowBtn} ${isExpanded ? s.expanded : ''}`}
						aria-hidden='true'
						tabIndex={-1}
					>
						<svg
							width='24'
							height='24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M12 15.935c-.646 0-1.292-.249-1.781-.738L4.2 9.179a.696.696 0 0 1 0-.978.696.696 0 0 1 .978 0l6.018 6.018a1.136 1.136 0 0 0 1.606 0L18.821 8.2a.696.696 0 0 1 .978 0 .696.696 0 0 1 0 .978l-6.018 6.018c-.489.49-1.135.738-1.781.738z'
								fill='currentColor'
							/>
						</svg>
					</button>
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
	isLoading: boolean
	error: string | null
	selectedSkillIds: string[]
	expandedCategories: Set<string>
	categoryCheckboxStates: Record<string, CheckboxCategoryUIProps['state']>
	onCategoryClick: (category: TCategoryWithSubcategories) => void
	onSelectSubcategory: (subcategoryId: string, e: React.MouseEvent) => void
	isAllCategoriesOpen: boolean
	onToggleAllCategories: () => void
	canShowMore: boolean
}

export const SkillsFilterUI: React.FC<SkillsFilterUIProps> = React.memo(
	({
		skills,
		isLoading,
		error,
		selectedSkillIds,
		expandedCategories,
		categoryCheckboxStates,
		onCategoryClick,
		onSelectSubcategory,
		isAllCategoriesOpen,
		onToggleAllCategories,
	}) => {
		if (isLoading)
			return (
				<div className={s.filterWrapper}>
					<p>Загрузка...</p>
				</div>
			)
		if (error)
			return (
				<div className={s.filterWrapper}>
					<p>Ошибка: {error}</p>
				</div>
			)

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
							selectedSkillIds={selectedSkillIds}
							onCategoryClick={onCategoryClick}
							onSelectSubcategory={onSelectSubcategory}
						/>
					))}
				</ul>

				<button
					type='button'
					className={s.showAllBtn}
					onClick={onToggleAllCategories}
				>
					<span>{isAllCategoriesOpen ? 'Свернуть' : 'Все категории'}</span>
					<svg
						width='24'
						height='24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						className={`${s.arrow} ${isAllCategoriesOpen ? s.expanded : ''}`}
					>
						<path
							d='M12 15.935c-.646 0-1.292-.249-1.781-.738L4.2 9.179a.696.696 0 0 1 0-.978.696.696 0 0 1 .978 0l6.018 6.018a1.136 1.136 0 0 0 1.606 0L18.821 8.2a.696.696 0 0 1 .978 0 .696.696 0 0 1 0 .978l-6.018 6.018c-.489.49-1.135.738-1.781.738z'
							fill='currentColor'
						/>
					</svg>
				</button>
			</div>
		)
	}
)
