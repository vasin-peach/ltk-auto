import Head from 'next/head'

export default function CarsHead({
  search,
  brand,
}: {
  search?: string
  brand?: string
}) {
  return (
    <>
      <Head>
        {/* HTML Meta Tags */}
        <title>{`ค้นหารถ ${
          search || brand || ''
        } | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร`}</title>

        {/* Facebook Meta Tags */}
        <meta
          property="og:title"
          content={`ค้นหารถ ${
            search || brand || ''
          } | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร`}
        />

        {/* Twitter Meta Tags */}
        <meta
          name="twitter:title"
          content={`ค้นหารถ ${
            search || brand || ''
          } | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร`}
        />
      </Head>
    </>
  )
}
