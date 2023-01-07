import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import axios from 'axios'

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('access_token')
  // // check sessionToken
  // let accessToken = req.cookies.get('accessToken')
  // if (!accessToken) {
  //   try {
  //     const resp = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/auth/access-token`,
  //     )

  //     accessToken = resp.data.accessToken
  //   } catch (e) {}
  // }

  // if (accessToken) {
  //   axios.defaults.headers.common = { Authorization: `bearer ${accessToken}` }
  //   req.cookies.set('accessToken', accessToken)
  // }

  // console.log(req.url)

  // console.log(accessToken)
  // console.log(req.cookies.get('session'))
  // console.log('hihi')
  NextResponse.next()
  // // Basic Auth example taken from https://github.com/vercel/examples/tree/main/edge-functions/basic-auth-password
  // const basicAuth = req.headers.get('authorization')
  // const url = req.nextUrl

  // if (basicAuth) {
  //   const authValue = basicAuth.split(' ')[1]
  //   const [user, pwd] = atob(authValue).split(':')

  //   if (user === 'username' && pwd === 'password') {
  //     return NextResponse.next()
  //   }
  // }
  // url.pathname = '/api/basicauth'

  // return NextResponse.rewrite(url)
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|favicon|site).*)',
}
