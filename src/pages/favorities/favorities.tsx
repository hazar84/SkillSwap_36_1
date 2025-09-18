import styles from './favorities.module.css'
import { Header } from '../../widgets/header/header'
import { FooterUI } from '../../widgets/footer/footer'
import ProfileSidebar from '../../features/profile-sidebar/ProfileSidebar'
import { CardList } from '../../entities/cards/components/cardList/cardList'
import { useSelector } from 'react-redux'
import type { RootState } from '../../app/providers/store'
import type { TUser } from '../../shared/lib/types'

export const Favorities: React.FC = () => {
    const userState = useSelector((state: RootState) => state.user)
    const cardState = useSelector((state: RootState) => state.cards)
    const favorites = userState.user?.favorites || []
    const favoritesCards = cardState.items.filter(
        (card): card is TUser => card !== undefined && favorites.includes(card.id)
    )

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <ProfileSidebar activeItem='favorites' />
                </div>
                <div className={styles.content}>
                    {favoritesCards.length === 0 ? (
                        <p>Нет избранных карточек</p>
                    ) : (
                        <CardList
                            title='Избранное'
                            data={favoritesCards}
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
export default Favorities
