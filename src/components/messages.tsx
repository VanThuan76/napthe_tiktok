'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle } from 'lucide-react'

const SAMPLE_MESSAGES = [
    {
        id: '1',
        username: 'TrangNapRobux.Com',
        content: 'Bạn đã đăng nhập ngày để làm nhiệm vụ nhận robux từ TrangNapRobux.Com nhé',
        timestamp: 'vừa gửi',
        isUser: false,
    },
];

function generateRandomMessage() {
    const randomUsernames = [
        'long*****',
        'thuanhip77*****',
        'hiep23*****',
        'austinvu2*****',
    ];
    const randomContents = [
        'Thực hiện nhiệm vụ nhanh chóng và nhận ngay Robux!',
        'Cảm ơn TrangNapRobux, tôi đã nhận được Robux rất nhanh.',
        'Dịch vụ uy tín và đáng tin cậy, rất hài lòng!',
        'Robux đã về chỉ sau vài phút, cảm ơn đội ngũ!',
    ];
    const randomUsername = randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
    const randomContent = randomContents[Math.floor(Math.random() * randomContents.length)];

    return {
        id: `${Date.now()}`,
        username: randomUsername,
        content: randomContent,
        timestamp: 'vừa gửi',
        isUser: false,
    };
}

export function Messages() {
    const [messages, setMessages] = useState(SAMPLE_MESSAGES);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            const message = generateRandomMessage();
            setMessages((prevMessages) => [message, ...prevMessages]);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const userMessage = {
                id: `${Date.now()}`,
                username: 'Bạn',
                content: newMessage.trim(),
                timestamp: 'vừa gửi',
                isUser: true, // Tin nhắn từ người dùng
            };
            setMessages((prevMessages) => [userMessage, ...prevMessages]);
            setNewMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Ngăn chặn hành vi mặc định
            handleSendMessage();
        }
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader className="p-0 mb-2">
                <CardTitle className="w-full p-4 flex items-center gap-2 bg-sky-100">
                    <MessageCircle className="h-5 w-5" />
                    Tin nhắn từ người nạp
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px]">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`mb-4 p-3 rounded-lg animate-fadeIn ${message.isUser
                                    ? 'bg-blue-100 flex flex-col justify-end items-end text-right ml-auto w-fit'
                                    : 'bg-muted text-left mr-auto w-fit'
                                }`}
                        >
                            <div className="font-bold">{message.username}</div>
                            <div className="mt-1 text-sm">{message.content}</div>
                            <div className="mt-1 text-xs text-muted-foreground">{message.timestamp}</div>
                        </div>
                    ))}
                </ScrollArea>
                <div className="mt-4 flex gap-2">
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Nhập tin nhắn..."
                    />
                    <Button
                        onClick={handleSendMessage}
                        className="bg-sky-100 text-black font-semibold hover:bg-sky-200"
                    >
                        Gửi
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
