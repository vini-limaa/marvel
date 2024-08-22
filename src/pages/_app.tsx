import '@styles/style.scss'
import CharacterListContextProvider from '@context/characterList'

function App({ Component, pageProps }) {
  return (
    <>
      <CharacterListContextProvider>
        <Component {...pageProps} />
      </CharacterListContextProvider>
    </>
  )
}

export default App
