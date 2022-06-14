import { ResponseData } from 'contexts/Auth/AuthContext.d'
import { api } from './axios'

export type PartyProps = {
    _id: string;
    title: string;
    description: string;
    partyDate: Date;
    photos?: [string];
    privacy?: boolean;
    userId: string;
}

export const createPartyRequest = async (data: FormData): Promise<ResponseData> => {
  try {
    const response = await api.post('/api/party', data)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const getUserPartiesRequest = async (): Promise<ResponseData> => {
  try {
    const response = await api.get('/api/party/user')
    return response.data
  } catch (error) {
    return error.response.data
  }
}
export const deletePartiesRequest = async (id: string): Promise<ResponseData> => {
  try {
    const response = await api.delete(`api/party/${id}`)
    return response.data
  } catch (error) {
    return error.response.data
  }
}
