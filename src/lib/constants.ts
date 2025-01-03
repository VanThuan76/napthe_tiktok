import { RobuxPackage, PaymentMethod } from "@/types"

export const ROBUX_PACKAGES: RobuxPackage[] = [
    { amount: 1280, bonus: 160, price: 50000 },
    { amount: 2560, bonus: 1280, price: 100000 },
    { amount: 5120, bonus: 2560, price: 200000 },
    { amount: 7680, bonus: 5120, price: 300000 },
    { amount: 12800, bonus: 10240, price: 500000 },
    { amount: 26200, bonus: 26200, price: 1000000 },
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
