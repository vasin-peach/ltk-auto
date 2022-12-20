import Nav from 'src/components/Nav'

import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>
        <Nav />
      </div>
      <main>{children}</main>
      <div>
        {/* <hr /> */}
        Footer
      </div>
    </div>
  )
}
