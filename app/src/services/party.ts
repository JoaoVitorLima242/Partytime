import { api } from './axios'

export const createPartyRequest = async (data) => {
  try {
    const response = await api.post('/api/party', data)
    return response.data
  } catch (error) {
    return error.response.data
  }
}
