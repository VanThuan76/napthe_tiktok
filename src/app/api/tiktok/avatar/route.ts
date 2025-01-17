import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'UserId là bắt buộc.' }, { status: 400 });
    }

    try {
        const response = await axios.get(`https://open.tiktokapis.com/v2/user/avatar`, {
            params: { user_id: userId },
            headers: {
                Authorization: `Bearer YOUR_ACCESS_TOKEN`,
            },
        });

        const avatarData = response.data?.data;
        return NextResponse.json(avatarData || {});
    } catch (error: any) {
        console.error('TikTok Avatar API error:', error.message);
        return NextResponse.json(
            { error: 'Lỗi khi gọi API TikTok Avatar.' },
            { status: 500 }
        );
    }
}
