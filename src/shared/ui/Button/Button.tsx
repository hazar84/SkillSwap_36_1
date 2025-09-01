// Пример использования кнопки
// Подключаем через import { Button } from '@/shared/ui/Button';
// <Button
//   variant='primary'                  // тип кнопки (primary | secondary | tertiary)
//   onClick={() => alert('Clicked')}   // обработчик клика
//   disabled={false}                   // true/false
//   className='my-class'               // дополнительные стили
// >
//   Зарегистрироваться                 //содержимое кнопки 
// </Button>

import React from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary'

interface ButtonProps {
	variant: ButtonVariant;
	children: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
    className?: string;
}

export const Button: React.FC<ButtonProps> = ({
	variant,
	children,
	onClick,
	disabled,
    className,
}) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${styles.btn} ${styles[variant]} ${className || ''}`}
		>
			{children}
		</button>
	)
}


