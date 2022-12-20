import Link from 'next/link'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import Logo from 'src/assets/images/logo.png'

export default function Nav() {
  return (
    <div
      className="nav-container relative z-10 text-slate-100  shadow-sm shadow-brown-300"
      id="nav"
    >
      <div className="nav-primary z-20 mx-auto bg-brown-900 py-3 shadow-lg">
        <div className="container mx-auto flex justify-between ">
          <div className="nav-brand flex items-center">
            <div className="mr-5">
              <Image src={Logo} alt="logo" width={30} />
            </div>
            <div className="text-lg font-bold text-primary-500">
              LTK AUTO IMPORT
            </div>
          </div>
          <div className="nav-action flex items-center">
            <button>Start</button>
            <button>ลงทะเบียน / เข้าสู่ระบบ</button>
          </div>
        </div>
      </div>
      <div className="nav-secondary z-10 mx-auto bg-brown-600 py-3 text-neutral-300">
        <div className="container mx-auto flex justify-between">
          <div className="nav-menu grid grid-cols-4 gap-5">
            <Link href="/">หน้าหลัก</Link>
            <Link href="/cars">ค้นหารถ</Link>
            <Link href="/service">บริการ</Link>
            <Link href="/contact">ติดต่อเรา</Link>
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
