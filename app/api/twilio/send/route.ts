import { NextResponse } from 'next/server';
import twilio from 'twilio';

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function POST(req: Request) {
    try {
        const { phoneNumber } = await req.json();

        if (!phoneNumber) {
            return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
        }

        // Demo code as requested
        const code = "310200";
        const message = `Safementor are questing you to confirm the: ${code}`;

        if (!accountSid || !authToken || !fromPhoneNumber) {
            console.error("Missing Twilio credentials");
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        const response = await client.messages.create({
            body: message,
            from: fromPhoneNumber,
            to: "+18777804236", // Hardcoded for testing/demo/verified caller ID restrictions
        });

        return NextResponse.json({ success: true, sid: response.sid });

    } catch (error: any) {
        console.error('Error sending SMS:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to send SMS' },
            { status: 500 }
        );
    }
}
