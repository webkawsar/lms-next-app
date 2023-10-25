export { default } from "next-auth/middleware";

// import { NextResponse } from "next/server"
// export function middleware(request) {

//     console.log(request, 'request')

//   if (request.nextUrl.pathname.startsWith('/extra') && request?.nextauth?.token?.role !== 'admin') {
//     return NextResponse.rewrite(new URL('/denied', request.url))
//   }

//   if (request.nextUrl.pathname.startsWith('/dashboard')) {
//     return NextResponse.rewrite(new URL('/dashboard/user', request.url))
//   }

// }

export const config = { matcher: ["/dashboard", "/client"] };
