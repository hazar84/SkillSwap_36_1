import React from 'react'
import { SkillInfo } from '../../entities/skills/component/skill-info/skillInfo'
import { Gallery } from '../../entities/skills/component/gallery'
import { Button } from '../../shared/ui/Button/Button'
import { LikeButtonUI } from '../../shared/ui/LikeButtonUI/LikeButtonUI'
import s from './SkillWidget.module.css'
import type { TSkill, TCategory, TSubcategory } from '../../shared/lib/types'

type Props = {
	skill: TSkill
	categories: TCategory[]
	subcategories: TSubcategory[]
	liked?: boolean
	onPropose?: (id: string) => void
	onToggleLike?: (id: string) => void
}

export const SkillWidget: React.FC<Props> = ({
	skill,
	categories,
	subcategories,
	liked = false,
	onPropose,
	onToggleLike,
}) => {
	const handlePropose = () => onPropose?.(String(skill.id))
	const handleLike = () => onToggleLike?.(String(skill.id))

	const subcategory = subcategories.find((s) => s.id === skill.subcategoryId)
	const category = categories.find((c) => c.id === subcategory?.categoryId)

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
								category={category?.name || ''}
								subCategory={subcategory?.name || ''}
							/>
							<div className={s.cta}>
								<Button variant='primary' onClick={handlePropose}>
									Предложить обмен
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
