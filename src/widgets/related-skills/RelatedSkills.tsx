import React from 'react'
import s from './RelatedSkills.module.css'
import { useSelector } from '../../app/providers/store'
import { selectCards } from '../../entities/cards/model/cardsSlice'
import { selectSubcategoryToCategoryMap } from '../../entities/skills/model/skillsSlice'
import { selectUser } from '../../features/auth/model/userSlice'
import type { TUser } from '../../shared/lib/types'
import { UserCard } from '../../entities/cards/ui/UserCard/UserCard'

type Props = {
	categoryId: string
	onToggleLike?: (userId: string) => void
}

export const RelatedSkills: React.FC<Props> = ({
	categoryId,
	onToggleLike,
}) => {
	const users = useSelector(selectCards)
	const subToCat = useSelector(selectSubcategoryToCategoryMap)
	const currentUser = useSelector(selectUser)

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
						<UserCard
							user={u}
							currentUserId={currentUser?.id ?? ''}
							onToggleFavorite={(id) => onToggleLike?.(id)}
						/>
					</li>
				))}
			</ul>
		</section>
	)
}
