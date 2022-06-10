import { RegisterData, RegisterUserType, UserProps } from 'contexts/Auth/AuthContext.d'
import { api } from './axios'

export const registerRequest = async (data: RegisterData): Promise<RegisterUserType> => {
  try {
    const response = await api.post('/api/auth/register', data)
    return response.data
  } catch (error) {
    return error.response.data
  }
}

export const getUserById = async (id: string): Promise<UserProps> => {
  try {
    const response = await api.post(`/api/user/${id}`)
    return response.data
  } catch (error) {
    return error.response.data
  }
}
