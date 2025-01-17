import { useState, useEffect } from "react";
import Image from "next/image";

export default function SuccessMessage() {
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="max-w-2xl space-y-4 flex flex-col justify-center items-center min-h-[50vh]">
            <Image
                alt="@check"
                src="/check.png"
                width={300}
                height={300}
                className="w-20 h-20 object-contain object-center"
            />
            <h3 className="font-semibold">Chúc mừng bạn đã nạp thẻ thành công</h3>
            <p>Hệ thống sẽ xét duyệt trong giây lát. Bạn vẫn có thể nạp tiếp tục thẻ cào khác...</p>
            <p className="font-medium">Quay lại trong {countdown} giây...</p>
        </div>
    );
}
