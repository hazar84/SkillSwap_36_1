import React from 'react'
import { SkillInfo } from '../../entities/skills/component/skill-info/skillInfo'
import { Gallery } from '../../entities/skills/component/gallery'
import { Button } from '../../shared/ui/Button/Button'
import { LikeButtonUI } from '../../shared/ui/LikeButtonUI/LikeButtonUI'
import s from './SkillWidget.module.css'
import type { TSkill } from '../../shared/lib/types'

type Props = {
	skill: TSkill
	onPropose?: (id: string) => void
	onToggleLike?: (id: string) => void
}

export const SkillWidget: React.FC<Props> = ({
	skill,
	onPropose,
	onToggleLike,
}) => {
	const handlePropose = () => onPropose?.(String(skill.id))
	const handleLike = () => onToggleLike?.(String(skill.id))

	return (
		<section className={s.root} aria-label={skill.title}>
			<div className={s.inner}>
				<div className={s.actions}>
					<LikeButtonUI
						active={Boolean(skill.liked)}
						ariaLabel='лайк'
						onClick={handleLike}
					/>
					<button className={s.iconBtn} aria-label='share'>
						↗
					</button>
					<button className={s.iconBtn} aria-label='menu'>
						⋮
					</button>
				</div>

				<div className={s.content}>
					<div className={s.colInfo}>
						<SkillInfo
							title={skill.title}
							text={skill.text}
							category={skill.category}
							subCategory={skill.subCategory}
						/>
						<div className={s.cta}>
							<Button variant='primary' onClick={handlePropose}>
								Предложить обмен
							</Button>
						</div>
					</div>

					<div className={s.colMedia}>
						<Gallery images={skill.images} />
					</div>
				</div>
			</div>
		</section>
	)
}
