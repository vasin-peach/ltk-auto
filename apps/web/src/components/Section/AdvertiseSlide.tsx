import { CommonComponentProps } from 'src/types/props'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import Image from 'next/image'
import Free from 'src/assets/images/free.png'
import Preview1 from 'src/assets/images/preview1.png'
import Preview2 from 'src/assets/images/preview2.png'

export default function SectionAdvertiseSlide(props: CommonComponentProps) {
  /* ---------------------------------- Doms ---------------------------------- */
  return (
    <div className={`section-advertise-slide lg:p-5 py-10 ${props.className}`}>
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
          <div className="lg:container mx-auto">
            <Image
              src={Preview1}
              alt="me"
              placeholder="blur"
              width={0}
              height={0}
              className="aspect-[15/5] w-full"
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="lg:container mx-auto">
            <Image
              src={Preview2}
              alt="me"
              placeholder="blur"
              width={0}
              height={0}
              className="aspect-[15/5] w-full"
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
