import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import Preview from 'src/assets/images/preview.png'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function PreviewSlider() {
  return (
    <div className="preview-slider-container">
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
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
