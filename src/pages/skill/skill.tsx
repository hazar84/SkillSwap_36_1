import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from '../../app/providers/store'
import { Header } from '../../widgets/header/header'
import { FooterUI } from '../../widgets/footer/footer'
import { SkillWidget } from '../../widgets/skill/SkillWidget'
import { RelatedSkills } from '../../widgets/related-skills/RelatedSkills'
import { UserCard } from '../../entities/cards/ui/UserCard/UserCard'
import { selectCards } from '../../entities/cards/model/cardsSlice'
import { selectUser } from '../../features/auth/model/userSlice'
import { selectSubcategoryToCategoryMap } from '../../entities/skills/model/skillsSlice'
import s from './skill.module.css'

export const SkillPage: React.FC = () => {
	const { id = '' } = useParams()

	const users = useSelector(selectCards)
	const currentUser = useSelector(selectUser)
	const subcategoryToCategoryMap = useSelector(selectSubcategoryToCategoryMap)

	const user = React.useMemo(() => users.find((u) => u.id === id), [users, id])

	if (!user) {
		return (
			<>
				<Header />
				<main className={s.notFound}>Пользователь не найден</main>
				<FooterUI />
			</>
		)
	}

	const categoryId = subcategoryToCategoryMap[user.skillCanTeach.subcategoryId]

	return (
		<>
			<Header />
			<div className={s.page}>
				<div className={s.shell}>
					<main className={s.container}>
						<div className={s.topRow}>
							<div className={s.cardCol}>
								<UserCard
									user={user}
									currentUserId={currentUser?.id ?? ''}
									variant='about'
								/>
							</div>
							<div className={s.skillCol}>
								<SkillWidget skill={user.skillCanTeach} />
							</div>
						</div>
						<div className={s.relatedRow}>
							<RelatedSkills categoryId={categoryId} />
						</div>
					</main>
				</div>
			</div>
			<FooterUI />
		</>
	)
}

export default SkillPage
