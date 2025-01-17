import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    try {
        const { username } = await request.json();

        if (!username) {
            return NextResponse.json({ error: 'Username là bắt buộc.' }, { status: 400 });
        }

        const response = await axios.post(
            'https://open.tiktokapis.com/v2/user/profile',
            { username },
            {
                headers: {
                    Authorization: `YmjxqBiX3nxLP3tB3FWao9Nih0Sip7cD`,
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('TikTok API error:', error.message);
        return NextResponse.json(
            { error: 'Lỗi khi gọi API TikTok.' },
            { status: 500 }
        );
    }
}
