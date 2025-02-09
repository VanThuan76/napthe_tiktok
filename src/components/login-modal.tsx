'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Image from 'next/image'
import axios from 'axios'
import { X, User } from 'lucide-react'
import { toast } from 'sonner'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthStore } from '@/store/auth'

const formSchema = z.object({
    username: z.string().min(1, 'Vui lòng nhập tài khoản tiktok'),
})

export function LoginModal({ isMainContent = false }: { isMainContent?: boolean }) {
    const [open, setOpen] = useState(false)
    const setUser = useAuthStore((state) => state.setUser)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const response = await axios.post('https://dangnhapnapxutiktok.com/api/login', { username: values.username });

            const userInfo = response.data?.data;
            if (!userInfo) {
                toast.error('Tài khoản tiktok không tồn tại.');
                return;
            }

            const { id: userId, nickname, avatar } = userInfo;

            const userData = { userId, nickname, avatar };

            localStorage.setItem('userData', JSON.stringify(userData));
            setUser(userData);

            toast.success('Đăng nhập thành công!');
            setOpen(false);
        } catch (error: any) {
            console.error('Error during login:', error);

            // Xử lý lỗi
            if (error.response && error.response.data) {
                const apiError = error.response.data.message || 'Lỗi từ server API';
                toast.error(apiError);
            } else {
                toast.error('Không thể kết nối tới server. Vui lòng thử lại sau.');
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div className='flex justify-center items-center gap-2'>
                {isMainContent ? (
                    <Avatar className="h-10 w-10">
                        <AvatarFallback>
                            <User className="h-6 w-6" />
                        </AvatarFallback>
                    </Avatar>
                ) : <></>}
                <Button variant={isMainContent ? "default" : "destructive"} className={isMainContent ? "bg-transparent hover:bg-transparent p-0 text-black/80 shadow-none text-xl font-bold" : ""}>Đăng nhập</Button>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center font-bold">Đăng nhập Tiktok</DialogTitle>
                    <Button
                        variant="ghost"
                        className="absolute right-0 top-2 w-8 h-8 opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground rounded-full"
                        onClick={() => setOpen(false)}
                    >
                        <X className="h-6 w-6" />
                        <span className="sr-only">Close</span>
                    </Button>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Tên Tài Khoản Tiktok</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nhập tài khoản tiktok của bạn"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" variant="destructive" className="w-full font-semibold text-white">
                            Đăng nhập ngay
                        </Button>
                    </form>
                </Form>

                <div className="mt-4 space-y-4">
                    <div className="text-base font-semibold">Hướng dẫn lấy tên tài khoản Tiktok</div>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                        <Image
                            src="/huongdan.png"
                            alt="Hướng dẫn lấy username tiktok"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="text-center text-sm">
                        <p>Chúng tôi không yêu cầu mật khẩu</p>
                        <p className="text-red-500 font-medium">
                            Vui lòng không cập mật khẩu của bạn cho bất kỳ ai
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
