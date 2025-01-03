import { RobuxPackage } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface RobuxPackageProps {
    package: RobuxPackage
    selected?: boolean
    onSelect?: () => void
}

export function RobuxPackageCard({ package: pkg, selected, onSelect }: RobuxPackageProps) {
    return (
        <Card
            className={`cursor-pointer transition-colors hover:bg-accent rounded-md ${selected ? 'border-2 border-yellow-400' : ''
                }`}
            onClick={onSelect}
        >
            <CardContent className="flex flex-col items-center p-4">
                <div className="flex items-center gap-1">
                    <Image src="/xu.avif" alt="Robux" width={20} height={20} className="h-5 w-5" />
                    <span className="text-2xl font-bold">{pkg.amount.toLocaleString()}</span>
                    <span className="text-base text-yellow-700">+{pkg.bonus.toLocaleString()}</span>
                </div>
                <div className="mt-2 text-base font-medium text-muted-foreground">
                    đ{pkg.price.toLocaleString()}
                </div>
            </CardContent>
        </Card>
    )
}
