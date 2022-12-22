import Image, { StaticImageData } from 'next/image'
import { ReactNode } from 'react'

export default function Background({
  children,
  rounded,
  color,
  pattern,
  className,
  style,
}: {
  children: ReactNode
  rounded?: string
  color?: string
  pattern?: StaticImageData
  className?: JSX.IntrinsicElements['div']['className']
  style?: JSX.IntrinsicElements['div']['style']
}) {
  return (
    <div className={`${className} relative`} style={style}>
      {pattern && (
        <Image
          src={pattern}
          alt="pattern"
          fill
          placeholder="blur"
          loading="lazy"
          className={`${rounded} object-cover`}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  )
}
