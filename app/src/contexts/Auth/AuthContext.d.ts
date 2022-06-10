import { type } from 'os'
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

export type RegisterUserType = {
    error: null;
    msg: string;
    token: string;
    userId: string;
}

export type UserProps = {
    _id: string;
    email: string;
    name: string;
    createdAt: string
    updateAt: string
    password?: string
}

export type RegisterUserReturn = {
    error: boolean;
    msg: string;
}
export type GetUserByIdReturn = {
    error: boolean;
    msg: string;
}

export interface AuthCtx {
    RegisterUser: (data: RegisterData) => Promise<RegisterUserReturn>;
    isAuthenticated: boolean;
    user: UserProps;
}
