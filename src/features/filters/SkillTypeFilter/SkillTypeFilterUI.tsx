import type { FC } from 'react'
import RadioButtonUI from '../../../shared/ui/RadioButtonUI'
import styles from './SkillTypeFilterUI.module.css'

type TOptions = Array<{ value: string; mode: string }>

type SkillTypeFilterUIProps = {
	options: TOptions
	selectedValue: string
	onValueChange: (mode: string) => void
}

export const SkillTypeFilterUI: FC<SkillTypeFilterUIProps> = ({
	options,
	selectedValue,
	onValueChange,
}) => {
	return (
		<div className={styles.block}>
			{options.map((option) => (
				<label className={styles.label} key={option.mode}>
					<RadioButtonUI
						checked={selectedValue === option.mode}
						onClick={() => onValueChange(option.mode)}
						ariaLabel={option.value}
					/>
					<span>{option.value}</span>
				</label>
			))}
		</div>
	)
}
