import { parseCookies, setCookie } from 'nookies'
import React, { createContext, useEffect, useState } from 'react'
import { api } from 'services/axios'
import { getUserById, registerRequest } from 'services/user'
// types
import { AuthCtx, AuthProviderProps, RegisterData, RegisterUserReturn, UserProps } from './AuthContext.d'

export const AuthContext = createContext({} as AuthCtx)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({} as UserProps)
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const { 'auth-token': token } = parseCookies()

    if (token) {
      setIsAuthenticated(true)

      const fetchUser = async () => {
        const user = await getUserById(userId)
        setUser(user)
      }

      fetchUser()
    }
  }, [])

  const RegisterUser = async (data: RegisterData): Promise<RegisterUserReturn> => {
    const { error, token, userId, msg } = await registerRequest(data)

    if (error) {
      return { error: true, msg: error }
    }

    setCookie(undefined, 'auth-token', token, {
      maxAge: 60 * 60 * 3 // 3 hours
    })

    api.defaults.headers.common['auth-token'] = token

    setUserId(userId)

    return { error: false, msg }
  }

  return (
        <AuthContext.Provider value={{ RegisterUser, isAuthenticated, user }}>
            {children}
        </AuthContext.Provider>
  )
}
