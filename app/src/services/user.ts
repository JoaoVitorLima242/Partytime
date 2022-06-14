import { api } from './axios'
// Types
import { RegisterData, ResponseData, UserProps, LoginData } from 'contexts/Auth/AuthContext.d'

export const registerRequest = async (data: RegisterData): Promise<ResponseData> => {
  try {
    const response = await api.post('/api/auth/register', data)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const logInRequest = async (data: LoginData): Promise<ResponseData> => {
  try {
    const response = await api.post('/api/auth/login', data)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const getUser = async (): Promise<UserProps> => {
  try {
    const response = await api.get('/api/user')
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const editUser = async (data: RegisterData): Promise<ResponseData> => {
  try {
    const response = await api.put('/api/user', data)
    return response.data
  } catch (error) {
    return error.response.data
  }
}
