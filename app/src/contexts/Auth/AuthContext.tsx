import { setCookie } from 'nookies'
import React, { createContext, useEffect, useState } from 'react'
import { RegisterRequest } from 'services/user'
// types
import { AuthCtx, AuthProviderProps, RegisterData, RegisterUserReturn } from './AuthContext.d'

export const AuthContext = createContext({} as AuthCtx)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const RegisterUser = async (data: RegisterData): Promise<RegisterUserReturn> => {
    const { error, token, userId, msg } = await RegisterRequest(data)

    if (error) {
      return { error: true, msg: error }
    }

    /* useEffect(() => {
      const {}
    }, []) */

    setCookie(undefined, 'auth-token', token, {
      maxAge: 60 * 60 * 3 // 3 hours
    })

    return { error: false, msg }
  }

  return (
        <AuthContext.Provider value={{ RegisterUser }}>
            {children}
        </AuthContext.Provider>
  )
}
