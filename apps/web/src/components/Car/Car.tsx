import Image, { StaticImageData } from 'next/image'

export default function Car({
  src,
  mini = true,
}: {
  src: StaticImageData
  mini?: boolean
}) {
  return (
    <div className="car-container rounded-md shadow-md">
      <div>
        <Image
          src={src}
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
      </div>
      <div className="rounded-b-md p-5 bg-white">
        <div className="flex justify-between">
          <span className="text-black-900">Nissan Z400 3.0L V6</span>
          <span>▇</span>
        </div>
        <div className="mt-2 grid grid-cols-1 text-xs lg:grid-cols-2">
          <div>
            <span className="mr-2 text-primary-500">▇</span>
            <span className="font-light text-slate-500">100,799 ก.ม.</span>
          </div>
          <div>
            <span className="mr-2 text-primary-500 ">▇</span>
            <span className="font-light text-slate-500">เบนซิน</span>
          </div>
        </div>
        <div className="mt-2 text-black-900">
          <span className="font-bold">5,390,000 </span>
          <span>บาท</span>
        </div>
      </div>
    </div>
  )
}
