'use client'

import Image from "next/image"
import { MessageSquare, Search, Send, LogOut, User } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/store/auth"
import { LoginModal } from "./login-modal"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
    const { user, setUser } = useAuthStore();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('userData');
    }

    return (
        <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex justify-start items-center gap-2">
                    <Image src="/logo_top.png" alt="Tiktok" width={100} height={300} className="h-8 object-contain object-center" />
                </div>

                <div className="flex w-full max-w-sm items-center gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Tìm kiếm" className="pl-8" />
                    </div>
                </div>

                {user ? (
                    <div className="flex justify-center items-center gap-4">
                        <Send className="w-5 h-5 cursor-pointer" />
                        <MessageSquare className="w-5 h-5 cursor-pointer" />

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback>
                                        <Image src={user.avatar} alt="User Avatar" width={40} height={40} className="h-full w-full rounded-full" />
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem className="font-bold">
                                    <User className="mr-2 w-5 h-5" />
                                    @{user.nickname}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogout} className="font-bold">
                                    <LogOut className="mr-2 w-5 h-5" />
                                    Đăng xuất
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ) :
                    <LoginModal />
                }
            </div>
        </header>
    )
}
