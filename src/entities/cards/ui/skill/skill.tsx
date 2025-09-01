import React from 'react'
import styles from './skill.module.css'

export type SkillCategory =
	| 'Бизнес и карьера'
	| 'Творчество и искусство'
	| 'Иностранные языки'
	| 'Образование и развитие'
	| 'Дом и уют'
	| 'Здоровье и лайфстайл'
	| 'Больше'

interface SkillUIProps {
	skill: string
	category: SkillCategory
}

const categoryClassMap: Record<SkillCategory, string> = {
	'Бизнес и карьера': 'business',
	'Творчество и искусство': 'art',
	'Иностранные языки': 'languages',
	'Образование и развитие': 'education',
	'Дом и уют': 'home',
	'Здоровье и лайфстайл': 'health',
	'Больше': 'more',
}

const SkillUI: React.FC<SkillUIProps> = ({ skill, category }) => {
	const baseClass = styles.skillTag
	const categoryClass = styles[categoryClassMap[category]]

	return <div className={`${baseClass} ${categoryClass}`}>{skill}</div>
}

export default SkillUI
