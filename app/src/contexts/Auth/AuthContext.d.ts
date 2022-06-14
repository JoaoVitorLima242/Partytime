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

export type ResponseData = {
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
    isAuthenticated: boolean;
    user: UserProps | null;
    registerUser: (data: RegisterData) => Promise<AuthUserReturn>;
    logInUser: (data: RegisterData) => Promise<AuthUserReturn>;
    logOutUser: () => void;
}
