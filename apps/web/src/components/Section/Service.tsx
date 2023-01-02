import Image, { StaticImageData } from 'next/image'
import accessories from '../../assets/images/icons/accessories.png'
import promotion from '../../assets/images/icons/promotion.png'
import order from '../../assets/images/icons/order.png'
import finance from '../../assets/images/icons/finance.png'
import Link from 'next/link'
import { CommonComponentProps } from 'src/types/props'
import { TiChartBar, TiCog, TiStarburst } from 'react-icons/ti'

export default function SectionService(props: CommonComponentProps) {
  return (
    <div
      {...props}
      className={`section-service text-center ${props.className}`}
    >
      <div className="text-xl font-bold text-brown-900 lg:text-3xl">
        ซื้อรถและรับบริการระดับพรีเมี่ยม
      </div>
      <div className="text-xl font-bold text-primary-500 lg:mt-5 lg:text-5xl">
        เชื่อใจ LTK AUTO
      </div>
      <div className="mx-auto mt-5 hidden grid-cols-3  text-center text-sm text-neutral-500 md:grid lg:mt-10 lg:w-2/3 lg:text-base">
        <div className="flex items-center justify-center ">
          <TiStarburst fontSize={30} className="text-primary-500" />
          <div className="ml-2">ชื่อมั่นได้ 100%</div>
        </div>
        <div className="flex items-center justify-center">
          <TiCog fontSize={30} className="text-primary-500" />
          <div className="ml-2">ตรวจคุณภาพทุกคัน</div>
        </div>
        <div className="flex items-center justify-center">
          <TiChartBar fontSize={30} className="text-primary-500" />
          <div className="ml-2">ราคาเป็นธรรม</div>
        </div>
      </div>
      <ServiceList className="mt-5 lg:mt-10" />
    </div>
  )
}

export function ServiceList(props: CommonComponentProps) {
  return (
    <div {...props} className={`service-list ${props.className}`}>
      <div className="text-center">
        <div className="inline-block border-b-2 border-primary-500 pb-1 text-xl font-bold text-brown-900 lg:text-3xl">
          บริการของเรา
        </div>
      </div>
      <div className="mx-auto mt-5 grid grid-cols-2 gap-4 lg:mt-10 lg:grid-cols-4 ">
        <ServiceCard
          text="Accessories"
          icon={accessories}
          href="/services/accessories"
        />
        <ServiceCard text="Promotion" icon={promotion} href="/promotion" />
        <ServiceCard text="Order Parts" icon={order} href="/services/parts" />
        <ServiceCard
          text="Finance Calculator"
          icon={finance}
          href="/calculator/loan"
        />
      </div>
    </div>
  )
}

export function ServiceCard(
  props: CommonComponentProps & {
    text: string
    icon: StaticImageData
    href?: string
  },
) {
  return (
    <div
      {...props}
      className={`${props.className} service-card rounded-lg bg-gradient-to-tr from-brown-900  to-brown-500 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:opacity-90`}
    >
      <Link href={props.href || '#'}>
        <div className=" px-3 py-3 text-neutral-100 lg:px-5 lg:py-7">
          <Image
            src={props.icon}
            alt={props.text}
            loading="lazy"
            className="mx-auto"
            height={50}
            width={0}
          />
          <div className="mt-3 text-center text-sm  lg:text-lg">
            {props.text}
          </div>
        </div>
      </Link>
    </div>
  )
}
