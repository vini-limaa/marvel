import React, { ReactNode } from 'react'
import styles from './styles.module.scss'

interface NavbarProps {
  logo: ReactNode
}

const Navbar = ({ logo }: NavbarProps) => {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className={styles.navbarLogo}>{logo}</div>
      </nav>
    </header>
  )
}

export default Navbar
