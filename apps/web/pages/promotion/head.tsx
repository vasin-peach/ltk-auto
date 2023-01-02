import Head from 'next/head'

export default function PromotionHead() {
  return (
    <>
      <Head>
        {/* HTML Meta Tags */}
        <title>โปรโมชั่น | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร</title>

        {/* Facebook Meta Tags */}
        <meta
          property="og:title"
          content="โปรโมชั่น | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร"
        />

        {/* Twitter Meta Tags */}
        <meta
          name="twitter:title"
          content="โปรโมชั่น | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร"
        />
      </Head>
    </>
  )
}
