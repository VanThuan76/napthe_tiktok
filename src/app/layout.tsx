import type { Metadata } from "next";
import { Toaster } from 'sonner'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export const metadata: Metadata = {
    title: "Nạp thẻ Tiktok - Nạp xu chính hãng",
    description: "Nạp thẻ Tiktok nhanh chóng, uy tín, và an toàn. Cung cấp dịch vụ nạp xu chính hãng với giá tốt nhất. Hỗ trợ khách hàng 24/7.",
    keywords: ["nạp thẻ Tiktok", "nạp Tiktok", "mua xu Tiktok giá rẻ", "dịch vụ nạp Tiktok", "Tiktok uy tín"],
    openGraph: {
        title: "Nạp thẻ Tiktok - Nạp Xu chính hãng",
        description: "Nạp thẻ Tiktok nhanh chóng, uy tín, và an toàn. Cung cấp dịch vụ nạp Xu chính hãng với giá tốt nhất. Hỗ trợ khách hàng 24/7.",
        url: "https://naptheTiktok.org",
        images: [
            {
                url: "/logo_tiktok.webp",
                width: 800,
                height: 600,
                alt: "Nạp thẻ Tiktok Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Nạp thẻ Tiktok - Nạp Xu chính hãng",
        description: "Nạp thẻ Tiktok nhanh chóng, uy tín, và an toàn. Cung cấp dịch vụ nạp Xu chính hãng với giá tốt nhất. Hỗ trợ khách hàng 24/7.",
        images: ["/logo_tiktok.webp"],
    },
    icons: {
        icon: "/logo_tiktok.webp",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
