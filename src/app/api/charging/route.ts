import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const txtBody = await request.text();
    const jsonBody = JSON.parse(txtBody);

    try {
        const fs = require('fs');
        const logData = `[${new Date().toISOString()}] ${txtBody}\n`;

        fs.appendFileSync('log.txt', logData);
    } catch (error) {
        console.error("Error logging data", error);
    }

    if (jsonBody.callback_sign) {
        const partner_key = '1902ab2fb74c19ce6e0820d6aa590a35';

        const callback_sign = md5(`${partner_key}${jsonBody.code}${jsonBody.serial}`);

        if (jsonBody.callback_sign === callback_sign) {
            const getdata = {
                status: jsonBody.status,
                message: jsonBody.message,
                request_id: jsonBody.request_id,
                trans_id: jsonBody.trans_id,
                declared_value: jsonBody.declared_value,
                value: jsonBody.value,
                amount: jsonBody.amount,
                code: jsonBody.code,
                serial: jsonBody.serial,
                telco: jsonBody.telco
            };

            return NextResponse.json(getdata, { status: 200 });
        } else {
            return NextResponse.json({ error: 'Invalid callback sign' }, { status: 400 });
        }
    }

    return NextResponse.json({ error: 'Missing callback_sign' }, { status: 400 });
}

function md5(input: string): string {
    const crypto = require('crypto');
    return crypto.createHash('md5').update(input).digest('hex');
}
