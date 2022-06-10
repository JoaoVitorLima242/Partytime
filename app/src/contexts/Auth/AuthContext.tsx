import { parseCookies, setCookie } from 'nookies'
import React, { createContext, useEffect, useState } from 'react'
import { api } from 'services/axios'
import { getUserById, logInRequest, registerRequest } from 'services/user'
// types
import { AuthCtx, AuthProviderProps, LoginData, RegisterData, AuthUserReturn, UserProps } from './AuthContext.d'

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

  const registerUser = async (data: RegisterData) => {
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

  const logInUser = async (data: LoginData) => {
    const { error, token, userId, msg } = await logInRequest(data)

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
        <AuthContext.Provider value={{ registerUser, isAuthenticated, user, logInUser }}>
            {children}
        </AuthContext.Provider>
  )
}
