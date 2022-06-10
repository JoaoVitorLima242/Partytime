import Router from 'next/router'
import { parseCookies, setCookie } from 'nookies'
import React, { createContext, useEffect, useState } from 'react'
import { api } from 'services/axios'
import { registerRequest, getUserById } from 'services/user'
// types
import { AuthCtx, AuthProviderProps, RegisterData, RegisterUserReturn } from './AuthContext.d'

export const AuthContext = createContext({} as AuthCtx)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const { 'auth-token': token } = parseCookies()

    if (token) {
      setIsAuthenticated(true)
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

    api.defaults.headers.common['auth-header'] = token

    Router.push('/profile')

    return { error: false, msg }
  }

  return (
        <AuthContext.Provider value={{ RegisterUser, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
  )
}
