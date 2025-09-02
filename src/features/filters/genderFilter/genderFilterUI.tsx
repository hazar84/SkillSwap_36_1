import type { FC } from 'react'
import RadioButtonUI from '../../../shared/ui/RadioButtonUI'
import styles from './gender-filter.module.css'

type TGender = 'Мужской' | 'Женский' | null

type GenderFilterUIProps = {
	value: TGender
	onChange: (value: TGender) => void
}

const options: TGender[] = [null, 'Мужской', 'Женский']

const labels: Record<Exclude<TGender, null>, string> & { null: string } = {
	null: 'Не имеет значения',
	Мужской: 'Мужской',
	Женский: 'Женский',
}

export const GenderFilterUI: FC<GenderFilterUIProps> = ({ value, onChange }) => {
	return (
		<div className={styles.container}>
			<p className={styles.genderTitle}>Пол автора</p>
			{options.map((option) => (
				<label  className={styles.label} key={option ?? 'null'}>
					<RadioButtonUI
						ariaLabel={labels[option ?? 'null']}
						checked={value === option}
						onClick={() => onChange(option)}
					/>
					<span>{labels[option ?? 'null']}</span>
				</label>
			))}
		</div>
	)
}