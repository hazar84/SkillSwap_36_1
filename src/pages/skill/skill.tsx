import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from '../../app/providers/store'
import { Header } from '../../widgets/header/header'
import { FooterUI } from '../../widgets/footer/footer'
import { SkillWidget } from '../../widgets/skill/SkillWidget'
import { RelatedSkills } from '../../widgets/related-skills/RelatedSkills'
import { UserCard } from '../../entities/cards/ui/UserCard/UserCard'
import { selectCards } from '../../entities/cards/model/cardsSlice'
import { selectIsAuthenticated, selectUser } from '../../features/auth/model/userSlice'
import { selectSubcategoryToCategoryMap } from '../../entities/skills/model/skillsSlice'
import s from './skill.module.css'

import { ModalUI } from '../../shared/ui/Modal'
import { Success } from '../../shared/success/success'
import { toastActions } from '../../features/toast/model/toast-slice'
import { addExchange, selectExchangesSentByUser } from '../../features/skill-exchange/model/skill-exchange-slice'


export const SkillPage: React.FC = () => {


	// const { id = '' } = useParams()
	const { id: viewedUserId } = useParams<{ id: string }>(); // ID пользователя, чей навык мы смотрим
	const navigate = useNavigate();
    const dispatch = useDispatch();

	const users = useSelector(selectCards)
	const currentUser = useSelector(selectUser)
	const subcategoryToCategoryMap = useSelector(selectSubcategoryToCategoryMap)
	const isAuthenticated = useSelector(selectIsAuthenticated);

	const viewedUser = React.useMemo(() => users.find((u) => u.id === viewedUserId), [users, viewedUserId])
	const [isModalOpen, setIsModalOpen] = useState(false);
    const sentExchanges = useSelector((state) => 
        selectExchangesSentByUser(state, currentUser?.id ?? '')
    );

	const isAlreadyProposed = useMemo(() => {
        if (!viewedUser || !sentExchanges) return false;
        return sentExchanges.some(
            (exchange) => exchange.toUserId === viewedUser.id && exchange.skillId === viewedUser.skillCanTeach.id
        );
    }, [sentExchanges, viewedUser, currentUser]);

    const handleProposeExchange = () => {
        // Пользователь не авторизован
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        // Пользователь авторизован
        if (!currentUser || !viewedUser) return;
        
        // Запись об обмене
        dispatch(
            addExchange({
                fromUserId: currentUser.id,
                toUserId: viewedUser.id,
                skillId: viewedUser.skillCanTeach.id,
            })
        );

        // Уведомление для другого пользователя
        dispatch(
            toastActions.addToast({
                userId: viewedUser.id,
                title: 'Новое предложение!',
                description: `Пользователь ${currentUser.name} предложил(а) вам обмен навыками.`,
                actionUrl: `/profile/${currentUser.id}`,
            })
        );

        setIsModalOpen(true);
    };

	if (!viewedUser) {
		return (
			<>
				<Header />
				<main className={s.notFound}>Пользователь не найден</main>
				<FooterUI />
			</>
		)
	}

	const categoryId = subcategoryToCategoryMap[viewedUser.skillCanTeach.subcategoryId]

	return (
		<>
			<Header />
			<div className={s.page}>
				<div className={s.shell}>
					<main className={s.container}>
						<div className={s.topRow}>
							<div className={s.cardCol}>
								<UserCard
									user={viewedUser}
									currentUserId={currentUser?.id ?? ''}
									variant='about'
								/>
							</div>
							<div className={s.skillCol}>
								<SkillWidget skill={viewedUser.skillCanTeach} onPropose={handleProposeExchange} isProposed={isAlreadyProposed}/>
							</div>
						</div>
						<div className={s.relatedRow}>
							<RelatedSkills categoryId={categoryId} />
						</div>
					</main>
				</div>
			</div>
			 <ModalUI isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Success
                    offer="notification"
                    onClick={() => setIsModalOpen(false)}
                />
            </ModalUI>
			<FooterUI />
		</>
	)
}

export default SkillPage
