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
				<svg
					className={styles.searchIcon}
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M11.535 21.07C6.279 21.07 2 16.79 2 11.535 2 6.279 6.28 2 11.535 2c5.256 0 9.535 4.28 9.535 9.535 0 5.256-4.28 9.535-9.535 9.535zm0-17.675c-4.493 0-8.14 3.656-8.14 8.14s3.647 8.14 8.14 8.14 8.14-3.656 8.14-8.14-3.647-8.14-8.14-8.14zM21.302 22a.69.69 0 0 1-.493-.205l-1.86-1.86a.702.702 0 0 1 0-.986c.27-.27.716-.27.986 0l1.86 1.86c.27.27.27.717 0 .986a.69.69 0 0 1-.493.205z'
						fill='currentColor'
					/>
				</svg>
				{showPlaceholder && <p className={styles.placeholder}>Искать навык</p>}
			</div>
			{!showPlaceholder && props.value !== '' && (
				<svg
					className={styles.crossIcon}
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					onClick={handleClearClick}
				>
					<path
						d='m16.744 8.288-8.486 8.485c-.29.29-.77.29-1.06 0a.755.755 0 0 1 0-1.06l8.485-8.486c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06z'
						fill='currentColor'
					/>
					<path
						d='M16.744 16.773c-.29.29-.771.29-1.06 0L7.197 8.288a.755.755 0 0 1 0-1.061c.29-.29.77-.29 1.06 0l8.486 8.485c.29.29.29.77 0 1.06z'
						fill='currentColor'
					/>
				</svg>
			)}
		</div>
	)
}
