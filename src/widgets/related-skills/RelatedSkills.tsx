// src/widgets/related-skills/RelatedSkills.tsx
import React from 'react'
import s from './RelatedSkills.module.css'
import { Button } from '../../shared/ui/Button/Button'
import { LikeButtonUI } from '../../shared/ui/LikeButtonUI/LikeButtonUI'
import SkillUI from '../../entities/cards/ui/skill/skill'
import { useSelector } from '../../app/providers/store'
import { selectCards } from '../../entities/cards/model/cardsSlice'
import { selectSubcategoryToCategoryMap } from '../../entities/skills/model/skillsSlice'
import type { TUser } from '../../shared/lib/types'

type Props = {
	categoryId: string
	onOpenUser?: (userId: string) => void
	onToggleLike?: (userId: string) => void
}

const getAge = (birthDate: Date | string) => {
	const d = new Date(birthDate)
	const diff = Date.now() - d.getTime()
	const ageDt = new Date(diff)
	return Math.abs(ageDt.getUTCFullYear() - 1970)
}

export const RelatedSkills: React.FC<Props> = ({
	categoryId,
	onOpenUser,
	onToggleLike,
}) => {
	const users = useSelector(selectCards)
	const subToCat = useSelector(selectSubcategoryToCategoryMap)

	const items = React.useMemo<TUser[]>(() => {
		return users
			.filter((u) => subToCat[u.skillCanTeach.subcategoryId] === categoryId)
			.sort((a, b) => (b.likes?.length || 0) - (a.likes?.length || 0))
			.slice(0, 4)
	}, [users, subToCat, categoryId])

	if (!items.length) return null

	return (
		<section className={s.section} aria-label='Похожие предложения'>
			<h3 className={s.title}>Похожие предложения</h3>
			<ul className={s.list}>
				{items.map((u) => (
					<li key={u.id} className={s.card}>
						<button
							className={s.likeBtn}
							aria-label='лайк'
							onClick={() => onToggleLike?.(u.id)}
						>
							<LikeButtonUI active={Boolean(u.likes?.length)} />
						</button>

						<div className={s.header}>
							<img
								className={s.avatar}
								src={u.avatarUrl || `/images/users/${u.name.toLowerCase()}.jpg`}
								alt={u.name}
								onError={(e) => {
									;(e.currentTarget as HTMLImageElement).src =
										'/images/users/max.jpg'
								}}
							/>
							<div className={s.person}>
								<div className={s.name}>{u.name}</div>
								<div className={s.meta}>
									{u.city}, {getAge(u.birthDate)} лет
								</div>
							</div>
						</div>

						<div className={s.block}>
							<div className={s.blockTitle}>Может научить:</div>
							<SkillUI subcategoryId={u.skillCanTeach.subcategoryId}>
								{u.skillCanTeach.name}
							</SkillUI>
						</div>

						<div className={s.block}>
							<div className={s.blockTitle}>Хочет научиться:</div>
							<div className={s.skillsRow}>
								{u.subcategoriesWantToLearn.slice(0, 2).map((sub) => (
									<SkillUI key={sub.id} subcategoryId={sub.id}>
										{sub.name}
									</SkillUI>
								))}
								{u.subcategoriesWantToLearn.length > 2 && (
									<span className={s.more}>
										+{u.subcategoriesWantToLearn.length - 2}
									</span>
								)}
							</div>
						</div>

						<div className={s.footer}>
							<Button variant='primary' onClick={() => onOpenUser?.(u.id)}>
								Подробнее
							</Button>
						</div>
					</li>
				))}
			</ul>
		</section>
	)
}
