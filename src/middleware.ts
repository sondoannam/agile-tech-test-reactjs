/* eslint-disable no-console */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privatePaths = ['/profile'];
const authPaths = ['/sign-in'];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);
  const accessToken = request.cookies.get('accessToken')?.value;
  // Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  // Đăng nhập rồi thì không cho vào sign-in nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/profile', '/sign-in'],
};
