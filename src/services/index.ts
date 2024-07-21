import axios, { AxiosError } from 'axios'

const API_ENV = {
  server: 'https://viacep.com.br/ws'
}

export const api = axios.create({
  baseURL: API_ENV.server
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const canThrowNewError = error.request.status === 0 || error.request.status === 500

    if (canThrowNewError) {
      throw new Error(error.message)
    }
    return error
  }
)
