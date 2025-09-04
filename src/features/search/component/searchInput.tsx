import React, { useState, useMemo } from 'react'
import { SearchUI } from '../ui/searchUI'

function debounce<T extends unknown[]>(
	func: (...args: T) => void,
	wait: number
): (...args: T) => void {
	let timeoutId: ReturnType<typeof setTimeout> | null = null

	return (...args: T): void => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		timeoutId = setTimeout(() => {
			func(...args)
		}, wait)
	}
}

type SearchInputProps = {
	onChange?: (value: string) => void
	initialValue?: string
	debounceDelay?: number
}

export const SearchInput: React.FC<SearchInputProps> = ({
	onChange,
	initialValue = '',
	debounceDelay = 300,
}) => {
	const getInitialQueryFromURL = () => {
		const params = new URLSearchParams(window.location.search)
		return params.get('search') || initialValue
	}

	const [searchQuery, setSearchQuery] = useState<string>(
		getInitialQueryFromURL()
	)

	const debouncedUpdateURL = useMemo(
		() =>
			debounce((query: string) => {
				const params = new URLSearchParams(window.location.search)

				if (query) {
					params.set('search', query)
				} else {
					params.delete('search')
				}

				const newUrl = `${window.location.pathname}?${params.toString()}`
				window.history.replaceState({}, '', newUrl)
			}, debounceDelay),
		[debounceDelay]
	)

	const debouncedOnChange = useMemo(
		() =>
			debounce((value: string) => {
				if (onChange) {
					onChange(value)
				}
			}, debounceDelay),
		[onChange, debounceDelay]
	)

	const handleInputChange = (value: string) => {
		setSearchQuery(value)
		debouncedOnChange(value)
		debouncedUpdateURL(value)
	}

	return <SearchUI value={searchQuery} callback={handleInputChange} />
}
