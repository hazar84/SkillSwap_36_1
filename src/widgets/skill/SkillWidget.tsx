import React, { useMemo } from 'react'
import { SkillInfo } from '../../entities/skills/component/skill-info/skillInfo'
import { Gallery } from '../../entities/skills/component/gallery'
import { Button } from '../../shared/ui/Button/Button'
import { LikeButtonUI } from '../../shared/ui/LikeButtonUI/LikeButtonUI'
import s from './SkillWidget.module.css'
import type { TSkill } from '../../shared/lib/types'
import { useSelector } from '../../app/providers/store'
import {
	selectCategories,
	selectSubcategories,
} from '../../entities/skills/model/skillsSlice'

type Props = {
	skill: TSkill
	liked?: boolean
	onPropose?: (id: string) => void
	onToggleLike?: (id: string) => void
	isProposed: boolean
}

export const SkillWidget: React.FC<Props> = ({
	skill,
	liked = false,
	onPropose,
	onToggleLike,
	isProposed,
}) => {
	const handlePropose = () => onPropose?.(String(skill.id))
	const handleLike = () => onToggleLike?.(String(skill.id))

	const subcategories = useSelector(selectSubcategories)
	const categories = useSelector(selectCategories)

	const { categoryName, subcategoryName } = useMemo(() => {
		const sub = subcategories.find((s) => s.id === skill.subcategoryId)
		const cat = sub
			? categories.find((c) => c.id === sub.categoryId)
			: undefined

		return {
			categoryName: cat?.name || '',
			subcategoryName: sub?.name || '',
		}
	}, [subcategories, categories, skill.subcategoryId])

	return (
		<div className={s.wrapper}>
			<section className={s.root} aria-label={skill.name}>
				<div className={s.inner}>
					<div className={s.actions}>
						<LikeButtonUI
							active={Boolean(liked)}
							onClick={handleLike}
							ariaLabel='лайк'
						/>
						<button className={s.iconBtn} aria-label='поделиться'>
							<img src='/icons/share.svg' alt='' />
						</button>
						<button className={s.iconBtn} aria-label='меню'>
							<img src='/icons/more-square.svg' alt='' />
						</button>
					</div>

					<div className={s.content}>
						<div className={s.colInfo}>
							<SkillInfo
								title={skill.name}
								text={skill.description}
								category={categoryName}
								subCategory={subcategoryName}
							/>
							<div className={s.cta}>
								<Button
									variant={isProposed ? 'secondary' : 'primary'}
									onClick={handlePropose}
									disabled={isProposed}
									className={isProposed ? s.proposedBtn : ''}
								>
									{isProposed ? 'Обмен предложен' : 'Предложить обмен'}
								</Button>
							</div>
						</div>

						<div className={s.colMedia}>
							<Gallery images={skill.images ?? []} />
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
