import React, { createContext } from 'react'
// types
import { AuthCtx, AuthProviderProps, RegisterData } from './AuthContext.d'

export const AuthContext = createContext({} as AuthCtx)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const RegisterUserRequest = async (data: RegisterData): Promise<void> => {
    const dataJSON = JSON.stringify(data)

    await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: dataJSON
    })
      .then((result) => result.json())
      .then((data) => {
        console.log(data)
      })
  }

  return (
        <AuthContext.Provider value={{ RegisterUserRequest }}>
            {children}
        </AuthContext.Provider>
  )
}
