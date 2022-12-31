import family01 from '../../assets/images/family/01.png'
import family02 from '../../assets/images/family/02.jpeg'
import family03 from '../../assets/images/family/03.jpeg'
import family04 from '../../assets/images/family/04.jpeg'
import family05 from '../../assets/images/family/05.jpeg'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'
import { CommonComponentProps } from 'src/types/props'

export default function SectionFamily(props: CommonComponentProps) {
  return (
    <div className={`${props.className} section-family `} {...props}>
      <div className="text-center">
        <div className="inline-block ">
          <div className="text-xl lg:text-3xl">OUR</div>
          <div className="border-b-2 border-primary-500 pb-1 text-3xl font-bold lg:text-5xl">
            FAMILY
          </div>
          <div className="text-2xl font-bold tracking-widest lg:text-4xl">
            Customer
          </div>
        </div>
      </div>
      <div className="mt-10 rounded-lg bg-neutral-100/20 p-5 lg:p-10">
        <Swiper
          loop={true}
          lazy={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Navigation]}
          navigation
          slidesPerView="auto"
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          <SwiperSlide key={1}>
            <div>
              <Image
                className="rounded"
                src={family01}
                alt="our-family-image"
                width={0}
                height={0}
                loading="lazy"
                placeholder="blur"
                style={{ width: '100%' }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key={2}>
            <div>
              <Image
                className="rounded"
                src={family02}
                alt="our-family-image"
                width={0}
                height={0}
                loading="lazy"
                placeholder="blur"
                style={{ width: '100%' }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key={3}>
            <div>
              <Image
                className="rounded"
                src={family03}
                alt="our-family-image"
                width={0}
                height={0}
                loading="lazy"
                placeholder="blur"
                style={{ width: '100%' }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key={4}>
            <div>
              <Image
                className="rounded"
                src={family04}
                alt="our-family-image"
                width={0}
                height={0}
                loading="lazy"
                placeholder="blur"
                style={{ width: '100%' }}
              />
            </div>
          </SwiperSlide>
          <SwiperSlide key={5}>
            <div>
              <Image
                className="rounded"
                src={family05}
                alt="our-family-image"
                width={0}
                height={0}
                loading="lazy"
                placeholder="blur"
                style={{ width: '100%' }}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  )
}
