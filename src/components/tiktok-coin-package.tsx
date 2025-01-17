import { TiktokCoinPackage } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import TiktokCoin from "./tiktok-coin"

interface TiktokCoinPackageProps {
    package: TiktokCoinPackage
    selected?: boolean
    onSelect?: () => void
}

export function TiktokCoinPackageCard({ package: pkg, selected, onSelect }: TiktokCoinPackageProps) {
    return (
        <Card
            className={`cursor-pointer transition-colors hover:bg-accent rounded-md ${selected ? 'border-2 border-yellow-400' : ''
                }`}
            onClick={onSelect}
        >
            <CardContent className="flex flex-col items-center p-4">
                <div className="flex items-center gap-1">
                    <TiktokCoin className="h-8 w-8" />
                    <span className="text-2xl font-bold">{pkg.amount.toLocaleString('vi-VN')}</span>
                    <span className="text-base text-yellow-700">+{pkg.bonus.toLocaleString('vi-VN')}</span>
                </div>
                <div className="mt-2 text-base font-semibold text-muted-foreground">
                    đ{pkg.price.toLocaleString('vi-VN')}
                </div>
            </CardContent>
        </Card>
    )
}
