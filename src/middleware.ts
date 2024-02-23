import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// if someone has token he wil not be able to access the public path(/login, /signup)
// if someone is not logged in he should not be able to access the protected path (/profile)
export function middleware(request:NextRequest){
    const path =  request.nextUrl.pathname

    const isPublicPath = path === "/login" || path === "/signup"

    const token = request.cookies.get("token")?.value || ""

    // if path is public
    if (isPublicPath && token){
        return NextResponse.redirect(new URL('/profile', request.nextUrl))
    }

    // if path is not public
    if (!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}

export const config ={
    matcher:[
        '/',
        '/profile',
        '/profile/:path*',
        '/signup',
        '/login',
    ]
}


