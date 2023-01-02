import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import Image from 'next/image'
import Free from '../assets/images/free.png'

export default function AdvertiseSlider() {
  return (
    <div className="advertish-slider-container gradient-brown ">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{
          clickable: true,
          renderBullet: function (index: any, className: any) {
            return `<span class=" bg-primary-500 p-2 rounded-full w-5 h-5 ${className}"></span>`
          },
        }}
        lazy={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div className="container mx-auto">
            <Image
              src={Free}
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
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="container mx-auto">
            <Image
              src={Free}
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
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
