import React, { createContext } from 'react'

export const AuthContext = createContext({})

type AuthProvidesProps = {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProvidesProps) => {
  return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
  )
}
