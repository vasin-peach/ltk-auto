import Head from 'next/head'
import Image from 'next/image'
import AdvertiseSlider from 'src/components/AdvertiseSlider'
import CarSearchMini from 'src/components/Car/SearchMini'
import PreviewSlider from 'src/components/PreviewSlider'
import BG from '../src/assets/images/bg.webp'
import BGCurve from '../src/assets/images/bg-curve.svg'
import SectionService from 'src/components/Section/Service'
import SectionFamily from 'src/components/Section/Family'
import Background from 'src/components/Background/Background'
import blur from '../src/assets/images/background/blur.png'
import SectionLocation from 'src/components/Section/Location'

export default function Home() {
  return (
    <div className=" relative">
      <AdvertiseSlider />
      <CarSearchMini />
      <PreviewSlider />
      <div className="relative">
        <div className="background overflow-hidden">
          <div className="absolute top-0 bottom-0 right-0 left-0">
            <Image
              src={BG}
              fill
              alt="background"
              style={{ objectFit: 'cover' }}
              placeholder="blur"
            />
          </div>
          <div className=" absolute top-0 bottom-0 right-0 left-0 opacity-30 lg:block lg:opacity-100">
            <Image
              src={BGCurve}
              alt="background"
              className="ml-auto object-contain"
            />
          </div>
        </div>

        <div className="container relative z-10 mx-auto pt-10 pb-20 text-center lg:pt-24 lg:pb-32">
          <div className="text-xl font-bold text-brown-900 lg:text-3xl">
            ซื้อรถและรับบริการระดับพรีเมี่ยม
          </div>
          <div className="text-xl font-bold text-primary-500 lg:mt-5 lg:text-5xl">
            เชื่อใจ LTK AUTO
          </div>
          <div className="mx-auto mt-5 grid grid-cols-3 text-center text-sm lg:mt-10 lg:w-2/3 lg:text-base">
            {[1, 2, 3].map(() => (
              <div className="flex justify-center">
                <div className="text-primary-500">▇</div>
                <div className="ml-2 font-light text-neutral-500">
                  ชื่อมั่นได้ 100%
                </div>
              </div>
            ))}
          </div>

          <SectionService className="mt-5 lg:mt-10" />
        </div>
      </div>
      <Background
        pattern={blur}
        className="bg-brown-900 py-16 pb-20 text-white lg:py-20 lg:pb-32"
      >
        <SectionFamily className="container mx-auto" />
      </Background>
      <Background
        className="bg-white md:py-16 md:pb-20 lg:py-20 lg:pb-32"
        pattern={BG}
      >
        <SectionLocation className="md:container" />
      </Background>
    </div>
  )
}
