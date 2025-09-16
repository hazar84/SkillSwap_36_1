import type { FC } from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from '../../../app/providers/store'
import { selectUser, userActions } from '../../auth/model/userSlice'
import { ProfileIconUI } from './profileIconUI'

export const ProfileIcon: FC = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const user = useSelector(selectUser)
	const [isOpen, setIsOpen] = useState(false)

	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setIsOpen(false)
			}
		}
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsOpen(false)
		}

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
			document.addEventListener('keydown', handleEsc)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
			document.removeEventListener('keydown', handleEsc)
		}
	}, [isOpen])

	if (!user) return null

	const handleNavigate = () => {
		navigate('/profile/personal-data')
		setIsOpen(false)
	}

	const handleLogout = () => {
		dispatch(userActions.clearUser())
		setIsOpen(false)
	}

	return (
		<ProfileIconUI
			ref={ref}
			isOpen={isOpen}
			onToggle={() => setIsOpen(!isOpen)}
			onLogout={handleLogout}
			onNavigate={handleNavigate}
			avatar={user.avatarUrl}
		/>
	)
}

