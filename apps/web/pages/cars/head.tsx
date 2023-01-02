import Head from 'next/head'

export default function CarsHead() {
  return (
    <>
      <Head>
        {/* HTML Meta Tags */}
        <title>
          ค้นหารถ | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร
        </title>

        {/* Facebook Meta Tags */}
        <meta
          property="og:title"
          content="ค้นหารถ | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร"
        />

        {/* Twitter Meta Tags */}
        <meta
          name="twitter:title"
          content="ค้นหารถ | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร"
        />
      </Head>
    </>
  )
}
