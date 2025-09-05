import React, { useState } from 'react'
import GalleryUI from './GalleryUI'

interface GalleryProps {
	images: string[]
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
	const [activeIndex, setActiveIndex] = useState(0)
	const totalImages = images.length
	const visibleSlots = totalImages > 2 ? 3 : totalImages

	const handleChangeImage = (index: number) => {
		setActiveIndex(index)
	}

	const handlePrev = () => {
		const newIndex = (activeIndex - 1 + totalImages) % totalImages
		setActiveIndex(newIndex)
	}

	const handleNext = () => {
		const newIndex = (activeIndex + 1) % totalImages
		setActiveIndex(newIndex)
	}

	const getVisibleImages = (): (string | null)[] => {
		const visible: (string | null)[] = []
		let count = 0

		for (let i = 1; i <= totalImages; i++) {
			const index = (activeIndex + i) % totalImages
			if (index !== activeIndex) {
				visible.push(images[index])
				count++
			}
			if (count === visibleSlots) break
		}

		return visible
	}

	const handlePreviewClick = (index: number) => {
		const realIndex = (activeIndex + index + 1) % totalImages
		handleChangeImage(realIndex)
	}

	return (
		<GalleryUI
			image={totalImages > 0 ? images[activeIndex] : ''}
			visibleImages={getVisibleImages()}
			onPrev={handlePrev}
			onNext={handleNext}
			onPreviewClick={handlePreviewClick}
			totalImages={totalImages}
		/>
	)
}

export default Gallery
