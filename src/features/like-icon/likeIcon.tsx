import type { FC } from 'react'
import LikeButtonUI from '../../shared/ui/LikeButtonUI'
import { useDispatch, useSelector } from '../../app/providers/store'
import { selectUser, userActions } from '../auth/model/userSlice'

type LikeIconProps = {
	className?: string
	userId: string //id карточки
}

export const LikeIcon: FC<LikeIconProps> = ({ className, userId }) => {
	const dispatch = useDispatch()
	const currentUser = useSelector(selectUser)

	// Проверяем, есть ли эта карточка в избранном у пользователя
	const isFavorite = currentUser?.favorites?.includes(userId) || false

	const handleClick = () => {
		if (currentUser) dispatch(userActions.toggleFavorite(userId))
	}

	return (
		<LikeButtonUI
			ariaLabel={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
			active={isFavorite}
			className={className}
			onClick={handleClick}
		/>
	)
}
