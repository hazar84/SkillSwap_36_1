import styles from './InputUI.module.css'
import { useState } from 'react'

type InputUIProps = {
  label: string
  placeholder: string
  type: string
  error: boolean
  textError: string
  helpText: string
  value: string
  callback: (value: string) => void
}

export const InputUI: React.FC<InputUIProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const showPlaceholder = props.value === '' && !isFocused
  const showHelpText = props.value === '' && !props.error && props.helpText

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const getInputType = () => {
    if (props.type === 'password') {
      return showPassword ? 'text' : 'password'
    }
    return props.type
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <div className={styles.container}>
      <p className={styles.label}>{props.label}</p>
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          <input
            className={`${styles.input} ${props.error ? styles.inputError : ''}`}
            type={getInputType()}
            value={props.value}
            onChange={(e) => props.callback(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {showPlaceholder && (
            <p className={styles.placeholder}>{props.placeholder}</p>
          )}
        </div>
        {props.type === 'password' && (
          <button
            type='button'
            className={styles.passwordToggle}
            onClick={togglePasswordVisibility}
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              {showPassword ? (
                <path
                  d='M9.645 15.05a.69.69 0 0 1-.493-.204 4.006 4.006 0 0 1-1.182-2.847A4.03 4.03 0 0 1 12 7.97c1.07 0 2.084.42 2.846 1.182a.697.697 0 0 1 0 .986l-4.707 4.708a.69.69 0 0 1-.493.204zm2.354-5.684a2.636 2.636 0 0 0-2.29 3.935l3.592-3.59A2.62 2.62 0 0 0 12 9.365zM6.045 18.055a.708.708 0 0 1-.456-.167c-.996-.847-1.889-1.889-2.652-3.098-.986-1.535-.986-4.038 0-5.582 2.27-3.554 5.573-5.6 9.062-5.6 2.047 0 4.065.706 5.833 2.037a.698.698 0 0 1-.837 1.116c-1.526-1.154-3.256-1.758-4.996-1.758-3.005 0-5.88 1.805-7.89 4.958-.697 1.089-.697 2.987 0 4.075.698 1.089 1.498 2.028 2.382 2.791a.704.704 0 0 1 .075.986.676.676 0 0 1-.521.242zM12 20.39a9.186 9.186 0 0 1-3.61-.744.698.698 0 0 1-.373-.912.698.698 0 0 1 .912-.372 7.809 7.809 0 0 0 3.06.633c3.006 0 5.88-1.805 7.89-4.959.698-1.088.698-2.986 0-4.075a13.255 13.255 0 0 0-.94-1.302.707.707 0 0 1 .103-.986.698.698 0 0 1 .986.102c.363.447.716.93 1.033 1.433.986 1.535.986 4.037 0 5.582-2.27 3.554-5.573 5.6-9.062 5.6zM12.641 15.971a.705.705 0 0 1-.688-.567.685.685 0 0 1 .558-.81 2.624 2.624 0 0 0 2.065-2.065.706.706 0 0 1 .819-.558.699.699 0 0 1 .558.819 3.998 3.998 0 0 1-3.182 3.181c-.046-.009-.084 0-.13 0zM2.695 22a.69.69 0 0 1-.493-.205.702.702 0 0 1 0-.986l6.95-6.95c.27-.27.716-.27.986 0s.27.717 0 .987l-6.95 6.95a.69.69 0 0 1-.493.204zM14.353 10.343a.69.69 0 0 1-.493-.205.702.702 0 0 1 0-.986l6.95-6.95c.269-.27.716-.27.985 0 .27.27.27.717 0 .987l-6.95 6.95a.69.69 0 0 1-.492.204z'
                  fill='currentColor'
                />
              ) : (
                <path
                  d='M12 16.33c-2.39 0-4.33-1.94-4.33-4.33S9.61 7.67 12 7.67s4.33 1.94 4.33 4.33-1.94 4.33-4.33 4.33zm0-7.16c-1.56 0-2.83 1.27-2.83 2.83s1.27 2.83 2.83 2.83 2.83-1.27 2.83-2.83S13.56 9.17 12 9.17zM12 21.02c-3.76 0-7.31-2.2-9.75-6.02-1.06-1.65-1.06-4.34 0-6 2.45-3.82 6-6.02 9.75-6.02s7.3 2.2 9.74 6.02c1.06 1.65 1.06 4.34 0 6-2.44 3.82-5.99 6.02-9.74 6.02zm0-16.54c-3.23 0-6.32 1.94-8.48 5.33-.75 1.17-.75 3.21 0 4.38 2.16 3.39 5.25 5.33 8.48 5.33 3.23 0 6.32-1.94 8.48-5.33.75-1.17.75-3.21 0-4.38-2.16-3.39-5.25-5.33-8.48-5.33z'
                  fill='currentColor'
                />
              )}
            </svg>
          </button>
        )}
      </div>
      <div className={styles.messageContainer}>
        {props.error && props.textError ? (
          <span className={styles.error}>{props.textError}</span>
        ) : showHelpText ? (
          <span className={styles.helpText}>{props.helpText}</span>
        ) : (
          <span className={styles.hiddenMessage}>&nbsp;</span>
        )}
      </div>
    </div>
  )
}

export default InputUI