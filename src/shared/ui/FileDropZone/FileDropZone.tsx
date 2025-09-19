// Пример использования компонента в родительском компоненте

// const ParentComponent = () => {

//     Состояние для хранения загруженных файлов
//     const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

//     Обработчик загрузки файла
//     const handleFileUpload = (file: string) => {
//         setUploadedFiles(prev => [...prev, file]);

//         Если необходимо дополнительно выведение загруженных файлов в console.log
//         console.log('Файл загружен:', base64String)
//     };

//     return (
//         Использование компонента FileDropZone
//         <FileDropZone onFileUpload={handleFileUpload} />

//             Если необходимо дополнительно отображение загруженных файлов
//             <div>
//                 <h2>Загруженные файлы:</h2>
//                 <ul>
//                     {uploadedFiles.map((file, index) => (
//                         <li key={index}>
//                             <img src={file} alt="Загруженный файл" width={100} />
//                         </li>
//                     ))}
//                 </ul>
//             </div>

// export default ParentComponent;

import React, { useState, useRef, useEffect } from 'react'
import FileDropZoneUI from './FileDropZoneUI'

interface FileDropZoneProps {
	onFileUpload: (file: string) => void
}

const FileDropZone: React.FC<FileDropZoneProps> = ({ onFileUpload }) => {
	const [isDragging, setIsDragging] = useState(false)
	const fileInputRef = useRef<HTMLInputElement | null>(null)

	const handleDragEnter = (e: React.DragEvent) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging(true)
	}

	const handleDragLeave = () => {
		setIsDragging(false)
	}

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
		setIsDragging(false)
		handleFileUpload(e.dataTransfer.files[0])
	}

	const handleFileUpload = (file: File) => {
		if (file && file.type.startsWith('image/')) {
			const reader = new FileReader()
			reader.onload = (e) => {
				if (e.target && e.target.result) {
					onFileUpload(e.target.result as string)
				}
			}
			reader.readAsDataURL(file)
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			handleFileUpload(file)
		}
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				fileInputRef.current?.click()
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	return (
		<FileDropZoneUI
			isDragging={isDragging}
			fileInputRef={fileInputRef}
			handleDragEnter={handleDragEnter}
			handleDragOver={handleDragOver}
			handleDragLeave={handleDragLeave}
			handleDrop={handleDrop}
			handleInputChange={handleInputChange}
		/>
	)
}

export default FileDropZone
