import { Divider } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { AiOutlineCar } from 'react-icons/ai'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { RiDashboardFill } from 'react-icons/ri'
import { TfiLayoutSlider } from 'react-icons/tfi'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  /* --------------------------------- States --------------------------------- */
  const router = useRouter()
  const [drawerOpen, setDrawerOpen] = useState(true)
  const [activeRoute, setActiveRoute] = useState('')
  const menus = [
    {
      label: 'Dashboard',
      icon: <RiDashboardFill />,
      href: '/dashboard',
      divide: true,
    },
    {
      label: 'Member',
      icon: <HiOutlineUserGroup />,
      href: '/dashboard/member',
    },
    { label: 'Car', icon: <AiOutlineCar />, href: '/dashboard/car' },
    {
      label: 'Slider',
      icon: <TfiLayoutSlider />,
      href: '/dashboard/slider',
      divide: true,
    },
  ]

  /* --------------------------------- Methods -------------------------------- */
  const handleRouterReady = useCallback(() => {
    if (!router.isReady) return
    setActiveRoute(router.asPath)
  }, [router.isReady])

  const isRouteActive = (route: string) => {
    return activeRoute == route
  }

  /* --------------------------------- Watches -------------------------------- */
  useEffect(() => {
    handleRouterReady()
  }, [handleRouterReady])

  /* ---------------------------------- Doms ---------------------------------- */
  const Drawer = (
    <div className="drawer-wrapper h-full border-r-2 border-slate-200 bg-white shadow-xl">
      <div className="drawer-head"></div>
      <div className="drawer-menu grid gap-5 p-5 lg:pr-10">
        {menus.map((menu) => (
          <>
            <Link
              href={menu.href}
              className="menu flex items-center "
              key={`menu-${menu.label}`}
            >
              <span
                className={`text-xl transition-colors lg:mr-2 ${
                  isRouteActive(menu.href)
                    ? 'text-primary-500'
                    : 'text-neutral-500'
                }`}
              >
                {menu.icon}
              </span>
              <span
                className={`w-0 text-sm opacity-0 transition-colors lg:w-auto lg:opacity-100 ${
                  isRouteActive(menu.href)
                    ? 'font-bold text-primary-500'
                    : 'text-neutral-500'
                }`}
              >
                {menu.label}
              </span>
            </Link>
            {menu.divide && <Divider className="m-0" />}
          </>
        ))}
      </div>
    </div>
  )

  const Context = (
    <div className="context-wrapper container py-5">
      <div className="context-head ">
        <div className="text-2xl font-bold capitalize text-brown-500 border-b-4 mb-2 inline-block border-primary-500 pr-3">
          {router.asPath.split('/')[router.asPath.split('/').length - 1]}
        </div>
      </div>
      <div className="context-body">{children}</div>
    </div>
  )

  return (
    <div className="dashboard-layout h-[calc(100vh_-_108px)] min-h-[calc(100vh_-_108px)] bg-neutral-100">
      <div className="dashboard-wrapper flex h-full w-full">
        <div className="dashboard-drawer col-span-1">{Drawer}</div>
        <div className="dashboard-context col-span-4 w-full overflow-y-scroll">{Context}</div>
      </div>
    </div>
  )
}
