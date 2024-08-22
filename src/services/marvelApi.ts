import { AxiosRequestConfig } from 'axios'
import api from '@services/api'
import { CharacterInterface } from '../types/chars'

const marvelApi = () => {
  const get = async ({
    urlApi,
    config = {}
  }: {
    urlApi: string
    config?: AxiosRequestConfig
  }): Promise<CharacterInterface[]> => {
    const { marvelApi } = api()

    return marvelApi
      .get(`${urlApi}`, config)
      .then((response) => {
        return response.data as CharacterInterface[]
      })
      .catch((error) => {
        return Promise.reject(
          new Error(`Erro ao buscar dados ${urlApi}: ${error.message}`)
        )
      })
  }

  return {
    get
  }
}

export default marvelApi
