import Head from 'next/head'
import Image from 'next/image'
import AdvertiseSlider from 'src/components/AdvertiseSlider'
import CarSearchMini from 'src/components/Car/SearchMini'
import PreviewSlider from 'src/components/PreviewSlider'

export default function Home() {
  return (
    <div className=" relative">
      <AdvertiseSlider />
      <CarSearchMini />
      <PreviewSlider />
    </div>
  )
}
