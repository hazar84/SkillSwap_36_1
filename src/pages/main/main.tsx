import { FC } from 'react'
import { Header } from '../../widgets/header/header'
import { FilterPanel } from '../../widgets/filterPanel/filterPanel'
import { UsersGrid } from '../../widgets/usersGrid/usersGrid'
import { FooterUI } from '../../widgets/footer/footer'
import styles from './main.module.css'

export const MainPage: FC = () => {
	return (
		<div className={styles.mainPage}>
			<Header />
			<main className={styles.main}>
				<FilterPanel />
				<UsersGrid />
			</main>
			<FooterUI />
		</div>
	)
}
