import type { FC } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from '../../../app/providers/store'
import { selectUser, userActions } from '../../auth/model/userSlice'
import { ProfileIconUI } from './profileIconUI'

export const ProfileIcon: FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	const [isOpen, setIsOpen] = useState(false)

	if (!user) return null

	const handleNavigate = () => {
		navigate('/profile')
		setIsOpen(false)
	}

	const handleLogout = () => {
		dispatch(userActions.clearUser())
		setIsOpen(false)
	}

	return (
		<ProfileIconUI
			isOpen={isOpen}
			onToggle={() => setIsOpen(!isOpen)}
			onLogout={handleLogout}
			onNavigate={handleNavigate}
			avatar={user.avatarUrl}
		/>
	)
}

