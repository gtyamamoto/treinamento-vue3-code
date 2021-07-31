import axios from 'axios'
import AuthService from './auth'
const API_ENVS = {
  local: 'http://localhost:3000',
  development: '',
  production: ''
}

const httpClient = axios.create({ baseURL: API_ENVS.local })

// interceptor para propragar erros trataveis pela aplicacao
httpClient.interceptors.request.use(response => response, error => {
  const canThrowError = error.request.status === 0 || error.request.status === 500

  if (canThrowError) {
    throw new Error(error.message)
  }

  return error
})

export default {
  auth: AuthService(httpClient)
}
