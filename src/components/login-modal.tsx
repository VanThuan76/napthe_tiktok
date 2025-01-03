'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Image from 'next/image'
import axios from 'axios'
import { X } from 'lucide-react'
import { toast } from 'sonner'
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
    username: z.string().min(1, 'Vui lòng nhập tài khoản Roblox'),
})

export function LoginModal() {
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
            const response = await axios.post('/api/roblox', { username: values.username });

            const userInfo = response.data?.data?.[0];
            if (!userInfo) {
                toast.error('Tài khoản Roblox không tồn tại.');
                return;
            }

            const { id: userId, name: nickname } = userInfo;

            const avatarResponse = await axios.get('/api/roblox/avatar', {
                params: { userId },
            });

            const avatarUrl = avatarResponse.data?.imageUrl || '';
            const userData = { userId, nickname, avatar: avatarUrl };

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
            <DialogTrigger asChild>
                <Button variant="destructive">Đăng nhập</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center font-bold">Đăng nhập Roblox</DialogTitle>
                    <Button
                        variant="ghost"
                        className="absolute right-4 top-4 bg-gray-200 opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground rounded-full"
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
                                    <FormLabel className="font-semibold">Tên Tài Khoản Roblox</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nhập tài khoản roblox của bạn"
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
                    <div className="text-base font-semibold">Hướng dẫn lấy tên tài khoản Roblox</div>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                        <Image
                            src="/huongdan.jpg"
                            alt="Hướng dẫn lấy username Roblox"
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
