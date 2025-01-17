'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Image from 'next/image'
import axios from 'axios'
import { ShieldCheckIcon, X } from 'lucide-react'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useAuthStore } from '@/store/auth'
import { TIKTOK_COIN_PACKAGES, PAYMENT_CARDS } from "@/lib/constants"
import md5 from 'md5'

const paymentSchema = z.object({
    seri: z.string().min(1, { message: 'Số Serial không được để trống' }),
    cardCode: z.string().min(1, { message: 'Mã Thẻ không được để trống' }),
});
interface PaymentModalProps {
    selectedPackage: number | null;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ selectedPackage }) => {
    const [packageDetails, setPackageDetails] = useState(TIKTOK_COIN_PACKAGES[0])
    const [cardPayment, setCardPayment] = useState<string | null>(null)
    const [methodPayment, setMethodPayment] = useState<string | null>(null)

    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const { user } = useAuthStore()
    const form = useForm({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            seri: '',
            cardCode: '',
        },
    });

    const coinBonus = packageDetails.bonus === 0 ? 0 : 5000;

    useEffect(() => {
        if (selectedPackage !== null) {
            setPackageDetails(TIKTOK_COIN_PACKAGES[selectedPackage])
        }
    }, [selectedPackage, form])


    const handleCardClick = (cardId: string) => {
        setCardPayment(cardId)
    }

    async function handleSubmit(values: { seri: string; cardCode: string }) {
        try {
            const isValid = await form.trigger();
            if (!isValid) {
                return;
            }

            setIsLoading(true);

            const paymentData = {
                request_id: Math.floor(Math.random() * 1000000000) + 100000000,
                code: values.cardCode,
                partner_id: '10437132744',
                serial: values.seri,
                telco: cardPayment?.toUpperCase(),
                amount: packageDetails.price,
                command: 'charging',
                sign: '',
                callback_sign: '',
            };

            const partner_key = '1902ab2fb74c19ce6e0820d6aa590a35';

            paymentData.callback_sign = md5(partner_key + paymentData.code + paymentData.serial);

            paymentData.sign = md5(partner_key + paymentData.code + paymentData.serial);

            const response = await axios.post('/api/charging', paymentData);

            if (response.data) {
                toast.success('Thanh toán thành công!');
            } else {
                toast.error('Thanh toán thất bại. Vui lòng thử lại.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Không thể kết nối tới server.');
        } finally {
            setIsLoading(false);
            setIsSuccess(true)
            setTimeout(() => {
                setIsSuccess(false)
            }, 5000)
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button
                className="font-semibold"
                variant="destructive"
                size="lg"
                disabled={selectedPackage === null}
                onClick={() => {
                    const userData = localStorage.getItem('userData');
                    if (!userData) {
                        toast.error('Bạn cần đăng nhập để thanh toán!');
                        return;
                    }
                    setOpen(true);
                }}
            >
                Thanh toán
            </Button>
            <DialogContent className="pb-0 pt-0 overflow-y-auto overflow-x-hidden max-w-2xl max-h-[80%] mx-auto">
                <DialogHeader className="sticky top-0 bg-white border-b border-gray-300 pt-4 pb-2 z-50">
                    <div className="text-2xl font-bold">
                        <DialogTitle className="text-xl font-bold">Tóm tắt đơn hàng</DialogTitle>
                        <div className="flex justify-start items-center gap-1">
                            <ShieldCheckIcon className="w-3 h-3 text-green-500" />
                            <p className='text-xs font-thin text-green-500'>Thông tin của bạn là riêng tư và an toàn.</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="absolute right-0 top-2 w-8 h-8 opacity-70 ring-offset-background transition-opacity hover:opacity-100 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground rounded-full"
                        onClick={() => setOpen(false)}
                    >
                        <X className="h-10 w-10" />
                        <span className="sr-only">Close</span>
                    </Button>
                </DialogHeader>
                {isSuccess ?
                    <SuccessMessage />
                    :
                    <div className="max-w-2xl space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="font-semibold text-xl">Tài Khoản:</div>
                            <div className="flex justify-end items-center gap-1">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback>
                                        <Image src={user?.avatar ?? ""} alt="User Avatar" width={16} height={16} className="h-full w-full rounded-full object-contain object-center" />
                                    </AvatarFallback>
                                </Avatar>
                                <div>{user?.nickname || 'Chưa đăng nhập'}</div>
                            </div>
                        </div>
                        <div className="h-[1px] bg-gray-300"></div>
                        <div className="flex justify-between">
                            <div className="font-semibold text-xl">Tổng Tiền:</div>
                            <div className="font-semibold">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(packageDetails.price)}
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="text-sm">{packageDetails.amount.toLocaleString("en-US")} Xu</div>
                            <div className="text-sm">
                                {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                }).format(packageDetails.price)}
                            </div>
                        </div>
                        {packageDetails.bonus !== 0 &&
                            (
                                <>
                                    <div className="flex justify-between">
                                        <div className="text-sm">{packageDetails.bonus.toLocaleString("en-US")} Khuyến mãi</div>
                                        <div className="text-sm">
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(0)}
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="text-sm">5,000 xu Nhận từ nhiệm vụ</div>
                                        <div className="text-sm">
                                            {new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND",
                                            }).format(0)}
                                        </div>
                                    </div>
                                </>
                            )}
                        <div className="flex justify-between">
                            <div className="font-semibold text-lg text-red-500">Tổng xu nhận được:</div>
                            <div className="flex justify-end items-center gap-2">
                                <p className="font-semibold text-lg text-red-500">{(packageDetails.amount + packageDetails.bonus + coinBonus).toLocaleString("en-US")}</p>
                                <Image src="/xu.avif" alt="Xu" width={20} height={20} className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="h-[1px] bg-gray-300"></div>
                        <div className="mt-4 space-y-4">
                            <div className="text-xl font-semibold">Phương Thức Thanh Toán</div>
                            <div className="flex flex-col gap-4">
                                <div className="p-4 w-full rounded-md flex flex-col justify-start items-start gap-4 border border-black">
                                    <div className="w-full flex justify-between items-center">
                                        <div className='flex justify-start items-center gap-2'>
                                            <input type="radio" onChange={() => setMethodPayment("card")} />
                                            <p className="font-bold">Thẻ cào điện thoại</p>
                                        </div>
                                        <div className='flex justify-end items-center gap-2'>
                                            <Image
                                                alt="@viettel"
                                                width={24}
                                                height={24}
                                                src="/viettel.png"
                                                className='w-[24px] h-[24px] object-contain object-center'
                                            />
                                            <Image
                                                alt="@vinaphone"
                                                width={24}
                                                height={24}
                                                src="/vinaphone.png"
                                                className='w-[24px] h-[24px] object-contain object-center'
                                            />
                                            <Image
                                                alt="@mobifone"
                                                width={24}
                                                height={24}
                                                src="/mobifone.png"
                                                className='w-[24px] h-[24px] object-contain object-center'
                                            />
                                        </div>
                                    </div>
                                    {methodPayment === "card" &&
                                        <div className="w-full grid grid-cols-3 gap-4">
                                            {PAYMENT_CARDS.map((card) => (
                                                <div
                                                    key={card.id}
                                                    onClick={() => handleCardClick(card.id)}
                                                    className={`col-span-1 p-4 border rounded-md flex flex-col items-center justify-center cursor-pointer ${cardPayment === card.id ? 'border-blue-500' : 'border-gray-300'
                                                        } hover:border-blue-500`}
                                                >
                                                    <Image
                                                        src={card.icon}
                                                        alt={card.name}
                                                        width={100}
                                                        height={100}
                                                        className="w-full object-contain"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    }
                                    {cardPayment && (
                                        <Form {...form}>
                                            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 bg-gray-100 p-4 rounded-md w-full">
                                                <FormField
                                                    control={form.control}
                                                    name="seri"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-bold font-semibold">Số Serial:</FormLabel>
                                                            <FormControl>
                                                                <div className="relative w-full">
                                                                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                                                                        <Image alt="@card" src="https://lf16-co.g-p-static.com/obj/pipo-va-us/sky/card_icon_4413ec.svg" width={25} height={25} className="object-contain w-[25px] h-[25px]" />
                                                                    </div>
                                                                    <input
                                                                        {...field}
                                                                        className="w-full pl-10 p-2 border rounded-md"
                                                                        placeholder="Nhập số seri"
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            {form?.formState?.errors?.seri && (
                                                                <span className="text-red-600 text-sm">
                                                                    {form.formState.errors.seri.message}
                                                                </span>
                                                            )}
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="cardCode"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="text-bold font-semibold">Mã Thẻ:</FormLabel>
                                                            <FormControl>
                                                                <div className="relative w-full">
                                                                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                                                                        <Image alt="@card" src="https://lf16-co.g-p-static.com/obj/pipo-va-us/sky/card_icon_4413ec.svg" width={25} height={25} className="object-contain w-[25px] h-[25px]" />
                                                                    </div>
                                                                    <input
                                                                        {...field}
                                                                        className="w-full pl-10 p-2 border rounded-md"
                                                                        placeholder="Nhập mã thẻ"
                                                                    />
                                                                </div>
                                                            </FormControl>
                                                            {form.formState.errors.cardCode && <span className="text-red-600 text-sm">{form.formState.errors.cardCode.message}</span>}
                                                        </FormItem>
                                                    )}
                                                />
                                                <Button
                                                    type="submit"
                                                    variant="destructive"
                                                    className="w-full font-semibold"
                                                    disabled={isLoading}
                                                >
                                                    {isLoading ? 'Đang xử lý...' : 'Nạp ngay'}
                                                </Button>
                                            </form>
                                        </Form>
                                    )}
                                </div>
                                <div className="p-4 w-full rounded-md flex justify-start items-center gap-2 bg-gray-300 pointer-events-none opacity-50">
                                    <div className="w-full flex justify-between items-center">
                                        <div className='flex justify-start items-center gap-2'>
                                            <input type="radio" disabled />
                                            <p className="text-muted-foreground font-bold">Momo (Bảo trì)</p>
                                        </div>
                                        <div className='flex justify-end items-end'>
                                            <Image
                                                alt="@mono"
                                                width={24}
                                                height={24}
                                                src="/momo.png"
                                                className='w-[24px] h-[24px] object-contain object-center'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 w-full rounded-md flex justify-start items-center gap-2 bg-gray-300 pointer-events-none opacity-50">
                                    <div className="w-full flex justify-between items-center">
                                        <div className='flex justify-start items-center gap-2'>
                                            <input type="radio" disabled />
                                            <p className="text-muted-foreground font-bold">ZaloPay (Bảo trì)</p>
                                        </div>
                                        <div className='flex justify-end items-end'>
                                            <Image
                                                alt="@mono"
                                                width={24}
                                                height={24}
                                                src="/zalo_pay.png"
                                                className='w-[24px] h-[24px] object-contain object-center'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Image
                                src="/download.svg"
                                alt="Secure Payment"
                                width={100}
                                height={100}
                                className="h-14 w-14 mx-auto"
                            />
                        </div>
                    </div>}
            </DialogContent>
        </Dialog>
    )
}
