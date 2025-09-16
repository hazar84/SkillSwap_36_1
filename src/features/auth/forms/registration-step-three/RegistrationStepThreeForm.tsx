import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from '../../../../app/providers/store'
import {
	updateStep3Data,
	generateSkillId,
	setCreatedDate,
} from '../../model/registrationSlice'
import { useNavigate } from 'react-router-dom'
import {
	selectCategories,
	selectSubcategories,
} from '../../../../entities/skills/model/skillsSlice.ts'
import { setRussianLocalization } from './validationMessages.ts'
import RegistrationStepThreeFormUI from './RegistrationStepThreeFormUI'

type FormValues = {
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

	const categories = useSelector(selectCategories)
	const subcategories = useSelector(selectSubcategories)

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

		await dispatch(updateStep3Data(formDataWithIds))
		await dispatch(generateSkillId())
		await dispatch(setCreatedDate())
		navigate('/registration/step4')
	}

	const goBack = () => {
		navigate('/registration/step2')
	}

	return (
		<RegistrationStepThreeFormUI
			methods={methods}
			categories={categories}
			filteredSubcategories={filteredSubcategories}
			selectedCategoryId={selectedCategoryId}
			onSubmit={onSubmit}
			goBack={goBack}
		/>
	)
}

export default RegistrationStepThreeForm
