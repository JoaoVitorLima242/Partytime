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

export type LoginData = {
    email: string;
    password: string;
}

export type AuthResponseData = {
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

export type AuthUserReturn = {
    error: boolean;
    msg: string;
}
export type GetUserByIdReturn = {
    error: boolean;
    msg: string;
}

export interface AuthCtx {
    registerUser: (data: RegisterData) => Promise<AuthUserReturn>;
    isAuthenticated: boolean;
    user: UserProps;
    logInUser: (data: RegisterData) => Promise<AuthUserReturn>;
}
