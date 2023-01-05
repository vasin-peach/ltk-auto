import { useRouter } from 'next/router'
import { CommonComponentProps } from 'src/types/props'
import CarHead from './head'
import Image from 'next/image'
// import 'swiper/css/free-mode'
// import 'swiper/css/thumbs'

import { default as CarCard } from 'src/components/Car/Car'
import Car1 from 'src/assets/images/car1.png'
import Car2 from 'src/assets/images/car2.png'
import Car3 from 'src/assets/images/car3.png'
import Car4 from 'src/assets/images/car4.png'
import line from 'src/assets/images/icons/social/line.png'
import BG from 'src/assets/images/bg.webp'
import advertise01 from 'src/assets/images/advertis/01.jpeg'
import advertise02 from 'src/assets/images/advertis/02.jpg'
import advertise03 from 'src/assets/images/advertis/03.jpg'
import advertise04 from 'src/assets/images/advertis/04.jpg'
import advertise05 from 'src/assets/images/advertis/05.jpg'
import advertise06 from 'src/assets/images/advertis/06.jpg'
import {
  TiBeaker,
  TiChartLine,
  TiPhone,
  TiStarburst,
  TiStarOutline,
} from 'react-icons/ti'
import { FiInfo } from 'react-icons/fi'
import Background from 'src/components/Background/Background'
import { Swiper, SwiperSlide } from 'swiper/react'
import swiper, { FreeMode, Navigation, Pagination, Thumbs } from 'swiper'
import { useState } from 'react'

export default function Car(props: CommonComponentProps) {
  const router = useRouter()
  const { slug } = router.query
  const [thumbsSwiper, setThumbsSwiper] = useState<swiper>()

  const infos = [
    { name: 'ทะเบียน', value: '2ขร-2044' },
    { name: 'ออกรถเมื่อ', value: '2019' },
    { name: 'ระยะทางไมน์', value: '37,657กม.' },
    { name: 'เครื่องยนต์', value: 'เบนซิน' },
    { name: 'เจ้าของ', value: 'มือสอง' },
    { name: 'ระบบเกียร์', value: 'อัตโนมัติ' },
  ]

  const advertises = [
    advertise01,
    advertise02,
    advertise03,
    advertise04,
    advertise05,
    advertise06,
  ]

  const details = [
    {
      name: 'รูปแบบของเกียร์',
      value: 'เกียร์อัตโนมัติ',
      icon: <TiStarburst />,
    },
    {
      name: 'ลักษณะการขับเคลื่อน',
      value: 'ขับเคลื่อน 4 ล้อ',
      icon: <TiStarburst />,
    },
    {
      name: 'ชื่อประเภทของเกียร์',
      value: 'CVT พร้อม 7 สปีด ​​​​SPORT SEQUELTIAL SHIFTMATIC',
      icon: <TiStarburst />,
    },
    {
      name: 'แรงบิดสูงสุด',
      value: '400 นิวตันเมตร',
      icon: <TiStarburst />,
    },
    {
      name: 'จำนวนเกียร์',
      value: '7',
      icon: <TiStarburst />,
    },
    {
      name: 'พละกำลังสูงสุด',
      value: '256 แรงม้า',
      icon: <TiStarburst />,
    },
    {
      name: 'ประเภทเชื้อเพลิง',
      value: 'เบนซิน',
      icon: <TiBeaker />,
    },
    {
      name: 'อัตราเร่ง',
      value: '0-100 KM/H ภายใน 6.2 วินาที',
      icon: <TiChartLine />,
    },

    {
      name: 'ประเภทของเครื่องยนต์',
      value: 'เครื่องยนตเบนซิน 4 สูบ',
      icon: <TiStarburst />,
    },
    {
      name: 'ความเร็วสูงสุด',
      value: '232 KM/H',
      icon: <TiStarburst />,
    },
  ]

  /* ---------------------------------- Doms ---------------------------------- */
  return (
    <>
      <CarHead />
      <div className={`car-container ${props.className || ''}`} {...props}>
        {/* Info */}
        <Background className="car-info" id="car-info" pattern={BG}>
          <div className="container grid grid-cols-1 gap-3 py-5 lg:grid-cols-3 lg:py-10">
            <div className="rounded-md shadow-lg lg:col-span-2">
              {/* Slider */}
              <Swiper
                modules={[Navigation, Thumbs, FreeMode]}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                loop={true}
                navigation
                lazy={true}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                className={'w-full'}
              >
                {advertises.map((advertise, index) => (
                  <SwiperSlide
                    className="aspect-[16/9]"
                    key={`advertise-image-${index}`}
                  >
                    <Image
                      src={advertise}
                      className="rounded-md"
                      alt={`advertise-image-${index}`}
                      placeholder="blur"
                      width={0}
                      height={0}
                      style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Thumbs */}
              <Swiper
                onSwiper={(swiper) => setThumbsSwiper(swiper)}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mt-2"
              >
                {advertises.map((advertise, index) => (
                  <SwiperSlide
                    className="aspect-[16/10] rounded"
                    key={`advertise-image-${index}`}
                  >
                    <Image
                      src={advertise}
                      className="rounded-md"
                      alt={`advertise-image-${index}`}
                      placeholder="blur"
                      width={0}
                      height={0}
                      style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="flex flex-col justify-between rounded-md border border-slate-200/50 bg-white p-4 shadow-lg">
              <div>
                {/* Title */}
                <div className="text-xl font-bold text-black-900">
                  Nissan Fairlady Z400 3.0 Twin Turbo V6 2022
                </div>
                <div className="flex items-center justify-between">
                  <div className="mt-1  text-sm text-neutral-400">
                    37,657 กม. | เกียร์อัตโนมัติ | เบนซิน
                  </div>
                  <TiStarOutline className="cursor-pointer text-neutral-400" />
                </div>

                <div className="my-3 border-b border-slate-200" />

                {/* Price */}
                <div className="text-xl font-bold text-primary-500">
                  ราคาขาย 5,390,000 บาท
                </div>
                <div className="flex items-center text-xs text-neutral-400">
                  5,490,000 บาท (รวมภาษี 7%)
                  <FiInfo className="ml-2 cursor-pointer" />
                </div>

                {/* Info */}
                <div className="mt-5 grid grid-cols-2 gap-5 text-sm leading-5 text-neutral-500 md:grid-cols-3 lg:grid-cols-2">
                  {infos.map((info) => (
                    <div key={info.name}>
                      <div>{info.name}</div>
                      <div className="text-base font-bold text-neutral-600">
                        {info.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Action */}
              <div className="mt-5 grid grid-cols-2 gap-2 text-base lg:text-xs xl:text-base">
                <div className="flex items-center rounded bg-slate-300 p-2 px-2 shadow-md lg:p-1 xl:p-2">
                  <TiPhone className="mr-1 text-lg" /> 062-323-2932
                </div>
                <div className="flex cursor-pointer items-center rounded bg-green-400 p-1 px-2 text-white shadow-md">
                  <Image
                    src={line}
                    alt="line-icon"
                    width={25}
                    height={25}
                    className="mr-1"
                  />
                  @pdl2538k
                </div>
              </div>
            </div>
          </div>
        </Background>

        {/* Detail */}
        <div className="car-detail bg-slate-100" id="car-detail">
          <div className="container pt-14 pb-20">
            {/* title */}
            <div className="text-center">
              <div className="col-span-4 mx-auto mb-2 inline-block border-b-2 border-primary-500 text-2xl font-bold">
                รายละเอียด
              </div>
              <div className="text-neutral-500">ID: CX1102</div>
            </div>

            {/* context */}
            <div className=" mt-10 grid grid-cols-1 gap-x-10 gap-y-2 lg:gap-y-5 lg:grid-cols-2">
              {details.map((detail) => (
                <div
                  key={detail.name}
                  className="grid grid-cols-2 lg:text-sm xl:text-base border-b border-neutral-200 pb-2 lg:pb-0"
                >
                  <div className="flex items-center text-neutral-500">
                    <span className="text-primary-500">{detail.icon}</span>{' '}
                    <span className="pl-2">{detail.name}</span>
                  </div>
                  <div className="flex items-center justify-end text-right font-bold pr-2 lg:pr-0">
                    {detail.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        <div
          className="car-preview bg-black-800 text-slate-200"
          id="car-preview"
        >
          <div className="container py-10">
            Nissan Fairlady Z400 3.0 Twin Turbo V6 2022
          </div>
        </div>

        {/* Finance Loan */}
        <div className="car-loan bg-slate-200" id="car-loan">
          <div className="container py-10">คำนวนสินเชื่อรถยนต์</div>
        </div>

        {/* Others */}
        <div className="car-other hidden lg:block" id="car-other">
          <div className="container grid grid-cols-4 gap-5 py-14">
            <div className="col-span-4 mx-auto mb-5 inline-block border-b-2 border-primary-500 text-2xl font-bold">
              รถอื่นๆ ที่คุณอาจสนใจ
            </div>
            <CarCard src={Car1} href={'/cars/1'} />
            <CarCard src={Car2} href={'/cars/2'} />
            <CarCard src={Car3} href={'/cars/3'} />
            <CarCard src={Car4} href={'/cars/4'} />
          </div>
        </div>
      </div>
    </>
  )
}
