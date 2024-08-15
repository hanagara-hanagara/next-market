import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: Request) {
    // const token = await request.headers.get('Authorization')?.split('')[1];
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImR1bW15QGdtYWlsLmNvbSIsImV4cCI6MTcyMzgyNjgyNn0.jnTYAETgd8zyc-ncnlNUPleL_xWvKfAK91H65S00IZg';

    if (!token) {
        return NextResponse.json({ message: 'トークンがありません' });
    }

    try {
        const secretKey = new TextEncoder().encode('next-market-app-book');
        const decodedJwt = await jwtVerify(token, secretKey);
        return NextResponse.next();
    } catch (err) {
        return NextResponse.json({ message: 'トークンが正しくありません、ログインし直してください' });
    }
}

export const config = {
    matcher: ['/api/item/create', '/api/item/update/:path*', '/api/item/delete/:path*'],
};
