'use client'

import { useState } from 'react'
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
      timestamp: 'vừa gửi'
    },
    {
      id: '2',
      username: 'una*****',
      content: 'Vừa hoàn thành nhiệm vụ nhận Robux, nạp 500k mà nhận ngay 28.160 Robux. Web này uy tín, Robux về siêu nhanh!',
      timestamp: 'vừa gửi'
    },
    {
      id: '3',
      username: 'hieu*****',
      content: 'Nạp 1 triệu mà nhận 56.000 Robux. Web cực kỳ uy tín. Robux về ngay!',
      timestamp: '5 phút trước'
    },
    {
      id: '4',
      username: 'hoang*****',
      content: 'Vừa thực hiện nhiệm vụ nhận 10k Robux. Cảm ơn TrangNapRobux.Com!',
      timestamp: '10 phút trước'
    },
    {
      id: '5',
      username: 'nguyen*****',
      content: 'Web này thật tuyệt, nạp 100k nhận ngay 5.000 Robux, rất nhanh chóng.',
      timestamp: '15 phút trước'
    },
    {
      id: '6',
      username: 'lam*****',
      content: 'Đã hoàn thành nhiệm vụ và nhận 3.000 Robux, nhanh chóng và an toàn.',
      timestamp: '20 phút trước'
    },
    {
      id: '7',
      username: 'khanh*****',
      content: 'Robux về rất nhanh, chỉ mất vài phút sau khi thanh toán. Mình vừa nhận 50.000 Robux.',
      timestamp: '25 phút trước'
    },
    {
      id: '8',
      username: 'minh*****',
      content: 'Vừa hoàn tất nhiệm vụ với 2.500 Robux, rất hài lòng với dịch vụ.',
      timestamp: '30 phút trước'
    },
    {
      id: '9',
      username: 'quang*****',
      content: 'Nhận được 15.000 Robux sau khi nạp 300k. Tuyệt vời!',
      timestamp: '35 phút trước'
    },
    {
      id: '10',
      username: 'hien*****',
      content: 'Nạp 500k nhận ngay 25.000 Robux. Dịch vụ rất nhanh và hiệu quả.',
      timestamp: '40 phút trước'
    },
    {
      id: '11',
      username: 'tuan*****',
      content: 'Rất thích sử dụng dịch vụ này. Robux về nhanh và ổn định, vừa nhận 10.000 Robux.',
      timestamp: '45 phút trước'
    },
    {
      id: '12',
      username: 'dung*****',
      content: 'Nạp 200k nhận 10.000 Robux, thực sự rất hài lòng.',
      timestamp: '50 phút trước'
    },
    {
      id: '13',
      username: 'son*****',
      content: 'Robux về ngay sau khi nạp, rất nhanh và dễ dàng! Được 5.000 Robux.',
      timestamp: '55 phút trước'
    },
    {
      id: '14',
      username: 'lan*****',
      content: 'Đã hoàn tất giao dịch và nhận ngay 30.000 Robux. Cảm ơn TrangNapRobux!',
      timestamp: '1 giờ trước'
    },
    {
      id: '15',
      username: 'nhan*****',
      content: 'Web này rất uy tín, mình đã nhận được 10.000 Robux sau khi nạp 200k.',
      timestamp: '1 giờ trước'
    },
    {
      id: '16',
      username: 'le*****',
      content: 'Nạp 700k nhận 35.000 Robux, rất nhanh và đáng tin cậy!',
      timestamp: '1 giờ trước'
    },
    {
      id: '17',
      username: 'trung*****',
      content: 'Vừa hoàn thành nhiệm vụ và nhận 4.000 Robux, web rất dễ sử dụng.',
      timestamp: '1 giờ trước'
    },
    {
      id: '18',
      username: 'lan*****',
      content: 'Vừa nhận được 8.000 Robux từ việc hoàn thành nhiệm vụ. Tuyệt vời!',
      timestamp: '1 giờ trước'
    },
    {
      id: '19',
      username: 'tien*****',
      content: 'Cảm ơn TrangNapRobux, tôi đã nhận được 12.000 Robux chỉ trong vài phút.',
      timestamp: '1 giờ trước'
    },
    {
      id: '20',
      username: 'minh*****',
      content: 'Nạp 100k và nhận ngay 5.000 Robux. Web này rất uy tín!',
      timestamp: '2 giờ trước'
    },
    {
      id: '21',
      username: 'hoang*****',
      content: 'Web này quá uy tín, nạp 250k nhận ngay 12.500 Robux, nhanh chóng và dễ dàng.',
      timestamp: '2 giờ trước'
    },
    {
      id: '22',
      username: 'dung*****',
      content: 'Mình vừa nhận 20.000 Robux sau khi nạp 400k. Web rất uy tín.',
      timestamp: '2 giờ trước'
    },
    {
      id: '23',
      username: 'thao*****',
      content: 'Đã nhận 10.000 Robux, cảm ơn TrangNapRobux.Com rất nhiều!',
      timestamp: '2 giờ trước'
    },
    {
      id: '24',
      username: 'quoc*****',
      content: 'Nạp 1 triệu nhận 50.000 Robux, quá tuyệt vời! Robux về ngay lập tức.',
      timestamp: '2 giờ trước'
    },
    {
      id: '25',
      username: 'tien*****',
      content: 'Robux về rất nhanh, mình vừa nhận 5.000 Robux sau khi nạp 100k.',
      timestamp: '2 giờ trước'
    },
    {
      id: '26',
      username: 'ngoc*****',
      content: 'Cảm ơn vì đã giúp tôi nhận được 7.500 Robux sau khi hoàn thành nhiệm vụ!',
      timestamp: '3 giờ trước'
    },
    {
      id: '27',
      username: 'hieu*****',
      content: 'Nhận được 1.000 Robux miễn phí chỉ với một vài thao tác đơn giản. Rất hài lòng!',
      timestamp: '3 giờ trước'
    },
    {
      id: '28',
      username: 'minh*****',
      content: 'Vừa hoàn thành nhiệm vụ nhận 3.000 Robux, quá tuyệt vời!',
      timestamp: '3 giờ trước'
    },
    {
      id: '29',
      username: 'son*****',
      content: 'Web này tốt quá, nạp 300k nhận 15.000 Robux chỉ trong vài phút.',
      timestamp: '3 giờ trước'
    },
    {
      id: '30',
      username: 'hieu*****',
      content: 'Nạp 200k nhận 8.000 Robux, dịch vụ rất nhanh và đáng tin cậy.',
      timestamp: '3 giờ trước'
    },
    {
      id: '31',
      username: 'trang*****',
      content: 'Nhận ngay 6.000 Robux sau khi nạp 120k, rất đáng tin cậy!',
      timestamp: '3 giờ trước'
    },
    {
      id: '32',
      username: 'khanh*****',
      content: 'Web này nhanh và rất uy tín. Mình đã nhận được 40.000 Robux.',
      timestamp: '3 giờ trước'
    },
    {
      id: '33',
      username: 'lan*****',
      content: 'Nạp 500k nhận 25.000 Robux. Robux về rất nhanh!',
      timestamp: '4 giờ trước'
    },
    {
      id: '34',
      username: 'hien*****',
      content: 'Vừa hoàn thành nhiệm vụ nhận 4.000 Robux. Quá tuyệt vời!',
      timestamp: '4 giờ trước'
    },
    {
      id: '35',
      username: 'tu*****',
      content: 'Nhận được 10.000 Robux chỉ với 2 phút sau khi nạp tiền!',
      timestamp: '4 giờ trước'
    },
    {
      id: '36',
      username: 'minh*****',
      content: 'Nạp 200k nhận ngay 8.000 Robux. Mình rất hài lòng với dịch vụ.',
      timestamp: '4 giờ trước'
    },
    {
      id: '37',
      username: 'son*****',
      content: 'Vừa nhận 18.000 Robux từ việc tham gia nhiệm vụ, rất nhanh và tiện lợi!',
      timestamp: '4 giờ trước'
    },
    {
      id: '38',
      username: 'thao*****',
      content: 'Robux về rất nhanh sau khi nạp. Cảm ơn TrangNapRobux.Com!',
      timestamp: '4 giờ trước'
    },
]

export function Messages() {
  const [messages] = useState(SAMPLE_MESSAGES)

  return (
    <Card className='overflow-hidden'>
      <CardHeader className='p-0 mb-2'>
        <CardTitle className="w-full p-4 flex items-center gap-2 bg-sky-100">
          <MessageCircle className="h-5 w-5" />
          Tin nhắn từ người nạp
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          {messages.map(message => (
            <div key={message.id} className="mb-4 rounded-lg bg-muted p-3">
              <div className="font-medium">{message.username}</div>
              <div className="mt-1 text-sm">{message.content}</div>
              <div className="mt-1 text-xs text-muted-foreground">{message.timestamp}</div>
            </div>
          ))}
        </ScrollArea>
        <div className="mt-4 flex gap-2">
          <Input placeholder="Nhập tin nhắn..." />
          <Button className="bg-sky-100 text-black font-semibold hover:bg-sky-200">Gửi</Button>
        </div>
      </CardContent>
    </Card>
  )
}
