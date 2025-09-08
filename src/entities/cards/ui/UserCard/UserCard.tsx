import React from 'react'
import type { TUser } from '../../../../shared/lib/types'
import SkillUI from '../../../../entities/cards/ui/skill/skill'
import { Button } from '../../../../shared/ui/Button'
import LikeButtonUI from '../../../../shared/ui/LikeButtonUI'
import styles from './UserCard.module.css'
import { useNavigate } from 'react-router-dom'

type UserCardProps = {
	user: TUser
	currentUserId: string
	variant?: 'default' | 'about' // отображать карточку по-умолчанию или с описанием
	onToggleFavorite?: (id: string) => void // переключатель лайка/избранного
}

export const UserCard: React.FC<UserCardProps> = ({
	user,
	currentUserId,
	variant = 'default',
	onToggleFavorite,
}) => {
	const navigate = useNavigate()

	// Определяем количество лет пользователя
	const birthYear = new Date(user.birthDate).getFullYear()
	const age = new Date().getFullYear() - birthYear

	// Определяем количество навыков, которые не влезли в карточку и першли в +N, показываем максимум 2 навыка
	const visibleWant = user.subcategoriesWantToLearn.slice(0, 2)
	const hiddenCount = user.subcategoriesWantToLearn.length - visibleWant.length

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
					<SkillUI skillId={user.skillCanTeach.id} />
				</div>
			</div>

			<div className={styles.section}>
				<p className={styles.title}>Хочет научиться:</p>
				<div className={styles.skills}>
					{visibleWant.map((subId) => (
						<SkillUI key={subId} subCategoryId={subId} />
					))}
					{hiddenCount > 0 && (
						<div className={styles.moreCounter}>+{hiddenCount}</div>
					)}
				</div>
			</div>

			{variant === 'default' &&
				(isExchangeProposed ? (
					<Button
						variant='secondary'
						onClick={() => navigate(`/skill/${user.skillCanTeach.id}`)}
					>
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
					<Button
						variant='primary'
						onClick={() => navigate(`/skill/${user.skillCanTeach.id}`)}
					>
						Подробнее
					</Button>
				))}
		</div>
	)
}

export default UserCard
