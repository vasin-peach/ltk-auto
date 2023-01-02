import Head from 'next/head'

export default function PartsHead() {
  return (
    <>
      <Head>
        {/* HTML Meta Tags */}
        <title>
          สั่งซื้อชิ้นส่วนและอุปกรณ์รถยนต์ | ศูนย์รวมรถยนต์นำเข้า
          พร้อมศูนย์บริการครบวงจร
        </title>

        {/* Facebook Meta Tags */}
        <meta
          property="og:title"
          content="สั่งซื้อชิ้นส่วนและอุปกรณ์รถยนต์ | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร"
        />

        {/* Twitter Meta Tags */}
        <meta
          name="twitter:title"
          content="สั่งซื้อชิ้นส่วนและอุปกรณ์รถยนต์ | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร"
        />
      </Head>
    </>
  )
}
