import React, { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.scss'

type ButtonVariant = 'primary' | 'secondary' | 'inverse'

interface ButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
}

const Button = ({
  children,
  onClick,
  variant = 'primary',
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const className = getButtonClassName(variant)

  return (
    <button className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}

const getButtonClassName = (variant: ButtonVariant): string => {
  return `${styles.button} ${styles[variant]}`
}

export default Button
