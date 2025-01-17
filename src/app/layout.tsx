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
    title: "Nạp thẻ Roblox - Nạp Robux chính hãng",
    description: "Nạp thẻ Roblox nhanh chóng, uy tín, và an toàn. Cung cấp dịch vụ nạp Robux chính hãng với giá tốt nhất. Hỗ trợ khách hàng 24/7.",
    keywords: ["nạp thẻ Roblox", "nạp Robux", "mua Robux giá rẻ", "dịch vụ nạp Roblox", "Robux uy tín"],
    openGraph: {
        title: "Nạp thẻ Roblox - Nạp Robux chính hãng",
        description: "Nạp thẻ Roblox nhanh chóng, uy tín, và an toàn. Cung cấp dịch vụ nạp Robux chính hãng với giá tốt nhất. Hỗ trợ khách hàng 24/7.",
        url: "https://naptherobux.org",
        images: [
            {
                url: "/logo_roblox.jpg",
                width: 800,
                height: 600,
                alt: "Nạp thẻ Roblox Logo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Nạp thẻ Roblox - Nạp Robux chính hãng",
        description: "Nạp thẻ Roblox nhanh chóng, uy tín, và an toàn. Cung cấp dịch vụ nạp Robux chính hãng với giá tốt nhất. Hỗ trợ khách hàng 24/7.",
        images: ["/logo_roblox.jpg"],
    },
    icons: {
        icon: "/logo_roblox.jpg",
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
