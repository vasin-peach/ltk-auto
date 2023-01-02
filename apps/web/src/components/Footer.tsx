import Background from './Background/Background'
import Logo from 'src/assets/images/logo.png'
import Image from 'next/image'
import line from 'src/assets/images/icons/social/line.png'
import {
  TiSocialFacebookCircular,
  TiSocialInstagramCircular,
  TiSocialYoutubeCircular,
  TiPhone,
  TiLocation,
} from 'react-icons/ti'
import Link from 'next/link'

export default function Footer({
  className,
  style,
}: {
  className?: JSX.IntrinsicElements['div']['className']
  style?: JSX.IntrinsicElements['div']['style']
}) {
  // Social
  function FooterSocial({
    className,
  }: {
    className?: JSX.IntrinsicElements['div']['className']
  }) {
    return (
      <div
        id="footer-info-social"
        className={`footer-info-container mt-5 flex gap-5 md:mt-10 md:grid md:grid-cols-4 ${className}`}
      >
        <a
          href="https://www.facebook.com/LTKAUTOIMPORT/"
          target="_blank"
          rel="noreferrer"
        >
          <TiSocialFacebookCircular size={50} />
        </a>
        <a
          href="https://www.instagram.com/ltkautoimport_official/"
          target="_blank"
          rel="noreferrer"
        >
          <TiSocialInstagramCircular size={50} />
        </a>
        <a
          href="https://www.youtube.com/@ltkautoimport1752"
          target="_blank"
          rel="noreferrer"
        >
          <TiSocialYoutubeCircular size={50} />
        </a>
        <a
          href="https://page.line.me/pdl2538k"
          target="_blank"
          rel="noreferrer"
          style={{ width: '50px' }}
          className="relative"
        >
          <Image src={line} alt="footer-info-social-line-icon" fill />
        </a>
      </div>
    )
  }

  // Brand
  function FooterBrand({
    className,
  }: {
    className?: JSX.IntrinsicElements['div']['className']
  }) {
    return (
      <div
        id="footer-brand"
        className={`footer-brand-container border-b-2 border-primary-300 pb-3 ${className}`}
      >
        <Image src={Logo} alt="logo" height="60" className="mx-auto" />
        <div className="mt-2 text-center font-roboto text-lg font-bold text-primary-500">
          LTK AUTO IMPORT
        </div>
      </div>
    )
  }

  // Info
  function FooterInfo({
    className,
  }: {
    className?: JSX.IntrinsicElements['div']['className']
  }) {
    return (
      <div id="footer-info" className={`footer-info-container ${className}`}>
        <FooterSocial />
        {/* Tel */}
        <div
          id="footer-info-tel"
          className="mt-5 grid grid-cols-4 gap-x-2 md:mt-10"
        >
          <div className="hidden items-center md:flex">
            <TiPhone fontSize={30} />
          </div>
          <div className="block text-lg font-bold md:hidden">ติดต่อเรา</div>
          <div className="col-span-4 flex flex-col text-xs text-neutral-400 md:col-span-3 md:text-sm ">
            <span>02 553 2888</span>
            <span>062 323 2932</span>
          </div>
        </div>

        {/* Location */}
        <div
          id="footer-info-location"
          className="mt-3 grid grid-cols-4 gap-x-5"
        >
          <div className="hidden items-center md:flex">
            <TiLocation fontSize={30} />
          </div>
          <div className="block text-lg font-bold md:hidden">ที่อยู่</div>
          <div className="col-span-4 flex flex-col text-xs text-neutral-400 md:col-span-3 md:text-sm">
            บริษัท แอลทีเค ออโต้ อิมพอร์ต จำกัด 648 ถนนประเสริฐมนูกิจ
            แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพมหานคร 10230
          </div>
        </div>
      </div>
    )
  }

  // Service
  function FooterService({
    className,
  }: {
    className?: JSX.IntrinsicElements['div']['className']
  }) {
    return (
      <div
        className={`footer-service-container mt-3 md:mt-10 ${className}`}
        id="footer-service"
      >
        <div className="flex items-center text-lg font-bold md:h-[50px]">
          บริการของเรา
        </div>
        <div className="grid gap-1  text-sm text-neutral-400 md:mt-10 md:gap-3">
          <Link href="/services/accessories">ตกแต่งรถ</Link>
          <Link href="/promotion">โปรโมนชั่น</Link>
          <Link href="/services/parts">ชิ้นส่วนรถ</Link>
          <Link href="/calculator/loan">คำนวนสินเชื่อรถ</Link>
        </div>
      </div>
    )
  }

  // Shortcut
  function FooterShortcut({
    className,
  }: {
    className?: JSX.IntrinsicElements['div']['className']
  }) {
    return (
      <div
        className={`footer-shortcut-container mt-3 md:mt-10 ${className}`}
        id="footer-shortcut"
      >
        <div className="flex items-center text-lg font-bold md:h-[50px]">
          ทางลัด
        </div>
        <div className="grid gap-1 text-sm text-neutral-400 md:mt-10 md:gap-3">
          <Link href="/cars">ค้นหารถ</Link>
          <Link href="/#section-service">บริการ</Link>
          <Link href="/about">เกี่ยวกับเรา</Link>
          <Link href="/#section-location">ติดต่อเรา</Link>
          <Link href="/dashboard">แดชบอร์ด</Link>
        </div>
      </div>
    )
  }

  function FooterCopyRight({
    className,
  }: {
    className?: JSX.IntrinsicElements['div']['className']
  }) {
    return (
      <div
        id="footer-copyright"
        className={`footer-copyright-container mt-10 flex justify-between border-t-2 border-neutral-800 py-5 text-xs text-neutral-500 md:text-sm ${className}`}
      >
        <div className="">©LTK Auto Import - All rights reserved.</div>
        <div className="hidden md:flex">
          <div>
            <Link href="/policy/privacy">นโยบายความเป็นส่วนตัว</Link>
          </div>
          <div className="px-2">|</div>
          <div>
            <Link href="/policy/terms-of-use">เงื่อนไขการใช้งาน</Link>
          </div>
          <div className="px-2">|</div>
          <div>
            <Link href="/policy/cookie">นโยบายคุกกี้</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`footer-container ${className}`}
      style={style}
      id="footer-container"
    >
      <Background className="bg-black-900">
        <div className="footer-wrapper container grid grid-cols-3 gap-x-32 pt-5 text-neutral-200 md:pt-10">
          <FooterBrand className="col-span-3" />
          <FooterInfo className="col-span-3 md:col-span-1" />
          <FooterService className="col-span-3 md:col-span-1" />
          <FooterShortcut className="col-span-3 md:col-span-1" />
          <FooterCopyRight className="col-span-3" />
        </div>
        <div></div>
      </Background>
    </div>
  )
}
