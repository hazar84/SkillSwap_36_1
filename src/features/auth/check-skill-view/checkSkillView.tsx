/* 
как использовать:
<CheckSkillView
	data={skill: TSkill} - данные введенные на третье шаге регистрации
	onEdit={() => {}} - колфэк функция для редактирования навыка
	complete={() => {}} - колбэк функция для завершения регистрации
/>
*/

import style from './checkSkillView.module.css'
import { SkillInfo } from '../../../entities/skills/component/skill-info/skillInfo'
import { Button } from '../../../shared/ui/Button/Button'
import Gallery from '../../../entities/skills/component/gallery/Gallery'
import { useMemo } from 'react'
import {
	selectCategories,
	selectSubcategories,
} from '../../../entities/skills/model/skillsSlice'
import { useSelector } from 'react-redux'
import type { FormValues } from '../forms/registration-step-three/RegistrationStepThreeFormUI'

interface CheckSkillViewProps {
	data: FormValues
	skillImages: string[]
	onEdit: () => void
	complete: () => void
}

export const CheckSkillView = ({
	data,
	skillImages,
	onEdit,
	complete,
}: CheckSkillViewProps) => {
	const teachSubcategoryId = data.teachSubcategoryId
	const skillName = data.skillName
	const skillDescription = data.skillDescription

	const subcategories = useSelector(selectSubcategories)
	const categories = useSelector(selectCategories)

	const subcategory = useMemo(
		() => subcategories.find((sub) => sub.id === teachSubcategoryId) || null,
		[subcategories, teachSubcategoryId]
	)

	const category = useMemo(
		() =>
			subcategory
				? categories.find((cat) => cat.id === subcategory.categoryId) || null
				: null,
		[categories, subcategory]
	)

	return (
		<div className={style.checkSkillView}>
			<div className={style.title}>
				<h3 className={style.titleText}>Ваше предложение</h3>
				<div className={style.description}>
					Пожалуйста, проверьте и подтвердите правильность данных
				</div>
			</div>
			<div className={style.content}>
				<div className={style.skillInfo}>
					<SkillInfo
						title={skillName || ''}
						text={skillDescription || ''}
						category={category?.name || ''}
						subCategory={subcategory?.name || ''}
					/>

					<div className={style.buttons}>
						<Button variant='secondary' onClick={onEdit}>
							Редактировать
							<img src='/icons/edit.svg' alt='edit-icon' />
						</Button>
						<Button variant='primary' onClick={complete}>
							Готово
						</Button>
					</div>
				</div>
				<div className={style.gallery}>
					<Gallery images={skillImages} />
				</div>
			</div>
		</div>
	)
}
