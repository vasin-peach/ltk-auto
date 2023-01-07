import { useContext, useEffect, useState } from 'react'
import SidebarContext from 'src/context/SidebarContext'
import { CommonComponentProps } from 'src/types/props'
import avatar from 'src/assets/images/brands/benz.png'
import { FiMoreHorizontal } from 'react-icons/fi'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthContext } from 'src/context/AuthContext'
import { FaUserCircle } from 'react-icons/fa'
import { AiFillCloseCircle } from 'react-icons/ai'

export default function Sidebar(props: CommonComponentProps) {
  /* --------------------------------- States --------------------------------- */
  const { signout, user } = useContext(AuthContext)
  const { active, setActive, swipeListen, removeSwipeListen } =
    useContext(SidebarContext)
  const router = useRouter()

  /* --------------------------------- Method --------------------------------- */

  /* --------------------------------- Watches -------------------------------- */
  useEffect(() => {
    // on-mounted
    swipeListen()

    // un-mounted
    return () => {
      removeSwipeListen()
    }
  }, [router])

  useEffect(() => {
    setActive(false)
  }, [router.asPath])

  /* ---------------------------------- Doms ---------------------------------- */
  const SidebarHeader = () => {
    return (
      <div className="px-7">
        <AiFillCloseCircle
          className="ml-auto translate-y-4 translate-x-2 cursor-pointer text-2xl text-slate-100 shadow-xl"
          onClick={() => setActive(false)}
        />
        <div className="sidebar-header rounded-xl bg-gradient-to-tr from-primary-500 to-primary-400 p-5">
          {user && user.id ? (
            <>
              <div className="header-avatar flex items-center">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt="avatar-image"
                    className="rounded-full bg-black-900 object-cover"
                    width={50}
                    height={50}
                  />
                ) : (
                  <FaUserCircle className="mr-2 text-[50px]" />
                )}

                <div className="flex w-full items-center justify-between">
                  <div className="ml-4 max-w-[100%] truncate text-xl font-bold text-black-900">
                    {user.name}
                  </div>
                </div>
              </div>

              <div className="header-avatar-info mt-5 text-black-900">
                <div className="mt-5 flex items-center">
                  <span className="mr-5 underline">รถที่บันทึกไว้ </span>
                  <span className="font-bold">2</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link href="/signin" onClick={() => setActive(false)}>
                <div className="flex items-center rounded-xl">
                  <button className="mx-auto block truncate">
                    ลงทะเบียน / เข้าสู่ระบบ
                  </button>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    )
  }

  const SidebarContent = () => {
    return (
      <div className="px-7">
        <div className="text-lg font-bold text-neutral-300">เมนู</div>
        <div className="sidebar-content mt-5 grid grid-cols-1 gap-5 rounded-xl  text-neutral-500">
          <Link
            href="/"
            className={`rounded-lg border border-neutral-600 px-4 py-3 ${
              ['/', '/landing', ''].includes(router.asPath)
                ? 'bg-slate-200 text-black-900'
                : ''
            }`}
          >
            หน้าหลัก
          </Link>
          <Link
            href="/cars"
            className={`rounded-lg border border-neutral-600 px-4 py-3 ${
              router.asPath === '/cars' ? 'bg-slate-200 text-black-900' : ''
            }`}
          >
            ค้นหารถ
          </Link>
          <Link
            href="/services"
            className={`rounded-lg border border-neutral-600 px-4 py-3 ${
              router.asPath === '/services' ? 'bg-slate-200 text-black-900' : ''
            }`}
          >
            บริการ
          </Link>
          <Link
            href="/calculator/loan"
            className={`text-bl rounded-lg border border-neutral-600 px-4 py-3 ${
              router.asPath === '/loan' ? 'bg-slate-200 text-black-900' : ''
            }`}
          >
            สินเชื่อรถ
          </Link>
          <Link
            href="/contact"
            className={`rounded-lg border border-neutral-600 px-4 py-3 ${
              router.asPath === '/contact' ? 'bg-slate-200 text-black-900' : ''
            }`}
          >
            ติดต่อเรา
          </Link>
          <div
            className="rounded-lg border  border-red-300/50 px-4 py-3 text-red-300/50"
            onClick={() => {
              signout(), setActive(false)
            }}
          >
            ออกจากระบบ
          </div>
        </div>
      </div>
    )
  }

  const SidebarFooter = () => {
    return (
      <div className="px-7">
        <div className="sidebar-footer mt-5 rounded-xl"></div>
      </div>
    )
  }

  return (
    <div
      className={`sidebar-container relative z-50 ${props.className || ''}`}
      {...props}
    >
      <div className={`sidebar-overlay text-white ${active ? 'active' : ''}`}>
        <div className="sidebar-wrapper h-full bg-brown-900 py-7">
          <SidebarHeader />
          <div className=" my-7 border-b border-neutral-700" />
          <SidebarContent />
          <div className=" my-7 border-b border-neutral-700" />
          <SidebarFooter />
        </div>
      </div>
    </div>
  )
}
