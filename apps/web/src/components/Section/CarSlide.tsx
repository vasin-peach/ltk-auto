import { CommonComponentProps } from 'src/types/props'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import Preview from 'src/assets/images/preview.png'

export function SectionCarSlide(props: CommonComponentProps) {
  return (
    <div className={`section-car-slide ${props.className}`} {...props}>
      <Swiper
        slidesPerView={1}
        loop={true}
        lazy={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div className="relative">
            <Image
              src={Preview}
              alt="me"
              placeholder="blur"
              width={0}
              height={0}
              style={{
                minHeight: '30vh',
                width: '100%',
                objectFit: 'cover',
              }}
            />
            <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black-900 to-brown-300/0 py-5 text-center text-white">
              <div className="container mx-auto w-auto py-5 lg:w-2/3">
                <div className="font-roboto text-lg font-bold text-white lg:text-2xl">
                  Nissan Fairlady Z400 3.0 Twin Turbo V6 2022
                </div>
                <div className="mt-3 text-left text-xs text-neutral-400 lg:text-lg">
                  Nissan Fairlady Z400 รถ Sport coupe ใหม่ล่าสุดจากค่าย Nissan
                  มาพร้อมกับเครื่องยนต์ V6 Twin Turbo มีให้คุณเลือกด้วยกัน 5 สี
                  พร้อมให้ทุกท่านสั่งจองกันแล้ววันนี้ ที่โชว์รูม LTK AUTO IMPORT
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
