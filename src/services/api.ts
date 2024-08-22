import axios, { AxiosInstance } from 'axios'
import getConfig from 'next/config'

const api = (): { marvelApi: AxiosInstance } => {
  const {
    publicRuntimeConfig: { NEXTURL }
  } = getConfig()

  const baseURL = NEXTURL || process.env.nextUrl

  if (!baseURL) {
    throw new Error('Base url não está definida')
  }

  const marvelApi = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 5000
  })

  return {
    marvelApi
  }
}

export default api
