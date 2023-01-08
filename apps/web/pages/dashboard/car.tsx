import { ChangeEvent, useState } from 'react'
import Layout from './layout'
import cheverolet from 'src/assets/images/brands/cheverolet.png'
import benz from 'src/assets/images/brands/benz.png'
import bmw from 'src/assets/images/brands/bmw.png'
import subaru from 'src/assets/images/brands/subaru.png'
import toyota from 'src/assets/images/brands/toyota.png'
import lexus from 'src/assets/images/brands/lexus.png'
import nissan from 'src/assets/images/brands/nissan.png'
import nyundai from 'src/assets/images/brands/nyundai.png'
import porsche from 'src/assets/images/brands/porsche.png'
import Car1 from 'src/assets/images/car1.png'
import { TiZoomOutline } from 'react-icons/ti'
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  styled,
} from '@mui/material'
import Car from 'src/components/Car/Car'

const SliderStyles = styled(Slider)({
  '& .MuiSlider-thumb': {
    backgroundColor: '#F2B33D',
    width: '15px',
    height: '15px',
  },
  '& .MuiSlider-markLabel': {
    fontSize: '0.7rem',
    top: '20px',
    color: '#737373',
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
})

export default function DashboardCar() {
  /* --------------------------------- States --------------------------------- */
  const minPrice = 0
  const maxPrice = 10000000
  const stepPrice = 1000000
  const [search, setSearch] = useState<string>()
  const [brand, setBrand] = useState<string>()
  const [color, setColor] = useState<string>()
  const [prices, setPrices] = useState<number[]>([minPrice, stepPrice * 2])
  const [brands, setBrands] = useState([
    { id: 'cheverolet', src: cheverolet },
    { id: 'benz', src: benz },
    { id: 'bmw', src: bmw },
    { id: 'subaru', src: subaru },
    { id: 'toyota', src: toyota },
    { id: 'lexus', src: lexus },
    { id: 'nissan', src: nissan },
    { id: 'nyundai', src: nyundai },
    { id: 'porsche', src: porsche },
  ])

  /* --------------------------------- Methods -------------------------------- */
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const handlePrice = (e: Event, val: number | number[]) => {
    setPrices(val as number[])
  }
  /* --------------------------------- Watches -------------------------------- */
  /* ---------------------------------- Doms ---------------------------------- */
  return (
    <Layout>
      <div className="dashboard-car">
        <div className="text-sm text-neutral-500">
          จัดการ แก้ไข เพิ่ม ลบ รถยนต์ในระบบ
        </div>
        <div className="grid grid-cols-4 gap-5 ">
          <div className=" col-span-4 mt-5 w-full rounded-lg bg-stone-300 p-3 text-brown-600 shadow-lg">
            <form className="grid w-full grid-cols-4 gap-2 rounded-lg text-neutral-500 lg:gap-5">
              {/* Search */}
              <div className="col-span-4 flex rounded-lg border border-neutral-300 shadow-md lg:col-span-2">
                <label className="inline-flex items-center rounded-l-md bg-white pl-3 pr-2">
                  <TiZoomOutline className="text-xl text-primary-500" />
                </label>
                <input
                  style={{ minHeight: '30px' }}
                  type="search"
                  id="search-dropdown"
                  className="w-full rounded-r-lg border-none pl-0 focus:border-none focus:shadow-none focus:outline-none focus:ring-0"
                  placeholder="ค้นหาตามชื่อรถ, รุ่น, ยี่ห้อ, ปี"
                  value={search}
                  onChange={handleSearch}
                />
              </div>

              {/* Prices */}
              <div
                id="search-price"
                className="col-span-4 w-full rounded-lg border  border-neutral-300 bg-white px-3 py-2 shadow-md md:col-span-2 lg:col-span-1"
              >
                <>
                  <div className="flex justify-between text-xs">
                    <span>{prices[0].toLocaleString()}฿</span>
                    <span>{prices[1].toLocaleString()}฿</span>
                  </div>
                  <SliderStyles
                    size="small"
                    getAriaLabel={() => 'Price ranges'}
                    value={prices}
                    onChange={handlePrice}
                    valueLabelDisplay="auto"
                    min={minPrice}
                    max={maxPrice}
                    step={stepPrice}
                    marks
                    className="pt-0"
                    valueLabelFormat={(v: number) => `${v.toLocaleString()}฿`}
                  />
                </>
              </div>

              {/* Used */}
              <div
                id="search-used"
                className="col-span-4 flex w-full flex-row rounded-lg  border border-neutral-300 bg-white px-3 py-2 text-xs shadow-md md:col-span-2 lg:col-span-1"
              >
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked size="small" className="p-1" />
                  }
                  label={<span className="text-xs">รถใหม่</span>}
                />
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked size="small" className="p-1" />
                  }
                  label={<span className="text-xs">รถมือสอง</span>}
                />
              </div>
            </form>
          </div>
          <div className="col-span-4 w-full grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            <Car src={Car1} href={'/cars/1'} />
            <Car src={Car1} href={'/cars/1'} />
            <Car src={Car1} href={'/cars/1'} />
            <Car src={Car1} href={'/cars/1'} />
          </div>
        </div>
      </div>
    </Layout>
  )
}
