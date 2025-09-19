import type { FC } from 'react'
import { useDispatch, useSelector } from '../../../app/providers/store'
import { filtersActions, selectMode } from '../model/filtersSlice'
import { SkillTypeFilterUI } from './SkillTypeFilterUI'

export const SkillTypeFilter: FC = () => {
	const modeState = useSelector(selectMode)
	const dispatch = useDispatch()

	const modeOptions = [
		{ value: 'Всё', mode: 'all' },
		{ value: 'Хочу научиться', mode: 'wantToLearn' },
		{ value: 'Могу научить', mode: 'canTeach' },
	]

	const handleValueChange = (mode: string) => {
		dispatch(filtersActions.setMode(mode as typeof modeState))
	}

	return (
		<SkillTypeFilterUI
			options={modeOptions}
			selectedValue={modeState}
			onValueChange={handleValueChange}
		/>
	)
}
