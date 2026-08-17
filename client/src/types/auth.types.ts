import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { HookFunction } from "./callManager.types";

export interface User {
    id: number;
    username: string;
    email: string;
    premium: boolean;
    private: boolean;
    google_id: string;
}

export interface JwtUser {
    id: number;
}

export interface AuthenticatedRequest {
    user: JwtUser;
}

export interface PasswordResetTypes {
    id: number;
    user_id: number;
    token_hash: string;
    expires_at: Date;
    used_at: Date;
}

export interface ValidateAuthParams {
    isLogin: boolean;
    username?: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface AuthContextValue {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
    loading: boolean;
    authLoading: boolean;
    priv_u: boolean;
    login: (user: User) => void;
    logout: () => Promise<void>;
}

export interface AuthProviderProps {
    children: ReactNode;
}

export interface AuthSessionProps {
    postCall: HookFunction;
    setUser: Dispatch<SetStateAction<User | null>>;
}

export interface AuthUserProps {
    fetchCall: HookFunction;
    setUser: Dispatch<SetStateAction<User | null>>;
    setAuthLoading: Dispatch<SetStateAction<boolean>>;
}