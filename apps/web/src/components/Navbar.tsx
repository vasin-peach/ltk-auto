import Link from 'next/link'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import Logo from 'src/assets/images/logo.png'
import { useRouter } from 'next/router'
import { TiStarFullOutline } from 'react-icons/ti'
import { FaUserCircle } from 'react-icons/fa'

export default function Nav() {
  const router = useRouter()
  return (
    <div
      className="nav-container absolute left-0 right-0 z-10 text-slate-100 lg:relative lg:pt-0 lg:shadow-sm lg:shadow-brown-300"
      id="nav"
    >
      <div className="nav-primary z-20 mx-auto py-3 lg:bg-brown-900 lg:shadow-lg">
        <div className="container mx-auto flex justify-between ">
          <Link href="/" className="hover:opacity-100">
            <div className="nav-brand flex items-center">
              <div className="mr-5">
                <Image src={Logo} alt="logo" width={30} />
              </div>
              <div className="hidden text-lg font-bold text-primary-500 lg:block">
                LTK AUTO IMPORT
              </div>
            </div>
          </Link>
          <div className="nav-action flex items-center text-sm">
            <Link href="/wishlist">
              <div className="flex h-[35px] items-center rounded-xl bg-neutral-500/50 px-5 py-1">
                <TiStarFullOutline />
              </div>
            </Link>
            <Link href="/account/login">
              <div className="ml-3 flex h-[35px] items-center rounded-xl bg-neutral-500/50 px-5 py-1">
                <button>ลงทะเบียน / เข้าสู่ระบบ</button>
                <FaUserCircle className="ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="nav-secondary z-10 mx-auto hidden bg-brown-600 py-3 text-neutral-300 lg:block">
        <div className="container mx-auto flex justify-between">
          <div className="nav-menu grid grid-cols-5 gap-7">
            <Link
              href="/"
              className={`${
                ['/', '/landing'].includes(router.asPath) && 'text-white'
              }`}
            >
              หน้าหลัก
            </Link>
            <Link
              href="/cars"
              className={`${router.asPath === '/cars' ? 'text-white' : ''}`}
            >
              ค้นหารถ
            </Link>
            <Link
              href="/service"
              className={`${router.asPath === '/service' ? 'text-white' : ''}`}
            >
              บริการ
            </Link>
            <Link
              href="/finance/loan"
              className={`${router.asPath === '/loan' ? 'text-white' : ''}`}
            >
              สินเชื่อรถ
            </Link>
            <Link
              href="/contact"
              className={`${router.asPath === '/contact' ? 'text-white' : ''}`}
            >
              ติดต่อเรา
            </Link>
          </div>
          <div className="nav-action flex flex-row">
            <button>Start</button>
            <div className="nav-info">
              <span>โทร 092-464-4891</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
