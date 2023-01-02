import { useRouter } from 'next/router'
import Image from 'next/image'
import { ChangeEvent, useEffect, useState } from 'react'
import { TiZoomOutline } from 'react-icons/ti'
import Background from 'src/components/Background/Background'
import SectionAdvertiseSlide from 'src/components/Section/AdvertiseSlide'
import { CommonComponentProps } from 'src/types/props'
import CarsHead from './head'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'
import Car from 'src/components/Car/Car'
import Car1 from 'src/assets/images/car1.png'
import Car2 from 'src/assets/images/car2.png'
import Car3 from 'src/assets/images/car3.png'
import Car4 from 'src/assets/images/car4.png'
import Car5 from 'src/assets/images/car5.png'
import { Checkbox, FormGroup } from '@mui/material'
import { FormControlLabel } from '@mui/material'
import cheverolet from 'src/assets/images/brands/cheverolet.png'
import benz from 'src/assets/images/brands/benz.png'
import bmw from 'src/assets/images/brands/bmw.png'
import subaru from 'src/assets/images/brands/subaru.png'
import toyota from 'src/assets/images/brands/toyota.png'
import lexus from 'src/assets/images/brands/lexus.png'
import nissan from 'src/assets/images/brands/nissan.png'
import nyundai from 'src/assets/images/brands/nyundai.png'
import porsche from 'src/assets/images/brands/porsche.png'

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

export default function Cars(props: CommonComponentProps) {
  /* --------------------------------- States --------------------------------- */
  const minPrice = 0
  const maxPrice = 10000000
  const stepPrice = 1000000
  const priceMarks = [
    { value: minPrice, label: 'น้อยสุด' },
    { value: maxPrice, label: 'มากสุด' },
  ]
  const brands = [
    { id: 'cheverolet', src: cheverolet },
    { id: 'benz', src: benz },
    { id: 'bmw', src: bmw },
    { id: 'subaru', src: subaru },
    { id: 'toyota', src: toyota },
    { id: 'lexus', src: lexus },
    { id: 'nissan', src: nissan },
    { id: 'nyundai', src: nyundai },
    { id: 'porsche', src: porsche },
  ]
  const router = useRouter()
  const [search, setSearch] = useState<string>()
  const [brand, setBrand] = useState<string>()
  const [color, setColor] = useState<string>()
  const [prices, setPrices] = useState<number[]>([minPrice, stepPrice * 2])

  /* --------------------------------- Methods -------------------------------- */
  // Methods
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  const handlePrice = (e: Event, val: number | number[]) => {
    setPrices(val as number[])
  }

  /* --------------------------------- Watches -------------------------------- */
  useEffect(() => {
    if (!router.isReady) return

    setSearch(router.query.search as string)
    setBrand(router.query.brand as string)
    // setColor(router.query.color as string)
    // setPrices([
    //   +((router.query.fromPrice as string) || 0),
    //   +((router.query.toPrice as string) || 350000),
    // ])
  }, [router.isReady])

  /* ---------------------------------- Doms ---------------------------------- */

  return (
    <>
      <CarsHead
        search={router.query.search as string}
        brand={router.query.brand as string}
      />
      <div className={`cars-container ${props.className || ''}`} {...props}>
        {/* ----------------------------- Advertise Slide ---------------------------- */}
        <Background
          id="section-advertise-slide"
          className={`gradient-brown-lg bg-brown-900 `}
        >
          <SectionAdvertiseSlide />
        </Background>

        {/* --------------------------------- Content -------------------------------- */}
        <div
          className={`cars-search-container container grid grid-cols-1 gap-5 py-5 lg:grid-cols-4 ${
            props.className || ''
          }`}
          {...props}
        >
          <div className="cars-searchbar">
            <form>
              <div className="flex rounded-lg border border-neutral-300 shadow-md">
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

              <div className="mt-3 grid divide-y divide-neutral-400 rounded-lg  border border-neutral-300 shadow-xl">
                {/* ---------------------------------- Price --------------------------------- */}
                <div id="search-price" className="w-full p-5">
                  <label className="text-neutral-500">ราคา</label>
                  <div className="mt-5 flex justify-between lg:text-sm">
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
                  <div className="flex justify-between text-xs text-neutral-400">
                    <span>Min</span>
                    <span>Max</span>
                  </div>
                </div>

                {/* ---------------------------------- Used ---------------------------------- */}
                <div id="search-used" className="w-full p-5">
                  <label className="text-neutral-500">รถใหม่</label>
                  <FormGroup className="flex flex-row">
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="รถใหม่"
                    />
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="รถมือสอง"
                    />
                  </FormGroup>
                </div>

                {/* ---------------------------------- Brand --------------------------------- */}
                <div id="search-brand" className="w-full p-5">
                  <label className="text-neutral-500">ยี่ห้อรถ</label>
                  <div className="mt-3 grid grid-cols-4 gap-5 lg:grid-cols-2 xl:grid-cols-3">
                    {brands.map((brand) => (
                      <div
                        key={`${brand.id}-key`}
                        className="cursor-pointer justify-center rounded-md p-1 text-center hover:bg-neutral-200"
                      >
                        <Image
                          src={brand.src}
                          alt={`${brand.id}-icon`}
                          height={30}
                          className="mx-auto"
                        />
                        <div className="text-xs text-neutral-500">
                          {brand.id}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Cars */}
          <div
            className="cars-items grid grid-cols-2 gap-5 lg:col-span-3 lg:grid-cols-3"
            style={{ padding: '1px' }}
          >
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
        </div>
      </div>
    </>
  )
}
