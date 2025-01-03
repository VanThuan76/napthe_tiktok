'use client'

import Image from "next/image"
import { User } from "lucide-react"
import { useState } from 'react'
import { RobuxPackageCard } from "@/components/robux-package"
import { CountdownTimer } from "@/components/countdown-timer"
import { ROBUX_PACKAGES, PAYMENT_METHODS } from "@/lib/constants"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuthStore } from "@/store/auth"
import { PaymentModal } from "./payment-modal"

const MainContent = () => {
    const { user } = useAuthStore();
    const [selectedPackage, setSelectedPackage] = useState<number | null>(null)

    return (
        <Card>
            <CardContent className="relative p-6">
                {user && (
                    <div className="mb-5 flex justify-start items-center gap-2">
                        <h1 className="text-2xl font-bold">Nạp Robux Bằng Thẻ Cào</h1>
                        <Image src="/xu.avif" alt="Robux" width={20} height={20} className="h-5 w-5" />
                    </div>
                )}
                <div className="flex items-center gap-4 bg-gray-200 p-4 rounded-sm">
                    {user ? (
                        <div className="w-fit flex justify-between items-start gap-4">
                            <div className="flex justify-start items-start gap-2">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback>
                                        <Image src={user.avatar} alt="User Avatar" width={40} height={40} className="h-full w-full rounded-full" />
                                    </AvatarFallback>
                                </Avatar>
                                <p>{user.nickname}</p>
                            </div>
                            <div className="w-[1px] h-12 bg-black/50"></div>
                            <div className="flex flex-col justify-start items-start">
                                <p className="font-semibold">Nhiệm vụ nhận robux</p>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-muted-foreground">Bạn đã hoàn thành: 0/2,560</span>
                                    <Image src="/xu.avif" alt="Robux" width={10} height={10} className="h-3 w-3" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Avatar className="h-10 w-10">
                                <AvatarFallback>
                                    <User className="h-6 w-6" />
                                </AvatarFallback>
                            </Avatar>
                            <h2 className="text-lg font-semibold">Đăng nhập</h2>
                        </>
                    )}
                </div>

                <div className="mt-4 text-base text-black font-bold">
                    Nạp tiền: <strong className="text-red-500">Hệ thống xử lý thẻ cào nhanh chóng! Robux cộng vào tài khoản chỉ 1 Phút</strong>.
                </div>

                <div className="mt-6 rounded-lg bg-sky-100 px-4 py-2 animate-scale-up-down">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col justify-start items-start gap-2">
                            <div className="font-bold text-xl">Cơ hội nhận 5,000 Robux hôm nay đăng nhập để biết thêm chi tiết</div>
                            <CountdownTimer />
                        </div>
                        <Image
                            src="/promotion-banner.png"
                            alt="@promotion-banner"
                            width={100}
                            height={100}
                            className="h-full object-contain object-center"
                        />
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
                    {ROBUX_PACKAGES.map((pkg, index) => (
                        <RobuxPackageCard
                            key={pkg.amount}
                            package={pkg}
                            selected={selectedPackage === index}
                            onSelect={() => setSelectedPackage(index)}
                        />
                    ))}
                </div>

                <div className="mt-6">
                    <div className="mb-2 text-sm">Phương thức thanh toán</div>
                    <div className="flex flex-wrap gap-2">
                        {PAYMENT_METHODS.map(method => (
                            <Image
                                key={method.id}
                                src={method.icon}
                                alt={method.name}
                                width={32}
                                height={32}
                                className="h-8 object-contain object-center"
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-6 flex flex-col items-start justify-start gap-4">
                    <div>
                        <div className="text-sm">Tổng tiền</div>
                        <div className="text-2xl font-bold">
                            đ{selectedPackage !== null
                                ? ROBUX_PACKAGES[selectedPackage].price.toLocaleString()
                                : '0'}
                        </div>
                    </div>
                    <PaymentModal selectedPackage={selectedPackage} />
                </div>

                <Image
                    src="/download.svg"
                    alt="@secure-payment"
                    width={100}
                    height={100}
                    className="absolute bottom-5 right-5 w-14 object-contain object-center"
                />

            </CardContent>
        </Card>
    );
}

export default MainContent;
