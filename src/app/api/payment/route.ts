import { NextResponse } from 'next/server';
import axios from 'axios';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import md5 from 'md5';

const PARTNER_KEY = '4a372bac9340a2a66408bf6c34138ced';
const PARTNER_ID = '37070236140';

const MAX_ATTEMPTS = 3;
const TIMEOUT = 300000;

function recordChargeAttempt(ip: string) {
    const file = 'charge_attempts.json';
    const attempts = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {};

    if (!attempts[ip]) {
        attempts[ip] = { count: 0, last_time: 0 };
    }

    attempts[ip].count++;
    attempts[ip].last_time = Date.now();

    writeFileSync(file, JSON.stringify(attempts));
}

function canCharge(ip: string, maxAttempts = MAX_ATTEMPTS, timeout = TIMEOUT) {
    const file = 'charge_attempts.json';
    if (!existsSync(file)) return true;

    const attempts = JSON.parse(readFileSync(file, 'utf8'));
    if (!attempts[ip]) return true;

    const timeDiff = Date.now() - attempts[ip].last_time;
    if (attempts[ip].count >= maxAttempts && timeDiff < timeout) {
        return false;
    }

    if (timeDiff >= timeout) {
        attempts[ip].count = 0;
        writeFileSync(file, JSON.stringify(attempts));
    }

    return true;
}

export async function POST(request: Request) {
    const forwardedFor = request.headers.get('x-forwarded-for') || '';
    const ip = forwardedFor.split(',')[0];

    if (!canCharge(ip)) {
        return NextResponse.json({
            status: '1',
            msg: 'Bạn đã nạp thẻ tối đa 3 lần. Vui lòng thử lại sau 5 phút',
            type: 'error',
        });
    }

    const body = await request.json();
    const { loaithe, mathe, seri, menhgia, idgame } = body;

    if (!idgame) {
        return NextResponse.json({
            status: '1',
            msg: 'Vui lòng điền Device ID hoặc Link Facebook',
            type: 'error',
        });
    }

    if (!loaithe) {
        return NextResponse.json({
            status: '1',
            msg: 'Vui lòng chọn loại thẻ',
            type: 'error',
        });
    }

    if (!menhgia) {
        return NextResponse.json({
            status: '1',
            msg: 'Vui lòng chọn mệnh giá',
            type: 'error',
        });
    }

    if (!mathe) {
        return NextResponse.json({
            status: '1',
            msg: 'Vui lòng điền mã thẻ',
            type: 'error',
        });
    }

    if (!seri) {
        return NextResponse.json({
            status: '1',
            msg: 'Vui lòng điền số seri',
            type: 'error',
        });
    }

    try {
        const requestId = `NAPSPINGIARE-${Math.floor(Math.random() * 999000 + 100009)}`;
        const url = `https://doithet1s.vn/charging?partner_id=${PARTNER_ID}&telco=${loaithe.toUpperCase()}&code=${mathe}&serial=${seri}&amount=${menhgia}&request_id=${requestId}&command=charging&signature=${md5(PARTNER_KEY + mathe + seri)}`;

        console.log("URL: ", url);

        const chargeResponse = await axios.get(url);

        const result = chargeResponse.data;

        if (result.status !== '99') {
            recordChargeAttempt(ip);
            return NextResponse.json({
                status: '1',
                msg: result.message,
                type: 'error',
            });
        } else if (result.status === '99') {
            recordChargeAttempt(ip);
            return NextResponse.json({
                status: '2',
                msg: 'Nạp thẻ thành công. Vui lòng chờ hệ thống xử lí.',
                type: 'success',
            });
        }
    } catch (error: any) {
        console.error('Error during charging request:', error);
        return NextResponse.json({
            status: '1',
            msg: 'Có lỗi xảy ra, vui lòng thử lại',
            type: 'error',
        });
    }
}
