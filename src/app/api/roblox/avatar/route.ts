import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'UserId là bắt buộc.' }, { status: 400 });
    }

    try {
        const response = await axios.get('https://thumbnails.roblox.com/v1/users/avatar-headshot', {
            params: {
                userIds: userId,
                size: '150x150',
                format: 'Png',
                isCircular: true,
            },
        });

        const avatarData = response.data?.data?.[0];
        return NextResponse.json(avatarData || {});
    } catch (error: any) {
        console.error('Roblox Avatar API error:', error.message);
        return NextResponse.json(
            { error: 'Lỗi khi gọi API Roblox Avatar.' },
            { status: 500 }
        );
    }
}
