import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import { Noto_Sans_Thai, Roboto } from '@next/font/google'
import Layout from './layout'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const notosans = Noto_Sans_Thai({
  variable: '--font-notosans',
  subsets: ['latin'],
})

const roboto = Roboto({
  weight: ['700'],
  variable: '--font-roboto',
  subsets: ['latin'],
  style: 'normal',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${notosans.variable} ${roboto.variable} font-sans`}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </main>
  )
}
