import type { FC } from 'react'
import { useSelector, useDispatch } from '../../../app/providers/store'
import { selectCity, filtersActions } from '../../filters/model/filtersSlice'
import { CityFilterUI } from './cityFilterUI'

export const CityFilter: FC = () => {
	const dispatch = useDispatch()
	const city = useSelector(selectCity)

	const handleChange = (newCity: typeof city) => {
		dispatch(filtersActions.setCity(newCity))
	}

	return <CityFilterUI value={city} onChange={handleChange} />
}
