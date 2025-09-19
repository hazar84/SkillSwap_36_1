import type { FC } from 'react'
import { useSelector, useDispatch } from '../../../app/providers/store'
import {
	selectGender,
	filtersActions,
} from '../../filters/model/filtersSlice.ts'
import { GenderFilterUI } from './genderFilterUI.tsx'

export const GenderFilter: FC = () => {
	const dispatch = useDispatch()
	const gender = useSelector(selectGender)

	const handleChange = (newGender: typeof gender) => {
		dispatch(filtersActions.setGender(newGender))
	}

	return <GenderFilterUI value={gender} onChange={handleChange} />
}
