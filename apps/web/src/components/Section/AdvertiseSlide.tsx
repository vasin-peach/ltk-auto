import { CommonComponentProps } from 'src/types/props'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper'
import Image from 'next/image'
import Free from 'src/assets/images/free.png'

export default function SectionAdvertiseSlide(props: CommonComponentProps) {
  /* ---------------------------------- Doms ---------------------------------- */
  return (
    <div className={`section-advertise-slide ${props.className}`}>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        loop={true}
        navigation
        pagination={{
          clickable: true,
        }}
        lazy={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div className="container mx-auto py-5 lg:py-0">
            <Image
              src={Free}
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
