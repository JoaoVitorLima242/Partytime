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

export type RegisterUserReturn = {
    error: boolean;
    msg: string;
}

export type userInfo = {

}

export interface AuthCtx {
    RegisterUser: (data: RegisterData) => Promise<RegisterUserReturn>;
    isAuthenticated: boolean;
    user: any;
}
