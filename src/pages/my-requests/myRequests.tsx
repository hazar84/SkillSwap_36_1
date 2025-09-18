import styles from './myRequests.module.css'
import { Header } from '../../widgets/header/header'
import { FooterUI } from '../../widgets/footer/footer'
import ProfileSidebar from '../../features/profile-sidebar/ProfileSidebar'
import { CardList } from '../../entities/cards/components/cardList/cardList'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/providers/store'
import type { TUser } from '../../shared/lib/types'
import { selectExchangesReceivedByUser } from '../../features/skill-exchange/model/skill-exchange-slice'

export const MyRequests: React.FC = () => {
	const userState = useSelector((state: RootState) => state.user)
	const cardState = useSelector((state: RootState) => state.cards)
	const userId = userState.user?.id
	const receivedExchanges = useSelector((state: RootState) =>
		selectExchangesReceivedByUser(state, userId || '')
	)
	const incomingUserIds = Array.from(
		new Set(receivedExchanges.map((ex) => ex.fromUserId))
	).filter((id) => id !== userId)
	const incomingExchangeCards = cardState.items.filter(
		(card): card is TUser =>
			card !== undefined && incomingUserIds.includes(card.id)
	)

	return (
		<>
			<Header />
			<div className={styles.container}>
				<div className={styles.sidebar}>
					<ProfileSidebar activeItem='requests' />
				</div>
				<div className={styles.content}>
					{incomingExchangeCards.length === 0 ? (
						<p>Нет предложений в обменах</p>
					) : (
						<CardList
							title='Мои обмены'
							data={incomingExchangeCards}
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
