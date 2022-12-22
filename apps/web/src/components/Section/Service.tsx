import Image, { StaticImageData } from 'next/image'
import accessories from '../../assets/images/icons/accessories.png'
import promotion from '../../assets/images/icons/promotion.png'
import order from '../../assets/images/icons/order.png'
import finance from '../../assets/images/icons/finance.png'
import Link from 'next/link'

export default function SectionService({
  className,
  style,
}: {
  className?: JSX.IntrinsicElements['div']['className']
  style?: JSX.IntrinsicElements['div']['style']
}) {
  return (
    <div className={`${className} section-service`} style={style}>
      <div className="mx-auto inline-block border-b-2 border-primary-500 pb-1 text-xl font-bold text-brown-900 lg:text-3xl">
        บริการของเรา
      </div>
      <div className="mx-auto mt-5 grid grid-cols-2 gap-4 lg:mt-10 xl:w-2/3 lg:grid-cols-4">
        <SectionServiceCard
          text="Accessories"
          icon={accessories}
          href="/service/accessories"
        />
        <SectionServiceCard
          text="Promotion"
          icon={promotion}
          href="/promotion"
        />
        <SectionServiceCard
          text="Order Parts"
          icon={order}
          href="/service/part"
        />
        <SectionServiceCard
          text="Finance Calculator"
          icon={finance}
          href="/finance/loan"
        />
      </div>
    </div>
  )
}

export function SectionServiceCard({
  text,
  icon,
  href,
  className,
  style,
}: {
  text: string
  icon: StaticImageData
  href?: string
  className?: JSX.IntrinsicElements['div']['className']
  style?: JSX.IntrinsicElements['div']['style']
}) {
  return (
    <div
      className={`${className} section-service-card shadow-xl transition-all duration-300 hover:-translate-y-1 hover:opacity-90`}
      style={style}
    >
      <Link href={href || '#'} scroll={false}>
        <div className="rounded-lg bg-gradient-to-tr from-brown-900 to-brown-500 px-3 py-3 text-neutral-100 lg:px-5 lg:py-7">
          <Image
            src={icon}
            alt={text}
            loading="lazy"
            className="mx-auto"
            height={50}
            width={0}
          />
          <div className="mt-3 text-center text-sm  lg:text-lg">{text}</div>
        </div>
      </Link>
    </div>
  )
}
