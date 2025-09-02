import type { FC, SyntheticEvent } from 'react'
import styles from './footer.module.css'
import { Link } from 'react-router-dom'

export const FooterUI: FC = () => {
	const currentYear = new Date().getFullYear();

	const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    alert('Раздел в разработке');
  };

	return (
		<footer className={styles.footer}>
			<Link to='/' className={styles.logo}>
				<img src='/logo/Logo.svg' alt='Логотип'/>
			</Link>
			<ul className={styles.list}>
				<li className={styles.item}>
					<Link to='' onClick={handleClick}>
						О проекте
					</Link>
					<Link to='' onClick={handleClick}>
						Все навыки
					</Link>
				</li>
				<li className={styles.item}>
					<Link to='' onClick={handleClick}>
						Контакты
					</Link>
					<Link to='' onClick={handleClick}>
						Блог
					</Link>
				</li>
				<li className={styles.item}>
					<Link to='' onClick={handleClick}>
						Политика конфиденциальности
					</Link>
					<Link to='' onClick={handleClick}>
						Пользовательское соглашение
					</Link>
				</li>
			</ul>

			<p className={styles.year}>SkillSwap — {currentYear}</p>
		</footer>
	)
}
