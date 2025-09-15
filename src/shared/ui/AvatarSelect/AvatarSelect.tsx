import { useState, useRef } from 'react'
import type { ChangeEvent } from 'react'
import styles from './AvatarSelect.module.css'

export type TAvatarSelectProps = {
	value?: string
	onChange?: (value: string) => void
	size: 'small' | 'large'
}

export const AvatarSelect = (props: TAvatarSelectProps) => {
	const { value, onChange, size } = props
	const [preview, setPreview] = useState(value || '')
	const fileInputRef = useRef<HTMLInputElement>(null)

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				const base64String = reader.result as string
				setPreview(base64String)
				if (onChange) {
					onChange(base64String)
				}
			}
			reader.readAsDataURL(file)
		}
	}

	const handleAvatarClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click()
		}
	}

	return (
		<div className={styles.avatarSelect}>
			<div
				className={`${styles.avatarPreview} ${preview ? styles.hasImage : ''}`}
				onClick={handleAvatarClick}
				style={preview ? { backgroundImage: `url(${preview})` } : {}}
			>
				{!preview && (
					<div
						className={`${size === 'large' ? styles.avatarIconLarge : styles.avatarIconSmall}`}
					>
						<img
							className={styles.iconAvarImg}
							src='/icons/user-avatar.svg'
							alt='user'
						/>
						{size === 'small' && (
							<img
								className={styles.iconAvarAddImgSmall}
								src='/icons/add_green_bg.svg'
								alt='add'
							/>
						)}
					</div>
				)}
				{size === 'large' && (
					<div className={styles.iconAvarAddImgLargeWrapper}>
						<img
							className={styles.iconAvarAddImgLarge}
							src='/icons/gallery-edit.svg'
							alt='edit'
						/>
					</div>
				)}
			</div>

			<input
				ref={fileInputRef}
				type='file'
				accept='image/*'
				className={styles.avatarInput}
				onChange={handleFileChange}
				id='avatarInput'
			/>
		</div>
	)
}

export default AvatarSelect
