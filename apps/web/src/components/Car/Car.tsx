import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import {
  TiBeaker,
  TiChartLine,
  TiFilter,
  TiStar,
  TiStarFullOutline,
  TiStarOutline,
} from 'react-icons/ti'
import { CommonComponentProps } from 'src/types/props'
import { Url } from 'url'

export default function Car(
  props: CommonComponentProps & {
    src: StaticImageData
    mini?: boolean
    href: Url | string
  },
) {
  return (
    <div
      className={`car-container rounded-md shadow-md ${props.className}`}
      {...props}
    >
      <div>
        <Link href={props.href}>
          <Image
            src={props.src}
            alt="me"
            placeholder="blur"
            width={0}
            height={0}
            className="rounded-t-md"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Link>
      </div>
      <div className="rounded-b-md bg-white p-3">
        <div className="flex items-center justify-between">
          <span className="text-black-900">Nissan Z400 3.0L V6</span>
          {true ? (
            <TiStarOutline className="text-xl" />
          ) : (
            <TiStarFullOutline className="text-xl text-primary-500" />
          )}
        </div>
        <div className="mt-2 grid grid-cols-2 text-xs">
          <div className="flex items-center">
            <TiChartLine className="text-2xl text-primary-500 lg:text-xl" />
            <span className="text-base font-normal text-neutral-500 lg:text-xs lg:font-light">
              100,799 ก.ม.
            </span>
          </div>
          <div className="flex items-center">
            <TiBeaker className="text-2xl text-primary-500 lg:text-xl" />
            <span className="text-base font-normal text-neutral-500  lg:text-xs lg:font-light">
              เบนซิน
            </span>
          </div>
        </div>
        <div className="mt-3 text-black-900">
          <span className="text-lg font-bold">5,390,000 </span>
          <span>บาท</span>
        </div>
      </div>
    </div>
  )
}
