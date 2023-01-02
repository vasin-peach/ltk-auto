import Head from 'next/head'

export default function LoanHead() {
  return (
    <>
      <Head>
        {/* HTML Meta Tags */}
        <title>คำนวนสินเชื่อรถยนต์ | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร</title>

        {/* Facebook Meta Tags */}
        <meta
          property="og:title"
          content="คำนวนสินเชื่อรถยนต์ | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร"
        />

        {/* Twitter Meta Tags */}
        <meta
          name="twitter:title"
          content="คำนวนสินเชื่อรถยนต์ | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร"
        />
      </Head>
    </>
  )
}
