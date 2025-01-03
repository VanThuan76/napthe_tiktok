'use client'

import { Header } from "@/components/header"
import { Messages } from "@/components/messages"
import MainContent from "@/components/main-content"

import { useSyncUserFromLocalStorage } from "@/lib/use-init"

export default function Home() {
    useSyncUserFromLocalStorage()

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto p-4">
                <div className="grid gap-6 md:grid-cols-[2fr,1fr]">
                    <div className="space-y-6 col-span-2">
                        <MainContent />
                    </div>

                    <div className="col-span-2">
                        <Messages />
                    </div>
                </div>
            </main>
        </div>
    )
}
