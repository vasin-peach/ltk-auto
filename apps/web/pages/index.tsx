import Image from 'next/image'
import AdvertiseSlider from 'src/components/AdvertiseSlider'
import BG from '../src/assets/images/bg.webp'
import BGCurve from '../src/assets/images/background/bg-curve.png'
import SectionService from 'src/components/Section/Service'
import SectionFamily from 'src/components/Section/Family'
import Background from 'src/components/Background/Background'
import blur from '../src/assets/images/background/blur.png'
import SectionLocation from 'src/components/Section/Location'
import SectionCars from 'src/components/Section/Car'
import { SectionCarSlide } from 'src/components/Section/CarSlide'
import SectionAdvertiseSlide from 'src/components/Section/AdvertiseSlide'

export default function Home() {
  return (
    <div className=" relative">
      {/* ----------------------------- Advertise Slide ---------------------------- */}
      <Background
        id="section-advertise-slide"
        className="gradient-brown-lg bg-brown-900 pt-[60px] lg:pt-0"
      >
        <SectionAdvertiseSlide />
      </Background>

      {/* ---------------------------------- Cars ---------------------------------- */}
      <Background id="section-cars" pattern={BG}>
        <SectionCars className="container relative mx-auto pt-5 lg:-top-5 lg:pt-0" />
      </Background>

      {/* -------------------------------- Car Slide ------------------------------- */}
      <Background id="section-car-slide">
        <SectionCarSlide />
      </Background>

      {/* --------------------------------- Service -------------------------------- */}
      <Background
        id="section-service"
        className="py-16 pb-20 lg:py-20 lg:pb-32"
        pattern={BG}
      >
        <div className="absolute top-0 bottom-0 right-0 left-0 opacity-30 lg:block lg:opacity-100">
          <Image
            src={BGCurve}
            alt="background"
            className="ml-auto object-contain"
          />
        </div>
        <SectionService className="container relative" />
      </Background>

      {/* --------------------------------- Family --------------------------------- */}
      <Background
        id="section-family"
        pattern={blur}
        className="bg-brown-900 py-16 pb-20 text-white lg:py-20 lg:pb-32"
      >
        <SectionFamily className="container mx-auto" />
      </Background>

      {/* -------------------------------- Location -------------------------------- */}
      <Background
        id="section-location"
        className="bg-white md:py-16 md:pb-20 lg:py-20 lg:pb-32"
        pattern={BG}
      >
        <SectionLocation className="md:container" />
      </Background>
    </div>
  )
}
