'use client'

import { useState, useEffect } from 'react'

export function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 1,
        minutes: 47,
        seconds: 53
    })

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
