import Navbar from 'src/components/Navbar'

import { ReactNode } from 'react'
import Footer from 'src/components/Footer'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  )
}
