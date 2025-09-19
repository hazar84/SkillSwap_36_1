import styles from './myExchange.module.css'
import { Header } from '../../widgets/header/header'
import { FooterUI } from '../../widgets/footer/footer'
import ProfileSidebar from '../../features/profile-sidebar/ProfileSidebar'
import { CardList } from '../../entities/cards/components/cardList/cardList'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/providers/store'
import type { TUser } from '../../shared/lib/types'
import {
	selectExchangesSentByUser,
	selectExchangesReceivedByUser,
} from '../../features/skill-exchange/model/skill-exchange-slice'

export const MyExchange: React.FC = () => {
	const userState = useSelector((state: RootState) => state.user)
	const cardState = useSelector((state: RootState) => state.cards)
	const userId = userState.user?.id

	const sentExchanges = useSelector((state: RootState) =>
		selectExchangesSentByUser(state, userId || '')
	)
	const receivedExchanges = useSelector((state: RootState) =>
		selectExchangesReceivedByUser(state, userId || '')
	)
	const allExchanges = [...sentExchanges, ...receivedExchanges]
	const exchangeUserIds = allExchanges.map((exchange) =>
		exchange.fromUserId === userId ? exchange.toUserId : exchange.fromUserId
	)
	const uniqueUserIds = Array.from(new Set(exchangeUserIds)).filter(
		(id) => id !== userId
	)
	const exchangeCards = cardState.items.filter(
		(card): card is TUser =>
			card !== undefined && uniqueUserIds.includes(card.id)
	)

	return (
		<>
			<Header />
			<div className={styles.container}>
				<div className={styles.sidebar}>
					<ProfileSidebar activeItem='exchanges' />
				</div>
				<div className={styles.content}>
					{exchangeCards.length === 0 ? (
						<p>Нет карточек в обменах</p>
					) : (
						<CardList
							title='Мои обмены'
							data={exchangeCards}
							small={false}
							navigateButton={'/'}
						/>
					)}
				</div>
			</div>
			<FooterUI />
		</>
	)
}
export default MyExchange
