'use client'

import Image from "next/image"
import { useState } from 'react'
import { TiktokCoinPackageCard } from "@/components/tiktok-coin-package"
import { CountdownTimer } from "@/components/countdown-timer"
import { TIKTOK_COIN_PACKAGES, PAYMENT_METHODS } from "@/lib/constants"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useAuthStore } from "@/store/auth"
import { PaymentModal } from "./payment-modal"
import { LoginModal } from "./login-modal"
import TiktokCoin from "./tiktok-coin"

const MainContent = () => {
    const { user } = useAuthStore();
    const [selectedPackage, setSelectedPackage] = useState<number | null>(null)

    return (
        <Card>
            <CardContent className="relative p-3 md:p-6">
                {user && (
                    <div className="mb-5 flex justify-start items-center gap-2">
                        <h1 className="text-2xl font-bold">Nạp Xu Tiktok</h1>
                        <Image src="/xu.avif" alt="Tiktok" width={20} height={20} className="h-5 w-5" />
                    </div>
                )}
                <div className="w-full md:w-fit flex items-center gap-4 bg-gray-200 p-4 rounded-sm">
                    {user ? (
                        <div className="w-fit flex flex-col md:flex-row justify-between items-start gap-4">
                            <div className="flex justify-start items-start gap-2">
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback>
                                        <Image src={user.avatar} alt="User Avatar" width={40} height={40} className="h-full w-full rounded-full" />
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col justify-start items-start">
                                    <p>{user.nickname}</p>
                                    <div className="flex justify-start items-center gap-1">
                                        <TiktokCoin className="w-[16px] h-[16px]" />
                                        <p className="text-sm text-muted-foreground">0</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-[1px] h-[1px] md:h-12 bg-black/50"></div>
                            <div className="flex flex-col justify-start items-start">
                                <p className="font-semibold">Nhiệm vụ nhận tiktok</p>
                                <div className="flex items-center gap-1">
                                    <span className="text-sm text-muted-foreground">Bạn đã hoàn thành: 0/1,450</span>
                                    <Image src="/xu.avif" alt="Tiktok" width={10} height={10} className="h-3 w-3" />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <LoginModal isMainContent={true} />
                    )}
                </div>

                <div className="mt-4 text-base text-black font-bold">
                    Nạp tiền: <strong className="text-red-500">Hệ thống xử lý thẻ cào nhanh chóng và cộng xu trong vòng 3 giây</strong>.
                </div>

                <div className="mt-6 rounded-lg bg-gradient-to-r from-[rgb(229,252,255)] to-[rgb(177,232,255)] px-4 py-2 animate-scale-up-down">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col justify-start items-start gap-2">
                            <div className="font-bold text-xl">{user ? "Hoàn thành nhiệm vụ để nhận 5,000 xu" : "Cơ hội nhận 5,000 Tiktok hôm nay đăng nhập để biết thêm chi tiết"}</div>
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
                    {TIKTOK_COIN_PACKAGES.map((pkg, index) => (
                        <TiktokCoinPackageCard
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
                                ? TIKTOK_COIN_PACKAGES[selectedPackage].price.toLocaleString()
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
