import style from './checkSkillView.module.css'
import { SkillInfo } from '../../../entities/skills/component/skill-info/skillInfo'
import { Button } from '../../../shared/ui/Button/Button'
import Gallery from '../../../entities/skills/component/gallery/Gallery'
import { useSelector, } from '../../../app/providers/store'
import type { RootState } from '../../../app/providers/store'
import {
	selectCategories,
	selectSubcategories,
} from '../../../entities/skills/model/skillsSlice'

interface CheckSkillViewProps {
	onEdit: () => void
	complete: () => void
}

export const CheckSkillView = ({ onEdit, complete }: CheckSkillViewProps) => {
	const step3Data = useSelector((state: RootState) => ({
		teachSubcategoryId:
			state.registration.userData.skillCanTeach?.subcategoryId,
		skillName: state.registration.userData.skillCanTeach?.name,
		skillDescription: state.registration.userData.skillCanTeach?.description,
		skillImages: state.registration.userData.skillCanTeach?.images || [],
	}))

	const subcategory = useSelector((state: RootState) =>
		step3Data.teachSubcategoryId
			? selectSubcategories(state).find(
					(sub) => sub.id === step3Data.teachSubcategoryId
				)
			: null
	)

	const category = useSelector((state: RootState) =>
		subcategory?.categoryId
			? selectCategories(state).find((cat) => cat.id === subcategory.categoryId)
			: null
	)

	const completeRegistration = () => {
		complete()
	}

	const returnBack = () => {
		onEdit()
	}

	return (
		<div className={style.checkSkillView}>
			<div className={style.title}>
				<h3 className={style.titleText}>Ваше предложение</h3>
				<div className={style.description}>
					Пожалуйста, проверьте и подтвердите правильность данных
				</div>
			</div>
			<div className={style.content}>
				<div className={style.skillInfo}>
					<SkillInfo
						title={step3Data.skillName || ''}
						text={step3Data.skillDescription || ''}
						category={category?.name || ''}
						subCategory={subcategory?.name || ''}
					/>

					<div className={style.buttons}>
						<Button variant='secondary' onClick={returnBack}>
							Редактировать
							<img src='/icons/edit.svg' alt='edit-icon' />
						</Button>
						<Button variant='primary' onClick={completeRegistration}>
							Готово
						</Button>
					</div>
				</div>
				<div className={style.gallery}>
					<Gallery images={step3Data.skillImages} />
				</div>
			</div>
		</div>
	)
}
