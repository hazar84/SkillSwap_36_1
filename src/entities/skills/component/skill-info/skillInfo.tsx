import styles from './skillInfo.module.css'

export type skillInfoProps = {
	title: string
	text: string
	category: string
	subCategory: string
}

export const SkillInfo = ({
	title,
	text,
	category,
	subCategory,
}: skillInfoProps) => {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{title}</h3>
			<p className={styles.category}>
				{category} / {subCategory}
			</p>
			<p className={styles.text}>{text}</p>
		</div>
	)
}
export default SkillInfo
