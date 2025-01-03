import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    try {
        const { username } = await request.json();

        if (!username) {
            return NextResponse.json({ error: 'Username là bắt buộc.' }, { status: 400 });
        }

        const response = await axios.post(
            'https://users.roblox.com/v1/usernames/users',
            { usernames: [username] }
        );

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error('Roblox API error:', error.message);
        return NextResponse.json(
            { error: 'Lỗi khi gọi API Roblox.' },
            { status: 500 }
        );
    }
}
