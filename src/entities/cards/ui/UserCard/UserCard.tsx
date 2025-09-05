import React from 'react'
import type {
	TUser,
	TSkill,
	TCategory,
	TSubcategory,
} from '../../../../shared/lib/types'
import SkillUI from '../../../../entities/cards/ui/skill/skill'
import type { SkillCategory } from '../../../../entities/cards/ui/skill/skill'
import { Button } from '../../../../shared/ui/Button'
import LikeButtonUI from '../../../../shared/ui/LikeButtonUI'
import styles from './UserCard.module.css'

type UserCardProps = {
	user: TUser
	skills: TSkill[]
	categories: TCategory[]
	subcategories: TSubcategory[]
	currentUserId: string
	variant?: 'default' | 'about'     // отображать карточку по-умолчанию или с описанием
	onMoreClick?: (id: string) => void 		// действие по нажатию на кнопку
	onToggleFavorite?: (id: string) => void  	// переключатель лайка/избранного
}

// Определяем количество выводимых навыков - "Хочет научиться" в зависимости
// от количества символов в названии навыка у первых двух позиций в массиве,
// чтобы элементы навыков поместились в одну строчку в карточке.
// Число - 18 смволов просто подобрано.
// Невлезающие элементы уходят в +N
const getVisibleCount = (skills: { name: string }[]) => {
	const checkRange = skills.slice(0, 2)
	if (checkRange.some((s) => s.name.length > 18)) {
		return 1
	}
	return 2
}

export const UserCard: React.FC<UserCardProps> = ({
	user,
	skills,
	categories,
	subcategories,
	currentUserId,
	variant = 'default',
	onMoreClick,
	onToggleFavorite,
}) => {
	// Определяем количество лет пользователя
	const birthYear = new Date(user.birthDate).getFullYear()
	const age = new Date().getFullYear() - birthYear

	// Получаем название категории, к которой относится подкатегория
	// Эта функция нужна, чтобы правильно подбирался цвет для навыков
	const getCategoryName = (subcategoryId: string): string => {
		const sub = subcategories.find((s) => s.id === subcategoryId)
		const category = categories.find((c) => c.id === sub?.categoryId)
		return category?.name || 'Больше'
	}

	// Ищем навыки, которые может преподавать
	const teachSkills = user.skillCanTeach
		.map((s) => (typeof s === 'string' ? skills.find((x) => x.id === s) : s))
		.filter((s): s is TSkill => Boolean(s))

	// Ищем подкатегории, которые хочет изучать
	const wantToLearnSubs = user.subcategoriesWantToLearn
		.map((sub) =>
			typeof sub === 'string' ? subcategories.find((s) => s.id === sub) : sub
		)
		.filter((s): s is TSubcategory => Boolean(s))

	// Определяем количество навыков, которые не влезли в карточку и першли в +N
	const visibleCount = getVisibleCount(wantToLearnSubs)
	const visibleWant = wantToLearnSubs.slice(0, visibleCount)
	const hiddenCount = wantToLearnSubs.length - visibleCount

	// Определяем, установлен ли лайк/избранное
	const isFavorite = user.favorites.includes(currentUserId)

	// Определяем, предложен ли обмен
	const isExchangeProposed = user.skillExchanges?.includes(currentUserId)

	return (
		<div className={styles.card}>
			<div className={styles.header}>
				<img src={user.avatarUrl} alt={user.name} className={styles.avatar} />
				<div className={styles.info}>
					<h3 className={styles.name}>{user.name}</h3>
					<p className={styles.city}>
						{user.city}, {age} лет
					</p>
				</div>
				{variant === 'default' && (
					<LikeButtonUI
						ariaLabel='Добавить в избранное'
						active={isFavorite}
						onClick={() => onToggleFavorite?.(user.id)}
						className={styles.favoriteBtn}
					/>
				)}
			</div>

			{variant === 'about' && user.aboutUser && (
				<div className={styles.about}>{user.aboutUser}</div>
			)}

			<div className={styles.section}>
				<p className={styles.title}>Может научить:</p>
				<div className={styles.skills}>
					{teachSkills.map((skill) => {
						return (
							<SkillUI
								key={skill.id}
								category={getCategoryName(skill.subcategoryId) as SkillCategory}
							>
								{skill.name}
							</SkillUI>
						)
					})}
				</div>
			</div>

			<div className={styles.section}>
				<p className={styles.title}>Хочет научиться:</p>
				<div className={styles.skills}>
					{visibleWant.map((sub) => {
						return (
							<SkillUI 
								key={sub.id} 
								category={getCategoryName(sub.id) as SkillCategory}
							>
								{sub.name}
							</SkillUI>
						)
					})}
					{hiddenCount > 0 && (
						<SkillUI category='Больше'>+{hiddenCount}</SkillUI>
					)}
				</div>
			</div>

			{variant === 'default' &&
				(isExchangeProposed ? (
					<Button variant='secondary' onClick={() => onMoreClick?.(user.id)}>
						<span
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								gap: '8px',
							}}
						>
							<img
								src='/icons/clock.svg'
								alt='icon-clock'
								width='18'
								height='18'
							/>
							Обмен предложен
						</span>
					</Button>
				) : (
					<Button variant='primary' onClick={() => onMoreClick?.(user.id)}>
						Подробнее
					</Button>
				))}
		</div>
	)
}

export default UserCard
