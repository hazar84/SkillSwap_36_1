import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from '../../../../app/providers/store'
import {
	updateStep3Data,
	generateSkillId,
	setCreatedDate,
	selectRegistrationData,
	generateUserId,
} from '../../model/registrationSlice'
import { useNavigate } from 'react-router-dom'
import {
	selectCategories,
	selectSubcategories,
} from '../../../../entities/skills/model/skillsSlice.ts'
import { setRussianLocalization } from './validationMessages.ts'
import RegistrationStepThreeFormUI from './RegistrationStepThreeFormUI'
import { ModalUI } from '../../../../shared/ui/Modal/Modal.tsx'
import { CheckSkillView } from '../../check-skill-view/checkSkillView.tsx'
import { addLocalUser, type TAuthUser } from '../../model/thunks.ts'

export type FormValues = {
	teachCategoryId: string
	teachSubcategoryId: string
	skillName: string
	skillDescription: string
}

setRussianLocalization()

const schema = yup.object().shape({
	teachCategoryId: yup.string().required('Категория обязательна'),
	teachSubcategoryId: yup.string().required('Подкатегория обязательна'),
	skillName: yup
		.string()
		.required('Название навыка обязательно')
		.min(3, 'Название навыка должно быть минимум 3 символа')
		.max(50, 'Максимум 50 символов'),
	skillDescription: yup
		.string()
		.required('Описание навыка обязательно')
		.min(10, 'Описание должно быть минимум 10 символов')
		.max(200, 'Максимум 200 символов'),
})

const RegistrationStepThreeForm: React.FC = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [pendingData, setPendingData] = useState<FormValues | null>(null)
	const [shouldSubmit, setShouldSubmit] = useState(false)

	const categories = useSelector(selectCategories)
	const subcategories = useSelector(selectSubcategories)
	const registrationData = useSelector(selectRegistrationData) as TAuthUser

	const methods = useForm<FormValues>({
		resolver: yupResolver(schema),
		mode: 'onChange',
	})

	const { categoryNameToIdMap, subcategoryNameToIdMap } = useMemo(() => {
		const categoryNameToId: Record<string, string> = {}
		categories.forEach((cat) => {
			categoryNameToId[cat.name] = cat.id
		})

		const subcategoryNameToId: Record<string, string> = {}
		subcategories.forEach((sub) => {
			subcategoryNameToId[sub.name] = sub.id
		})

		return {
			categoryNameToIdMap: categoryNameToId,
			subcategoryNameToIdMap: subcategoryNameToId,
		}
	}, [categories, subcategories])

	const selectedCategoryName = methods.watch('teachCategoryId')
	const selectedCategoryId = categoryNameToIdMap[selectedCategoryName]
	const filteredSubcategories = subcategories.filter(
		(sub) => sub.categoryId === selectedCategoryId
	)

	const onSubmit = async (data: FormValues) => {
		const formDataWithIds = {
			...data,
			teachCategoryId:
				categoryNameToIdMap[data.teachCategoryId] || data.teachCategoryId,
			teachSubcategoryId:
				subcategoryNameToIdMap[data.teachSubcategoryId] ||
				data.teachSubcategoryId,
		}
		setPendingData(formDataWithIds)
		setIsModalOpen(true)
	}

	const confirmSubmit = async () => {
		if (!pendingData) return

		// const formDataWithIds = {
		// 	...pendingData,
		// 	teachCategoryId:
		// 		categoryNameToIdMap[pendingData.teachCategoryId] ||
		// 		pendingData.teachCategoryId,
		// 	teachSubcategoryId:
		// 		subcategoryNameToIdMap[pendingData.teachSubcategoryId] ||
		// 		pendingData.teachSubcategoryId,
		// }

		await dispatch(updateStep3Data(pendingData))
		await dispatch(generateUserId())
		await dispatch(generateSkillId())
		await dispatch(setCreatedDate())
		setIsModalOpen(false)
		setShouldSubmit(true)
	}

	useEffect(() => {
		if (!shouldSubmit) return
		if (!registrationData) return

		// 🔹 теперь registrationData уже обновлён
		dispatch(addLocalUser(registrationData))

		navigate(`/login`)

		setShouldSubmit(false)
	}, [shouldSubmit, registrationData, dispatch, navigate])

	const cancelSubmit = () => {
		setIsModalOpen(false)
		setPendingData(null)
	}

	const goBack = () => {
		navigate('/registration/step2')
	}

	return (
		<>
			<RegistrationStepThreeFormUI
				methods={methods}
				categories={categories}
				filteredSubcategories={filteredSubcategories}
				selectedCategoryId={selectedCategoryId}
				onSubmit={onSubmit}
				goBack={goBack}
			/>
			{/* 🔹 Модалка */}
			{isModalOpen && (
				<ModalUI isOpen={isModalOpen} onClose={cancelSubmit}>
					<CheckSkillView
						data={pendingData!}
						complete={confirmSubmit}
						onEdit={cancelSubmit}
					/>
				</ModalUI>
			)}
		</>
	)
}

export default RegistrationStepThreeForm
