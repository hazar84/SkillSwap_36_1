import type { FC } from 'react'
import RadioButtonUI from '../../../shared/ui/RadioButtonUI'

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
		<div>
			<p>Пол автора</p>
			{options.map((option) => (
				<label key={option ?? 'null'}>
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