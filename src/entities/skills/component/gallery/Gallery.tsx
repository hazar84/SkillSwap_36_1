import React, { useState } from 'react'
import styles from './Gallery.module.css'

interface GalleryProps {
	images: string[]
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
	const [currentIndex, setCurrentIndex] = useState<number>(0)

	const previewImages = images.filter((image) => image.includes('_92х92.jpg'))
	const largeImages = images.filter((image) => image.includes('_324х324.jpg'))
	const totalImages = largeImages.length
	const totalHidden = previewImages.length - 4

	const handlePrev = () => {
		setCurrentIndex((currentIndex - 1 + totalImages) % totalImages)
	}

	const handleNext = () => {
		setCurrentIndex((currentIndex + 1) % totalImages)
	}

	const getPreviewArray = (current: number) => {
		const start = (current + 1) % totalImages
		const indices: number[] = []
		for (let i = 0; i < 3; i++) {
			indices.push((start + i) % totalImages)
		}
		return indices.map((index) => ({
			url: previewImages[index],
			index,
			isActive: index === current,
		}))
	}

	const currentPreviews = getPreviewArray(currentIndex)

	return (
		<div className={styles.gallery}>
			<div className={styles.largeImageWrapper}>
				<img
					src={largeImages[currentIndex]}
					alt={`marketing-large-${currentIndex}`}
					className={styles.largeImage}
				/>

				<div className={styles.arrowButtons}>
					<button
						className={styles.prevButton}
						onClick={handlePrev}
						disabled={totalImages <= 1}
					>
						<img src='/icons/chevron-left.svg' alt='chevron-left' />
					</button>

					<button
						className={styles.nextButton}
						onClick={handleNext}
						disabled={totalImages <= 1}
					>
						<img src='/icons/chevron-right.svg' alt='chevron-right' />
					</button>
				</div>
			</div>

			<div className={styles.previewContainer}>
				{currentPreviews.map((item, previewIndex) => (
					<div
						key={item.index}
						className={`
                            ${styles.imageWrapper} 
                            ${item.isActive ? styles.active : ''}
                            ${previewIndex === 2 ? styles.highlighted : ''}
                        `}
					>
						<img
							src={item.url}
							alt={`marketing-image-${item.index}`}
							className={styles.previewImage}
						/>
						{previewIndex === 2 && totalHidden > 0 && (
							<div className={styles.hiddenCounterOverlay}>+{totalHidden}</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default Gallery
