import React from 'react'
import styles from './styles.module.scss'
import { useCharacter } from '@hooks'

interface CharacterInfoProps {
  closeIcon?: () => void
}

const CharacterInfo: React.FC<CharacterInfoProps> = ({
  closeIcon = () => {}
}) => {
  const { character } = useCharacter()

  const { urls, comics, series, events, stories, name, thumbnail } = character

  return (
    <div className={styles.characterInfo}>
      <button className={styles.close} onClick={closeIcon}>
        X
      </button>
      <div className={styles.container}>
        <div className={styles.shape}>
          <div className={styles.title}>{name}</div>

          <div className={styles.content}>
            <div className={styles.grid}>
              <div className={styles.char}>
                <img
                  src={`${thumbnail.path}.${thumbnail.extension}`}
                  alt={`Imagem do personagem ${name}`}
                />
                <div className={styles.info}>
                  {urls.map((item, idx) => (
                    <div key={idx}>
                      <p className={styles.type}>{item.type}</p>
                      <a href={item.url} className={styles.link}>
                        {item.url}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.comics}>
                <p className={styles.type}>Comics</p>
                <ul>
                  {comics.items.map((item, idx) => (
                    <li key={idx}>
                      <a href={'#'} className={styles.link}>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.grid}>
              <div className={styles.cards}>
                <div className={styles.comics}>
                  <p className={styles.type}>Series</p>
                  <ul>
                    {series.items.map((item, idx) => (
                      <li key={idx}>
                        <a href={'#'} className={styles.link}>
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.cards}>
                <div className={styles.comics}>
                  <p className={styles.type}>Stories</p>
                  <ul>
                    {stories.items.map((item, idx) => (
                      <li key={idx}>
                        <a href={'#'} className={styles.link}>
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className={styles.cards}>
                <div className={styles.comics}>
                  <p className={styles.type}>Events</p>
                  <ul>
                    {events.items.map((item, idx) => (
                      <li key={idx}>
                        <a href={'#'} className={styles.link}>
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterInfo
