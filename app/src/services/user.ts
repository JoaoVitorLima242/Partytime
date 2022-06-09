import { RegisterData, RegisterUserType } from 'contexts/Auth/AuthContext.d'
import { api } from './axios'

export const RegisterRequest = async (data: RegisterData): Promise<RegisterUserType> => {
  try {
    const response = await api.post('/api/auth/register', data)
    return response.data
  } catch (error) {
    return error.response.data
  }
}
