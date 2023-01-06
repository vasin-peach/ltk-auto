import { CommonComponentProps } from 'src/types/props'
import Image from 'next/image'
import Logo from 'src/assets/images/logo.png'
import { FcGoogle } from 'react-icons/fc'
import Background from 'src/components/Background/Background'
import BG from 'src/assets/images/bg.webp'
import { TextField } from '@mui/material'
import Link from 'next/link'
import SigninHead from './head'

export default function Signin(props: CommonComponentProps) {
  return (
    <>
      <SigninHead />
      <Background pattern={BG}>
        <div
          id="signin-page"
          className={`signin-page flex h-screen justify-center p-5 pt-20 ${
            props.className || ''
          }`}
          {...props}
        >
          <div
            id="signin-wrapper"
            className="grid h-fit rounded-lg border border-slate-200/50 shadow-2xl lg:grid-cols-2"
          >
            <form id="signin-form" className="bg-white p-10">
              <div id="form-title">
                <div className="text-3xl font-bold text-brown-700">Sign In</div>
                <div className="pt-2 text-sm text-neutral-600">
                  ยินดีต้อนรับ กรุณาใส่รายละเอียดการเข้าสู่ระบบด้านล่าง
                </div>
              </div>

              <div id="form-content" className="mt-10">
                <div>
                  <TextField
                    size="small"
                    required
                    label="Email"
                    placeholder="ใส่อีเมลล์ของคุณ"
                    className="w-full"
                    type="email"
                  />
                </div>
                <div className="mt-2">
                  <TextField
                    size="small"
                    required
                    label="Password"
                    placeholder="ใส่รหัสผ่านของคุณ"
                    className="w-full"
                    type="password"
                  />
                </div>
              </div>

              <div id="form-action" className="mt-10">
                <button
                  type="submit"
                  className="gradient-primary w-full rounded px-5 py-2 text-white"
                >
                  <span>เข้าสู่ระบบ</span>
                </button>
                <Link
                  href={`${process.env.NEXT_PUBLIC_API_URL}/auth/signin/google`}
                  className="mt-2 flex w-full items-center justify-center rounded border border-slate-300 px-5 py-2"
                >
                  <>
                    <FcGoogle className="mr-2 text-2xl" />
                    <span>เข้าสู่ระบบด้วย Google</span>
                  </>
                </Link>
              </div>
            </form>
            <div
              id="signin-wallpaper"
              className="gradient-brown hidden flex-col items-center justify-center rounded-r-lg p-10 text-center text-xl font-bold lg:flex"
            >
              <>
                <Image src={Logo} alt="logo" className="mx-auto block" />
              </>
            </div>
          </div>
        </div>
      </Background>
    </>
  )
}
