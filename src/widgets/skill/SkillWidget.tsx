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
		<div className={s.wrapper}>
			<section className={s.root} aria-label={skill.title}>
				<div className={s.inner}>
					<div className={s.actions}>
						<LikeButtonUI liked={Boolean(skill.liked)} onClick={handleLike} />
						<button className={s.iconBtn} aria-label='Поделиться'>
							<img src='/icons/share.svg' alt='Поделиться' />
						</button>
						<button className={s.iconBtn} aria-label='Меню'>
							<img src='/icons/more-square.svg' alt='Меню' />
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
							<Gallery images={skill.images ?? []} />{' '}
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
