import styles from './styles.module.scss'
import {
  Hero,
  ListCharacters,
  Navbar,
  CharacterGroup,
  Search,
  Pagination,
  Loading,
  NoCharactersFound
} from '@components'
import Logo from '@images/logo.svg'
import HeroBg from '@images/heroBg.jpg'
import { GetStaticProps } from 'next'
import { marvelApi } from '@services'
import { useEffect } from 'react'
import { useCharactersList } from '@hooks'
import { CharacterProvider } from '@context'

const Chars = (props) => {
  const { chars } = props
  const { setCharacters, characterList, loading } = useCharactersList()

  useEffect(() => {
    setCharacters(chars)
  }, [chars])

  useEffect(() => {
    characterList
  }, [characterList])

  return (
    <div className={`${styles.home} `}>
      <Navbar logo={<Logo />} />
      <Hero
        title={'Marvel Characters'}
        subtitle={
          'Get hooked on a hearty helping of heroes and villains from the humble House of Ideas!'
        }
        backgroundImage={HeroBg.src}
      />

      <div className={styles.content}>
        <div className={styles.container}>
          <Search>Characters</Search>
          {loading ? (
            <Loading />
          ) : characterList?.data.length === 0 ? (
            <NoCharactersFound />
          ) : (
            <ListCharacters>
              {characterList?.data?.map((item, idx) => (
                <CharacterProvider value={item} key={idx}>
                  <CharacterGroup />
                </CharacterProvider>
              ))}
            </ListCharacters>
          )}
          {!loading && characterList?.totalFiltered > characterList.count && (
            <Pagination />
          )}
        </div>
      </div>
    </div>
  )
}

export default Chars

export const getStaticProps: GetStaticProps = async () => {
  const { get } = marvelApi()

  const props = await get({ urlApi: `/chars` })
    .then((chars) => ({
      chars: chars || []
    }))
    .catch((error) => {
      console.error('Erro ao buscar os chars:', error)
      return {
        chars: []
      }
    })

  return {
    props,
    revalidate: 60 * 10
  }
}
