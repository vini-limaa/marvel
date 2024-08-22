import { useCharacter } from '@hooks'
import styles from './styles.module.scss'

interface CharacterCardProps {
  onClick?: () => void
}

const CharacterCard = ({ onClick = () => {} }: CharacterCardProps) => {
  const { character } = useCharacter()

  const { name, thumbnail } = character

  return (
    <article className={styles.characterCard} onClick={onClick}>
      <div className={styles.image}>
        <img
          src={`${thumbnail.path}.${thumbnail.extension}`}
          alt={`Imagem do personagem ${name}`}
          className={styles.characterImage}
        />
      </div>
      <div className={styles.details}>
        <div className={styles.content}>
          <p className={styles.name}>{name}</p>
        </div>
      </div>
    </article>
  )
}

export default CharacterCard
