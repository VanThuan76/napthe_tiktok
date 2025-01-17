'use client'

import { useAuthStore } from '@/store/auth';
import { useState, useEffect } from 'react'

export function CountdownTimer() {
    const { user } = useAuthStore();

    const [timeLeft, setTimeLeft] = useState({
        hours: user ? 0 : 1,
        minutes: user ? 29 : 47,
        seconds: 59
    });

    useEffect(() => {
        setTimeLeft({
            hours: user ? 0 : 1,
            minutes: user ? 29 : 47,
            seconds: 59
        });
    }, [user]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(current => {
                const totalSeconds = current.hours * 3600 + current.minutes * 60 + current.seconds - 1
                if (totalSeconds <= 0) {
                    clearInterval(timer)
                    return { hours: 0, minutes: 0, seconds: 0 }
                }

                return {
                    hours: Math.floor(totalSeconds / 3600),
                    minutes: Math.floor((totalSeconds % 3600) / 60),
                    seconds: totalSeconds % 60
                }
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="text-base font-semibold">
            <span className='font-normal'>Thời gian còn lại</span>: {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
        </div>
    )
}
