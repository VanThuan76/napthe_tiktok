import { create } from 'zustand'
import { AuthState, AuthResponse } from '@/types/auth'

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user: AuthResponse | null) => set({ user }),
}))
