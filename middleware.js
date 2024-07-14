import { NextResponse } from 'next/server';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { parseDateString } from '@/utils';

const Middleware = (req) => {
  const NEXT_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

  if (!NEXT_TOKEN) {
    console.warn('NEXT_PUBLIC_ACCESS_TOKEN environment variable is not set');
    return NextResponse.next(); // Allow the request to proceed if the token is not set
  }

  const cookieData = req.cookies?.get(NEXT_TOKEN);
  const pathName = req.nextUrl.pathname;

  if (pathName.toLowerCase() === '/login') {
    if (cookieData && cookieData.value) {
      return NextResponse.redirect('http://localhost:3000');
    }
  }

  if (
    pathName.toLowerCase().includes('dashboardx') ||
    pathName.toLowerCase() === '/'
  ) {
    if (cookieData && cookieData.value) {
      try {
        const decoded = jwtDecode(cookieData.value);
        const beginningTime = moment(Date.now()).format('DD-MM-YYYY hh:mm:ss');
        const endTime = moment.unix(decoded.exp).format('DD-MM-YYYY hh:mm:ss');
        const parsedBeginningTime = parseDateString(beginningTime);
        const parsedEndTime = parseDateString(endTime);

        if (decoded && parsedBeginningTime > parsedEndTime) {
          if (req.cookies.has(NEXT_TOKEN)) {
            req.cookies.delete(NEXT_TOKEN);
          }
          return NextResponse.redirect('http://localhost:3000/login');
        } else {
          return NextResponse.next();
        }
      } catch (error) {
        console.error('Error decoding JWT:', error);
        return NextResponse.redirect('http://localhost:3000/login');
      }
    } else {
      return NextResponse.redirect('http://localhost:3000/login');
    }
  }

  return NextResponse.next();
};

export default Middleware;

export const config = {
  matcher: [
    '/dashboardx/:path*',
    '/',
    '/login',
  ],
};
