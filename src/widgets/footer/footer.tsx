import type { FC } from 'react'
import styles from './footer.module.css'
import { Link } from 'react-router-dom'

export const FooterUI: FC = () => {
	const currentYear = new Date().getFullYear()

	return (
		<footer className={styles.footer}>
			<Link to='/' className={styles.logo}>
				<img src='../../../public/logo/Logo.svg' alt='Логотип' />
			</Link>
			<ul className={styles.list}>
				<li className={styles.item}>
					<Link to=''>
						О проекте
					</Link>
					<Link to=''>
						Все навыки
					</Link>
				</li>
				<li className={styles.item}>
					<Link to=''>
						Контакты
					</Link>
					<Link to=''>
						Блог
					</Link>
				</li>
				<li className={styles.item}>
					<Link to=''>
						Политика конфиденциальности
					</Link>
					<Link to=''>
						Пользовательское соглашение
					</Link>
				</li>
			</ul>

			<p className={styles.year}>SkillSwap — {currentYear}</p>
		</footer>
	)
}
