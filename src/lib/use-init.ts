import { useEffect } from 'react'
import { useAuthStore } from '@/store/auth'

export function useSyncUserFromLocalStorage() {
    const setUser = useAuthStore((state) => state.setUser)

    useEffect(() => {
        const userData = localStorage.getItem('userData')

        if (userData) {
            const parsedUserData = JSON.parse(userData)
            setUser(parsedUserData)
        }
    }, [setUser])
}
