import { TiktokCoinPackage, PaymentMethod } from "@/types"

export const TIKTOK_COIN_PACKAGES: TiktokCoinPackage[] = [
    { amount: 350, bonus: 0, price: 50000 },
    { amount: 1450, bonus: 1450, price: 100000 },
    { amount: 3700, bonus: 3700, price: 200000 },
    { amount: 7600, bonus: 7600, price: 300000 },
    { amount: 12800, bonus: 12800, price: 500000 },
    { amount: 25200, bonus: 25200, price: 1000000 },
]

export const PAYMENT_METHODS: PaymentMethod[] = [
    { id: "visa", name: "Visa", icon: "/visa.png" },
    { id: "momo", name: "MoMo", icon: "/momo.png" },
    { id: "zalopay", name: "ZaloPay", icon: "/zalo_pay.png" },
    { id: "viettel", name: "Viettel Money", icon: "/viettel.png" },
    { id: "mobifone", name: "Mobifone Money", icon: "/mobifone.png" },
    { id: "vinaphone", name: "Vinaphone Money", icon: "/vinaphone.png" },
    { id: "zing", name: "Zing", icon: "/zing.png" },
    { id: "garena", name: "Garena", icon: "/garena.png" },
]


export const PAYMENT_CARDS: PaymentMethod[] = [
    { id: "viettel", name: "Viettel Money", icon: "/viettel.png" },
    { id: "mobifone", name: "Mobifone Money", icon: "/mobifone.png" },
    { id: "vinaphone", name: "Vinaphone Money", icon: "/vinaphone.png" },
    { id: "gate", name: "Gate", icon: "/gate.png" },
    { id: "zing", name: "Zing", icon: "/zing.png" },
    { id: "garena", name: "Garena", icon: "/garena.png" },
]
