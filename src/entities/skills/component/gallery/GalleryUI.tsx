import React from 'react'
import styles from './Gallery.module.css'

interface GalleryUIProps {
	image: string
	visibleImages: (string | null)[]
	onPrev: () => void
	onNext: () => void
	onPreviewClick: (index: number) => void
	totalImages: number
}

const GalleryUI: React.FC<GalleryUIProps> = ({
	image,
	visibleImages,
	onPrev,
	onNext,
	onPreviewClick,
	totalImages,
}) => {
	const visibleImagesCount = visibleImages.length
	const hiddenCount = totalImages - visibleImagesCount - 1 // вычитаем активное
	const showControls = totalImages > 1
	const showPreview = totalImages > 1

	return (
		<div className={styles.galleryContainer}>
			<div className={styles.contentWrapper}>
				<div className={styles.screen}>
					{totalImages === 0 ? (
						<div className={styles.noImageMessage}>
							<p>Нет изображений</p>
						</div>
					) : (
						<>
							<img
								src={image}
								alt='Active Image'
								className={styles.activeImage}
							/>
							{showControls && (
								<div className={styles.controls}>
									<button onClick={onNext} className={styles.nextButton}>
										<img src='/icons/chevron-left.svg' alt='chevron-left' />
									</button>
									<button onClick={onPrev} className={styles.prevButton}>
										<img src='/icons/chevron-right.svg' alt='chevron-right' />
									</button>
								</div>
							)}
						</>
					)}
				</div>
			</div>

			{showPreview && (
				<div className={styles.contentWrapper}>
					<div className={styles.preview}>
						{visibleImages.map((img, index) => {
							return (
								<div
									key={index}
									className={styles.previewImage}
									onClick={() => onPreviewClick(index)}
									style={{ position: 'relative' }}
								>
									{img && (
										<div className={styles.previewImageContent}>
											<img
												src={img}
												alt={`Preview Image ${index}`}
												className={styles.previewImageInner}
											/>
										</div>
									)}

									{index === visibleImagesCount - 1 && hiddenCount > 0 && (
										<div className={styles.hiddenCount}>+{hiddenCount}</div>
									)}
								</div>
							)
						})}
					</div>
				</div>
			)}
		</div>
	)
}

export default GalleryUI
