import 'src/styles/globals.css'
import 'src/styles/sidebar.css'
import type { AppProps } from 'next/app'
import { Noto_Sans_Thai, Roboto } from '@next/font/google'
import Layout from './layout'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { SidebarProvider } from 'src/context/SidebarContext'
import DefaultHead from './head'
import { createTheme, ThemeProvider } from '@mui/material/styles'

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

const theme = createTheme({
  palette: {
    primary: {
      main: '#F2B33D',
    },
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${notosans.variable} ${roboto.variable}`}>
      <ThemeProvider theme={theme}>
        <SidebarProvider>
          <Layout>
            <DefaultHead />
            <Component {...pageProps} />
          </Layout>
        </SidebarProvider>
      </ThemeProvider>
    </main>
  )
}
