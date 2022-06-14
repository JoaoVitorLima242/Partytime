import { ResponseData } from 'contexts/Auth/AuthContext.d'
import { api, getApiClient } from './axios'

export type PartyProps = {
    _id: string;
    title: string;
    description: string;
    partyDate: Date;
    photos?: [string];
    privacy?: boolean;
    userId: string;
}

export type PartiesResponse = {
  parties: PartyProps[];
  error: unknown
}
export type PartyResponse = {
  party: PartyProps;
  error: unknown
}

export const getUserPartiesRequest = async (ctx: unknown): Promise<PartiesResponse> => {
  const api = getApiClient(ctx)
  try {
    const response = await api.get('/api/party/user')
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const getParties = async (): Promise<PartiesResponse> => {
  try {
    const response = await api.get('/api/party/')
    return response.data
  } catch (error) {
    return error.response.data
  }
}

/* ajustar bug na pagina /edit/[id] na function getStaticProps */
export const getPartyByIdRequest = async (id: unknown): Promise<PartyResponse> => {
  try {
    const response = await api.get(`/api/party/${id}`)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const createPartyRequest = async (data: FormData): Promise<ResponseData> => {
  try {
    const response = await api.post('/api/party', data)
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
