import { useEffect, useRef } from 'react'

// Хук для отслеживания кликов вне компонента

export function useClickOutside(callback: () => void) {
	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				callback()
			}
		}

		document.addEventListener('mousedown', handleClick)
		return () => {
			document.removeEventListener('mousedown', handleClick)
		}
	}, [callback])

	return ref
}
