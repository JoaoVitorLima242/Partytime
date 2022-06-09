import React from 'react'

export type AuthProviderProps = {
    children: React.ReactNode;
}

export type RegisterData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthCtx {
    RegisterUserRequest: (data: RegisterData) => Promise<void>
}
