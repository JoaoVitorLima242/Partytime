import Router from 'next/router'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import React, { createContext, useEffect, useState } from 'react'
import { api } from 'services/axios'
import { logInRequest, registerRequest, getUser } from 'services/user'
// types
import { AuthCtx, AuthProviderProps, LoginData, RegisterData, UserProps } from './AuthContext.d'

export const AuthContext = createContext({} as AuthCtx)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({} as UserProps | null)
  const [userId, setUserId] = useState('')

  useEffect(() => {
    const { 'auth-token': token } = parseCookies()

    if (token) {
      setIsAuthenticated(true)

      const fetchUser = async () => {
        const user = await getUser()
        setUser(user)
      }

      fetchUser()
    } else {
      setIsAuthenticated(false)
    }
  }, [userId])

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

  const logOutUser = () => {
    destroyCookie(undefined, 'auth-token')
    setUser(null)
    setUserId('')
    api.defaults.headers.common['auth-token'] = ''

    Router.push('/')
  }

  return (
        <AuthContext.Provider value={{ isAuthenticated, user, logInUser, registerUser, logOutUser }}>
            {children}
        </AuthContext.Provider>
  )
}
