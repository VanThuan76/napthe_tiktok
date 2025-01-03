export type AuthResponse = {
    userId: string;
    nickname: string;
    avatar: string;
}

export interface AuthState {
    user: AuthResponse | null
    setUser: (user: AuthResponse | null) => void
}
