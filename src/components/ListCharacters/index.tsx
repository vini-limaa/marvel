import { ReactNode } from 'react'
import styles from './styles.module.scss'

interface ListCharactersProps {
  children: ReactNode | ReactNode[]
}

const ListCharacters: React.FC<ListCharactersProps> = ({ children }) => {
  return <div className={styles.listCharacters}>{children}</div>
}

export default ListCharacters
