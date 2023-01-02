import Car1 from '../../assets/images/car1.png'
import Car2 from '../../assets/images/car2.png'
import Car3 from '../../assets/images/car3.png'
import Car4 from '../../assets/images/car4.png'
import Car5 from '../../assets/images/car5.png'
import Link from 'next/link'
import Car from '../Car/Car'
import mini from 'src/assets/images/brands/mini.png'
import benz from 'src/assets/images/brands/benz.png'
import bmw from 'src/assets/images/brands/bmw.png'
import subaru from 'src/assets/images/brands/subaru.png'
import toyota from 'src/assets/images/brands/toyota.png'
import lexus from 'src/assets/images/brands/lexus.png'
import Image from 'next/image'
import { TiChevronRightOutline, TiZoomOutline } from 'react-icons/ti'
import { CommonComponentProps } from 'src/types/props'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

export default function SectionCar(props: CommonComponentProps) {
  /* --------------------------------- States --------------------------------- */
  const router = useRouter()
  const [search, setSearch] = useState('')

  /* --------------------------------- Methods -------------------------------- */
  function handleSearch(e: FormEvent) {
    e.preventDefault()
    router.push(`/cars?search=${search}`)
  }

  /* ---------------------------------- Doms ---------------------------------- */
  return (
    <div className={`section-car relative z-10 ${props.className}`} {...props}>
      <form className="grid grid-cols-6 gap-4" onSubmit={handleSearch}>
        {/* Car search */}
        <div className="col-span-4 flex rounded-md shadow-lg lg:col-span-3 ">
          <label className="inline-flex items-center rounded-l-md bg-white pl-3 pr-2">
            <TiZoomOutline className="text-xl text-neutral-600" />
          </label>
          <input
            style={{ minHeight: '30px' }}
            type="search"
            id="search-dropdown"
            className="w-full rounded-r-lg border-none pl-0 focus:border-none focus:shadow-none focus:outline-none focus:ring-0"
            placeholder="ค้นหาตามชื่อรถ, รุ่น, ยี่ห้อ, ปี"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            required
          />
        </div>

        {/* Car brand */}
        <div className="col-span-2 hidden w-full grid-cols-5 rounded-md bg-white p-2 shadow-lg lg:grid">
          <Link href="/cars?brand=toyota">
            <div className="justify-center rounded-md p-1 text-center hover:bg-neutral-200">
              <Image
                src={toyota}
                alt="toyota-icon"
                height={30}
                className="mx-auto"
              />
              <div className="text-xs text-neutral-500">Toyota</div>
            </div>
          </Link>
          <Link href="/cars?brand=benz">
            <div className="rounded-md p-1 text-center hover:bg-neutral-200">
              <Image
                src={benz}
                alt="benz-icon"
                height={30}
                className="mx-auto"
              />
              <div className="text-xs text-neutral-500">Benz</div>
            </div>
          </Link>
          <Link href="/cars?brand=bmw">
            <div className="rounded-md p-1 text-center hover:bg-neutral-200">
              <Image src={bmw} alt="bmw-icon" height={30} className="mx-auto" />
              <div className="text-xs text-neutral-500">BMW</div>
            </div>
          </Link>
          <Link href="/cars?brand=subaru">
            <div className="rounded-md p-1 text-center hover:bg-neutral-200">
              <Image
                src={subaru}
                alt="subaru-icon"
                height={30}
                className="mx-auto"
              />
              <div className="text-xs text-neutral-500">Subaru</div>
            </div>
          </Link>
          <Link href="/cars?brand=lexus">
            <div className="rounded-md p-1 text-center hover:bg-neutral-200">
              <Image
                src={lexus}
                alt="lexus-icon"
                height={30}
                className="mx-auto"
              />
              <div className="text-xs text-neutral-500">Lexus</div>
            </div>
          </Link>
        </div>

        {/* Car search */}
        <button
          type="submit"
          className="gradient-primary col-span-2 w-full rounded-md py-2 px-5 shadow-lg transition-all hover:to-primary-500 lg:col-span-1"
        >
          <span className=" text-white">ค้นหา</span>
        </button>
      </form>

      {/* Car list */}
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Car src={Car1} href={'/cars/1'} />
        <Car src={Car2} href={'/cars/2'} />
        <Car src={Car3} href={'/cars/3'} />
        <Car src={Car4} href={'/cars/4'} />
        <Car src={Car5} href={'/cars/5'} />
        <Car src={Car4} href={'/cars/4'} />
        <Car src={Car2} href={'/cars/2'} />
        <Car src={Car1} href={'/cars/1'} />
        <Car src={Car1} href={'/cars/1'} />
        <Car src={Car2} href={'/cars/2'} />
        <Car src={Car3} href={'/cars/3'} />
        <Car src={Car4} href={'/cars/4'} />
      </div>

      <div className="mt-5 pb-5">
        <Link
          href="/cars"
          className=" flex items-center justify-center text-sm text-slate-400"
        >
          <span>ค้นหารถทุกรุ่น </span>
          <TiChevronRightOutline />
        </Link>
      </div>
    </div>
  )
}
