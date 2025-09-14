import type { FC } from 'react'
import { ModalUI } from '../ui/Modal'
import styles from './success.module.css'
import { Button } from '../ui/Button'

type SuccessProp = {
	onClick: () => void
	offer: 'done' | 'notification' //done - Важе предложение создано, notification - Вы предложили обмен
}

export const Success: FC<SuccessProp> = ({ onClick, offer }) => {

	return (
		<ModalUI isOpen={true} onClose={onClick}>
			<div className={styles.container}>
				{offer === 'done' ? (
					<figure className={styles.figure}>
						<img
							className={styles.image}
							src='/icons/Done.svg'
							alt='Выполнено'
							aria-hidden='true'
						/>
						<figcaption>
							<h2 className={styles.title}>Важе предложение создано</h2>
							<p>Теперь вы можете предложить обмен</p>
						</figcaption>
					</figure>
				) : (
					<figure className={styles.figure}>
						<img
							className={styles.image}
							src='/icons/notification.svg'
							alt='Уведомление'
							aria-hidden='true'
						/>
						<figcaption>
							<h2 className={styles.title}>Вы предложили обмен</h2>
							<p>Теперь дождитесь подтверждения. Вам придёт уведомление</p>
						</figcaption>
					</figure>
				)}
				<Button className={styles.button} variant={'primary'} onClick={onClick}>
					Готово
				</Button>
			</div>
		</ModalUI>
	)
}
