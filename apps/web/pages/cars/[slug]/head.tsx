import Head from 'next/head'

export default function CarHead({
  title = 'LTK Auto Import | ศูนย์รวมรถยนต์นำเข้า พร้อมศูนย์บริการครบวงจร',
  desc = 'ผู้ประกอบการนำเข้ารถยนต์อิสระที่เน้นราคามิตรภาพ เน้นความถูกต้อง รถยนต์ที่ LTK นำเข้าทุกคัน ผ่านการตรวจสอบจาก สมอ. เสียภาษีถูกต้องทุกคัน',
  image = '/social_card.png',
}) {
  return (
    <>
      <Head>
        {/* HTML Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={desc} />

        {/* Facebook Meta Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={desc} />
        <meta property="og:image" content={image} />

        {/* Twitter Meta Tags */}
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={desc} />
        <meta name="twitter:image" content={image} />
      </Head>
    </>
  )
}
