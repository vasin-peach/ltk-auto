import CarMini from './CarMini'
import Car1 from '../assets/images/car1.png'
import Car2 from '../assets/images/car2.png'
import Car3 from '../assets/images/car3.png'
import Car4 from '../assets/images/car4.png'
import Car5 from '../assets/images/car5.png'
import Link from 'next/link'

export default function CarSearchMini() {
  return (
    <div className="car-search-mini relative z-10">
      <div className="container relative -top-5 mx-auto">
        <div className="car-search-mini-form grid grid-cols-6 gap-4">
          <div className="col-span-4 flex rounded-md shadow-lg lg:col-span-3">
            <label className="inline-block rounded-l-md bg-white p-3">▇</label>
            <input
              type="search"
              id="search-dropdown"
              className="w-full rounded-r-lg border-none focus:border-none focus:shadow-none focus:outline-none focus:ring-0"
              placeholder="ค้นหาตามชื่อรถ, รุ่น, ยี่ห้อ, ปี"
            />
          </div>
          <div className="col-span-2 hidden w-full rounded-md bg-white py-2 px-5 shadow-lg lg:block">
            ▇ ▇ ▇ ▇ ▇
          </div>
          <button
            type="submit"
            className="gradient-primary col-span-2 w-full rounded-md py-2 px-5 shadow-lg lg:col-span-1"
          >
            <span className=" text-white">ค้นหา</span>
          </button>
        </div>

        <div className="car-search-mini-content mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CarMini src={Car1} />
          <CarMini src={Car2} />
          <CarMini src={Car3} />
          <CarMini src={Car4} />
          <CarMini src={Car5} />
          <CarMini src={Car4} />
          <CarMini src={Car2} />
          <CarMini src={Car1} />
        </div>

        <div className="mt-5 text-center">
          <Link href="/cars" className="text-sm text-slate-400">
            ค้นหารถทุกรุ่น ▶
          </Link>
        </div>
      </div>
    </div>
  )
}
