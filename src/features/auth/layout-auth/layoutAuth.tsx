import type { FC, ReactNode } from 'react'
import styles from './layoutAuth.module.css'

export type Hint = {
	src: string //ссылка на картинку
	title: string //заголовок под картинкой
	description: string // описание 
}
type LayoutAuthProps = {
	hint: Hint // данные правого блока с картинкой
	currentStep?: number // текущий шаг
	totalSteps?: number // общее количество шагов
	title?: string // заголовок если нет шагов
	children: ReactNode // левый блок
}

// Компонент принимает:
//  данные для правого блока, 
// левый блок, 
// шаги или заголовок

export const LayoutAuth: FC<LayoutAuthProps> = ({
	hint,
	currentStep,
	totalSteps,
	title,
	children,
}) => {

	const hasSteps = currentStep !== undefined && totalSteps !== undefined;
  const showTitle = hasSteps ? `Шаг ${currentStep} из ${totalSteps}` : title;
	
	return (
		<section className={styles.container}>
			<header className={`${hasSteps ? styles.flex : ''}`}>
				<h2 className={styles.title}>{showTitle}</h2>
        {hasSteps &&
				<div className={styles.progressBar}>
          {Array.from({length: totalSteps}, (_, index) => (
            <span key={index} className={`${styles.step} ${index + 1 <= currentStep ? styles.activeStep : ''}`}/>
          ))}
				</div>}
			</header>
			<div className={styles.content}>
				{children}
				<figure className={styles.figure}>
					<img src={hint.src} alt='' />
					<figcaption className={styles.flex}>
						<h2 className={styles.title}>{hint.title}</h2>
						<p>{hint.description}</p>
					</figcaption>
				</figure>
			</div>
		</section>
	)
}
