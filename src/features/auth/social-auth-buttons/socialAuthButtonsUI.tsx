import styles from './SocialAuthButtonsUI.module.css'

export const SocialAuthButtonsUI = () => {
	return (
		<div className={styles.socialAuthButtons}>
			<button className={styles.button}>
				<img src='/icons/Google.svg' alt='' aria-hidden='true'/>
				<p className={styles.textButton}>Продолжить с Google</p>
			</button>
			<button className={styles.button}>
				<img src='/icons/Apple.svg' alt='' aria-hidden='true' />
				<p className={styles.textButton}> Продолжить с Apple</p>
			</button>
			<div className={styles.separator}>
				<p className={styles.text}>или</p>
				<div className={styles.line}></div>
			</div>
		</div>
	)
}

export default SocialAuthButtonsUI
