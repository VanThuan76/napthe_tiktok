export interface TiktokCoinPackage {
    amount: number
    bonus: number
    price: number
}

export interface Message {
    id: string
    username: string
    content: string
    timestamp: string
}

export interface PaymentMethod {
    id: string
    name: string
    icon: string
}
