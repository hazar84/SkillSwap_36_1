import { useSelector } from 'react-redux'
import styles from './skill.module.css'
import { selectSubcategoryToCategoryMap } from '../../../skills/model/skillsSlice'

const catToClassMap: Record<string, string> = {
	'cat-01': styles.business,
	'cat-02': styles.art,
	'cat-03': styles.languages,
	'cat-04': styles.education,
	'cat-05': styles.home,
	'cat-06': styles.health,
}

interface SkillUIProps {
	subcategoryId: string
	children: React.ReactNode
}

const SkillUI: React.FC<SkillUIProps> = ({ subcategoryId, children }) => {
	// Получаем данные из стора с помощью селекторов
	const subToCatMap = useSelector(selectSubcategoryToCategoryMap)

	const categoryId = subToCatMap[subcategoryId]

	const categoryClass =
		categoryId && catToClassMap[categoryId]
			? catToClassMap[categoryId]
			: styles.more

	return <div className={`${styles.skillTag} ${categoryClass}`}>{children}</div>
}

export default SkillUI
