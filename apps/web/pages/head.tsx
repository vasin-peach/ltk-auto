import Head from 'next/head'

export default function DefaultHead() {
  return (
    <>
      <Head>
        {/* HTML Meta Tags */}
        <title>
          LTK Auto Import | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร
        </title>
        <meta
          name="description"
          content="ผู้ประกอบการนำเข้ารถยนต์อิสระที่เน้นราคามิตรภาพ เน้นความถูกต้อง รถยนต์ที่ LTK นำเข้าทุกคัน ผ่านการตรวจสอบจาก สมอ. เสียภาษีถูกต้องทุกคัน"
        />
        <meta
          name="keywords"
          content="ltkauto, auto, cars, new cars, pre-owned, hybrid vehicles, luxury vehicles, electric vehicles, sedans, suvs, used cars"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#333333" />
        <meta name="msapplication-TileColor" content="#333333" />
        <meta name="theme-color" content="#333333" />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://ltkautoimport.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="th_TH" />
        <meta property="og:site_name" content="LTK Auto Import" />
        <meta
          property="og:title"
          content="LTK Auto Import | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร"
        />
        <meta
          property="og:description"
          content="ผู้ประกอบการนำเข้ารถยนต์อิสระที่เน้นราคามิตรภาพ เน้นความถูกต้อง รถยนต์ที่ LTK นำเข้าทุกคัน ผ่านการตรวจสอบจาก สมอ. เสียภาษีถูกต้องทุกคัน"
        />
        <meta property="og:image" content="/social_card.png" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="twitter.com" />
        <meta property="twitter:url" content="https://ltkautoimport.com" />
        <meta
          name="twitter:title"
          content="LTK Auto Import | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร"
        />
        <meta
          name="twitter:description"
          content="ผู้ประกอบการนำเข้ารถยนต์อิสระที่เน้นราคามิตรภาพ เน้นความถูกต้อง รถยนต์ที่ LTK นำเข้าทุกคัน ผ่านการตรวจสอบจาก สมอ. เสียภาษีถูกต้องทุกคัน"
        />
        <meta name="twitter:image" content="/social_card.png" />
      </Head>
    </>
  )
}
