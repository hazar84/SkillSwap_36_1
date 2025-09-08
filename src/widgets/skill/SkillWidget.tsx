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
			<div className={s.info}>
				<SkillInfo skill={skill} />
				<div className={s.actions}>
					<Button variant='primary' onClick={handlePropose}>
						Предложить обмен
					</Button>
					<LikeButtonUI liked={Boolean(skill.liked)} onClick={handleLike} />
				</div>
			</div>
			<div className={s.media}>
				<Gallery images={skill.images} />
			</div>
		</section>
	)
}
