import Navbar from 'src/components/Navbar'

import { ReactNode } from 'react'
import Footer from 'src/components/Footer'
import Sidebar from 'src/components/Sidebar/Sidebar'
import Bottombar from 'src/components/Bottombar/Bottombar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <Bottombar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  )
}
