import type { FC } from 'react'
import styles from './search.module.css'
import { useState } from 'react'

type SearchUIProps = {
	value: string
	callback: (value: string) => void
}

export const SearchUI: FC<SearchUIProps> = (props) => {
	const [isFocused, setIsFocused] = useState(false)
	const showPlaceholder = props.value === '' && !isFocused
	const handleClearClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		props.callback('')
	}
	const handleFocus = () => {
		setIsFocused(true)
	}

	const handleBlur = () => {
		setIsFocused(false)
	}
	return (
		<div className={styles.search}>
			<input
				type='text'
				value={props.value}
				onChange={(e) => props.callback(e.target.value)}
				className={styles.input}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			<div className={styles.searchIconWrapper}>
				<img
					src='icons/search.svg'
					alt='Search'
					className={styles.searchIcon}
				/>
				{showPlaceholder && <p className={styles.placeholder}>Искать навык</p>}
			</div>
			{!showPlaceholder && props.value !== '' && (
				<img
					src='icons/cross.svg'
					alt='Clear'
					className={styles.crossIcon}
					onClick={handleClearClick}
				/>
			)}
		</div>
	)
}
