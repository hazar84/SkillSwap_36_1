import type { FC } from 'react'
import { useSelector, useDispatch } from '../../../app/providers/store'
import { selectCity, filtersActions } from '../../filters/model/filtersSlice'
import { CityFilterUI } from './cityFilterUI'

export const CityFilter: FC = () => {
	const dispatch = useDispatch()
	const cities = useSelector(selectCity)

	const handleChange = (selectedCity: string) => {
		if (cities.includes(selectedCity)) {
			dispatch(filtersActions.removeCity(selectedCity))
		} else {
			dispatch(filtersActions.addCity(selectedCity))
		}
	}

	return <CityFilterUI value={cities} onChange={handleChange} />
}
