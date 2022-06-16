import { ResponseData } from 'contexts/Auth/AuthContext.d'
import { api, getApiClient } from './axios'

export type PartyProps = {
    _id: string;
    title: string;
    description: string;
    partyDate: Date;
    photos?: string[];
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

export const getParties = async (): Promise<PartiesResponse> => {
  try {
    const response = await api.get('/api/party/')
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const getPartyByIdRequest = async (id: unknown, ctx?): Promise<PartyResponse> => {
  try {
    if (ctx) {
      const apiCtx = getApiClient(ctx)
      const response = await apiCtx.get(`/api/party/${id}`)
      return response.data
    } else {
      const response = await api.get(`/api/party/${id}`)
      return response.data
    }
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}

export const getUserPartiesRequest = async (ctx): Promise<PartiesResponse> => {
  const api = getApiClient(ctx)
  try {
    const response = await api.get('/api/party/user')
    return response.data
  } catch (error) {
    return error.response.data
  }
}
export const getUserPartyByIdRequest = async (ctx, id: unknown): Promise<PartyResponse> => {
  const api = getApiClient(ctx)
  try {
    const response = await api.get(`/api/party/user/${id}`)
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
export const EditPartyRequest = async (token: string, data: FormData): Promise<ResponseData> => {
  if (token) {
    api.defaults.headers['auth-token'] = token
  }
  api.interceptors.request.use(config => {
    return config
  })
  try {
    const response = await api.put('/api/party', data)
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
