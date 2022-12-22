import family from '../../assets/images/family/example.png'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper'

export default function SectionFamily({
  className,
  style,
}: {
  className?: JSX.IntrinsicElements['div']['className']
  style?: JSX.IntrinsicElements['div']['style']
}) {
  return (
    <div
      className={`${className} section-family `}
      style={style}
      id="section-family"
    >
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
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <SwiperSlide key={index}>
                <div>
                  <Image
                    src={family}
                    alt="our-family-image"
                    width={0}
                    height={0}
                    loading="lazy"
                    placeholder="blur"
                    style={{ width: '100%' }}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  )
}
