import axios from 'axios'

export function getApiClient () {
  const api = axios.create({
    baseURL: 'http://localhost:3001'
  })

  api.defaults.headers.post['Content-Type'] = 'application/json'

  return api
}

export const api = getApiClient()
