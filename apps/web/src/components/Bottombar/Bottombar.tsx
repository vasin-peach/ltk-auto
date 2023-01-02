import { useContext } from 'react'
import SidebarContext from 'src/context/SidebarContext'
import { CommonComponentProps } from 'src/types/props'
import {
  AiOutlineMenu,
  AiTwotoneCar,
  AiTwotoneHome,
  AiTwotoneStar,
} from 'react-icons/ai'
import Link from 'next/link'

export default function Bottombar(props: CommonComponentProps) {
  /* --------------------------------- States --------------------------------- */
  const { setActive } = useContext(SidebarContext)

  /* --------------------------------- Methods -------------------------------- */

  /* --------------------------------- Watches -------------------------------- */

  /* ---------------------------------- Doms ---------------------------------- */
  return (
    <div className={`bottombar-container ${props.className || ''}`} {...props}>
      <div className="bottombar-overlay fixed bottom-0 left-0 right-0 z-20 text-white">
        <div className="bottombar-wrapper grid grid-cols-4 border-t-2 border-brown-500 bg-brown-900 py-2 text-center text-xs">
          <Link href="/">
            <AiTwotoneHome className="mx-auto pb-2 text-3xl" />
            <span>หนักหลัก</span>
          </Link>
          <Link href="cars">
            <AiTwotoneCar className="mx-auto pb-2 text-3xl" />
            <span>ค้นหารถ</span>
          </Link>
          <Link href="/wishlist">
            <AiTwotoneStar className="mx-auto pb-2 text-3xl" />
            <span>รถที่บันทึก</span>
          </Link>
          <div className="cursor-pointer" onClick={() => setActive(true)}>
            <AiOutlineMenu className="mx-auto pb-2 text-3xl" />
            <span>เมนู</span>
          </div>
        </div>
      </div>
    </div>
  )
}
