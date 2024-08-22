import React from 'react'
import styles from './styles.module.scss'

interface HeroProps {
  title: string
  subtitle: string
  backgroundImage: string
}

const Hero = ({ title, subtitle, backgroundImage }: HeroProps) => {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
    </section>
  )
}

export default Hero
