import Image from 'next/image'
import location from '../../assets/images/location/location.png'
import Map from '../../assets/images/location/map.png'
import BackgroundBg from '../../assets/images/location/location_bg.png'
import LocationOnIcon from '../../assets/images/icons/location_on.svg'
import Background from '../Background'
import { TiCalendar, TiLocation } from 'react-icons/ti'
import { CommonComponentProps } from 'src/types/props'

export default function SectionLocation(props: CommonComponentProps) {
  return (
    <div className={`${props.className} section-location`} {...props}>
      <Background
        pattern={BackgroundBg}
        rounded="rounded-lg"
        className="shadow-lg"
      >
        <div className="grid grid-cols-1 bg-gradient-to-tr from-brown-900 to-brown-500/60 p-10 text-center shadow-lg md:rounded-lg md:p-5 lg:grid-cols-3 lg:gap-10 lg:p-10 lg:text-left">
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
              <iframe
                src="https://www.google.com/maps/embed?key=API_KEY&pb=!1m14!1m8!1m3!1d15496.661804705067!2d100.6235946!3d13.8291017!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xc8443896de82620f!2sLTK%20AUTO%20IMPORT!5e0!3m2!1sth!2sth!4v1672480247517!5m2!1sth!2sth"
                style={{
                  border: 0,
                  width: '100%',
                  height: '100%',
                  background: '#fff',
                }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-t-lg  lg:rounded-l-lg lg:rounded-r-none"
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
                className="hidden w-full rounded-none lg:block lg:rounded-tr-lg"
              />
              <div className="p-3 text-left">
                <div className="lg:2xl text-xl font-bold">ลาดพร้าว</div>
                <div className="mt-3 flex flex-row text-sm text-neutral-500">
                  <div className="flex items-center">
                    <TiLocation className="text-primary-500" fontSize={20} />
                  </div>
                  <div className="pl-2">
                    บริษัท แอลทีเค ออโต้ อิมพอร์ต จำกัด 648 ถนนประเสริฐมนูกิจ
                    แขวงลาดพร้าว เขตลาดพร้าว กรุงเทพมหานคร 10230
                  </div>
                </div>
                <hr className="my-2" />
                <div className="mt-3 flex flex-row text-sm text-neutral-500">
                  <div className="flex items-center">
                    <TiCalendar className="text-primary-500" fontSize={20} />
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
