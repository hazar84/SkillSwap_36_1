{
	/* Как использовать:
    const usersData: TUser[];
    <CardList
                    title='Популярные' // заголовок
                    data={usersData} // данные карточек
                    small={false} // при true отображает меньше карточек, false - отображает до 20 карточек
                    navigateButton={'/'} //ссылка на страницу со полным списком карточек
                />
    
    */
}

import styles from './cardList.module.css'
import { Button } from '../../../../shared/ui/Button'
import { UserCard } from '../../../../entities/cards/ui/UserCard/UserCard'
import type { TUser } from '../../../../shared/lib/types'
import { useNavigate } from 'react-router-dom'
import { useSelector } from '../../../../app/providers/store'
import {
	selectIsAuthenticated,
	selectUser,
} from '../../../../features/auth/model/userSlice'

type cardListProps = {
	title: string
	data: TUser[]
	small: boolean
	navigateButton: string
	onToggleFavorite?: (id: string) => void
}

export const CardList: React.FC<cardListProps> = ({
	title,
	data,
	small,
	navigateButton,
	onToggleFavorite,
}) => {
	const navigate = useNavigate()
	const displayedData = small ? data.slice(0, 3) : data.slice(0, 20)

	const isAuthenticated = useSelector(selectIsAuthenticated)
	const user = useSelector(selectUser)

	const userId = isAuthenticated ? user?.id : null

	const handleNavigate = () => {
		navigate(navigateButton)
	}

	return (
		<div className={styles.conteiner}>
			<div className={styles.header}>
				<h3 className={styles.title}>{title}</h3>
				{small && (
					<Button variant='tertiary' onClick={handleNavigate}>
						<p className={styles.buttonText}>Смотреть все</p>
						<img src='/icons/chevron-right.svg' alt='' aria-hidden='true' />
					</Button>
				)}
			</div>
			<ul
				className={`${styles.list} ${small ? styles.list_small : styles.list_large}`}
			>
				{displayedData.map((user, index) => (
					<li className={styles.listItem} key={user.id || index}>
						<UserCard
							user={user}
							currentUserId={userId || ''}
							onToggleFavorite={onToggleFavorite}
						/>
					</li>
				))}
			</ul>
		</div>
	)
}
