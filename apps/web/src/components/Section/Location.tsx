import Image from 'next/image'
import location from '../../assets/images/location/location.png'
import Map from '../../assets/images/location/map.png'
import BackgroundBg from '../../assets/images/location/location_bg.png'
import LocationOnIcon from '../../assets/images/icons/location_on.svg'
import Background from '../Background/Background'

export default function SectionLocation({
  className,
  style,
}: {
  className?: JSX.IntrinsicElements['div']['className']
  style?: JSX.IntrinsicElements['div']['style']
}) {
  return (
    <div
      className={`${className} section-location`}
      style={style}
      id="section-location"
    >
      <Background
        pattern={BackgroundBg}
        rounded="rounded-lg"
        className="shadow-lg"
      >
        <div className="grid grid-cols-1 md:rounded-lg bg-gradient-to-tr from-brown-900 to-brown-500/60 p-10 md:p-5 text-center shadow-lg lg:grid-cols-3 lg:gap-10 lg:p-10 lg:text-left">
          <div>
            <div className="border-b-4 border-primary-500 pb-2 text-4xl font-bold leading-relaxed text-white">
              ทดลองขับได้ที่ศูนย์ LTK AUTO
            </div>
            <div className="mt-5 text-neutral-300">
              บริษัท แอลทีเค ออโต้ อิมพอร์ต จำกัด 648 ถนนประเสริฐมนูกิจ
              แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพมหานคร 10230
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 text-brown-900 lg:col-span-2 lg:mt-0 lg:grid-cols-2">
            <div
              className="relative z-10 shadow-xl"
              style={{ minHeight: '20rem' }}
            >
              <Image
                src={Map}
                alt="map"
                fill
                className="rounded-t-lg object-cover lg:rounded-l-lg lg:rounded-r-none"
              />
            </div>
            <div className=" rounded-b-lg bg-white lg:rounded-r-lg lg:rounded-l-none">
              <Image
                alt="location-image"
                src={location}
                placeholder="blur"
                loading="lazy"
                width={0}
                height={0}
                className="w-full rounded-none lg:rounded-tr-lg"
              />
              <div className="p-3 text-left">
                <div className="lg:2xl text-xl font-bold">ลาดพร้าว</div>
                <div className="mt-3 flex flex-row text-sm text-neutral-500">
                  <div className="flex items-center">
                    <LocationOnIcon className="fill-primary-500" />
                  </div>
                  <div className="pl-2">
                    บริษัท แอลทีเค ออโต้ อิมพอร์ต จำกัด 648 ถนนประเสริฐมนูกิจ
                    แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพมหานคร 10230
                  </div>
                </div>
                <hr className="my-2" />
                <div className="mt-3 flex flex-row text-sm text-neutral-500">
                  <div className="flex items-center">
                    <LocationOnIcon className="fill-primary-500" />
                  </div>
                  <div className="pl-2">
                    <span className="text-black-900">จันทร์ - อาทิตย์ </span>
                    10:00 - 18:00
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Background>
    </div>
  )
}
