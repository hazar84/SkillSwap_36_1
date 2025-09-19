import type { FC } from 'react'
import CheckboxUI from '../../../shared/ui/CheckboxUI'
import styles from './city-filter.module.css'

type CityFilterUIProps = {
	value: string[]
	onChange: (value: string) => void
}

const options: string[] = [
	'Москва',
	'Санкт-Петербург',
	'Новосибирск',
	'Екатеринбург',
	'Казань',
]

const labels: Record<string, string> = {
	Москва: 'Москва',
	'Санкт-Петербург': 'Санкт-Петербург',
	Новосибирск: 'Новосибирск',
	Екатеринбург: 'Екатеринбург',
	Казань: 'Казань',
}

export const CityFilterUI: FC<CityFilterUIProps> = ({ value, onChange }) => {
	return (
		<div className={styles.container}>
			<p className={styles.title}>Город</p>
			{options.map((option) => (
				<label className={styles.label} key={option}>
					<CheckboxUI
						ariaLabel={labels[option]}
						checked={value.includes(option)}
						onClick={() => onChange(option)}
					/>
					<span>{labels[option]}</span>
				</label>
			))}
			<button className={styles.button}>Все города</button>
		</div>
	)
}
