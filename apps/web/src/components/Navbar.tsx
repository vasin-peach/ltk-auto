import Link from 'next/link'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from 'src/assets/images/logo.png'
import { useRouter } from 'next/router'
import { TiStarFullOutline } from 'react-icons/ti'
import { FaUserCircle } from 'react-icons/fa'
import { AiTwotonePhone } from 'react-icons/ai'
import { AuthContext } from 'src/context/AuthContext'
import { Menu, Skeleton } from '@mui/material'
import SidebarContext from 'src/context/SidebarContext'
import { RoleEnum } from '@libs/constant'

export default function Nav() {
  /* --------------------------------- States --------------------------------- */
  const { user, loading, signout } = useContext(AuthContext)
  const [activeRoute, setActiveRoute] = useState('')
  const { setActive } = useContext(SidebarContext)
  const router = useRouter()

  // profile
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const openProfile = Boolean(anchorEl)

  /* --------------------------------- Methods -------------------------------- */
  const handleOpenProfile = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseProfile = () => {
    setAnchorEl(null)
  }
  const handleRouterReady = useCallback(() => {
    if (!router.isReady) return
    setActiveRoute(router.pathname)
  }, [router.isReady, router.pathname])

  const isRouteActive = (route: string) => {
    return activeRoute.includes(route)
  }

  /* --------------------------------- Watches -------------------------------- */
  useEffect(() => {
    handleRouterReady()
  }, [handleRouterReady])

  /* ---------------------------------- Doms ---------------------------------- */
  return (
    <div
      className="nav-container z-10 text-slate-100 lg:relative lg:pt-0 lg:shadow-sm lg:shadow-brown-300"
      id="nav"
    >
      <div className="nav-primary z-20 mx-auto bg-brown-900 py-3 lg:shadow-lg">
        <div className="container mx-auto flex justify-between ">
          <Link href="/" className="hover:opacity-100">
            <div className="nav-brand flex items-center">
              <div className="mr-5">
                <Image src={Logo} alt="logo" width={30} placeholder="blur" />
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
            {user.id && !loading ? (
              <div className="relative">
                <button
                  id="profile-expand-desktop"
                  type="button"
                  className="ml-3 hidden h-[35px] min-w-[100px] cursor-pointer items-center rounded-xl bg-neutral-500/50 px-5 py-1 lg:flex"
                  onClick={handleOpenProfile}
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt="user-profile-name"
                      className="mr-2 rounded-full p-[2px]"
                      height={25}
                      width={25}
                    />
                  ) : (
                    <FaUserCircle className="mr-2" />
                  )}

                  {user.name}
                </button>
                <button
                  id="profile-expand-mobile"
                  type="button"
                  className="ml-3 flex h-[35px] min-w-[100px] cursor-pointer items-center rounded-xl bg-neutral-500/50 px-5 py-1 lg:hidden"
                  onClick={() => setActive(true)}
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt="user-profile-name"
                      className="mr-2 rounded-full p-[2px]"
                      height={25}
                      width={25}
                    />
                  ) : (
                    <FaUserCircle className="mr-2" />
                  )}

                  {user.name}
                </button>
                <Menu
                  id="profile-expand-menu"
                  open={openProfile}
                  anchorEl={anchorEl}
                  onClose={handleCloseProfile}
                  className="mt-2"
                  MenuListProps={{
                    'aria-labelledby': 'profile-expand',
                  }}
                >
                  <div className="grid w-full gap-5 px-5 text-sm">
                    <Link
                      href=""
                      onClick={() => {
                        signout(), handleCloseProfile()
                      }}
                    >
                      ออกจากระบบ
                    </Link>
                  </div>
                </Menu>
              </div>
            ) : (
              <Link href="/signin">
                <div className="ml-3 flex h-[35px] items-center rounded-xl bg-neutral-500/50 px-5 py-1">
                  <FaUserCircle className="mr-2" />
                  <button className="block truncate">
                    ลงทะเบียน / เข้าสู่ระบบ
                  </button>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="nav-secondary z-10 mx-auto hidden bg-brown-600 py-3 text-neutral-300 lg:block">
        <div className="container mx-auto flex justify-between">
          <div className="nav-menu grid grid-cols-6 gap-7">
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
              className={isRouteActive('cars') ? 'text-white' : ''}
            >
              ค้นหารถ
            </Link>
            <Link
              href="/services"
              className={isRouteActive('services') ? 'text-white' : ''}
            >
              บริการ
            </Link>
            <Link
              href="/calculator/loan"
              className={isRouteActive('loan') ? 'text-white' : ''}
            >
              สินเชื่อรถ
            </Link>
            <Link
              href="/contact"
              className={isRouteActive('contact') ? 'text-white' : ''}
            >
              ติดต่อเรา
            </Link>
            {user.role >= RoleEnum.MAINTAINER && (
              <Link
                href="/dashboard"
                className={isRouteActive('dashboard') ? 'text-white' : ''}
              >
                แดชบอร์ด
              </Link>
            )}
          </div>
          <div className="nav-action flex items-center text-sm text-neutral-400">
            <AiTwotonePhone />
            <div className="ml-2 truncate">02 553 2888 | 062 323 2932</div>
          </div>
        </div>
      </div>
    </div>
  )
}
