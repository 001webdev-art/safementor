import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    
    // Hardcoded password for pilot phase
    const VALID_PASSWORD = process.env.SITE_PASSWORD || 'safe2025';

    if (password === VALID_PASSWORD) {
      const response = NextResponse.json({ success: true });
      
      // Set cookie that expires in 30 days
      response.cookies.set('site-access', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
      
      return response;
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
