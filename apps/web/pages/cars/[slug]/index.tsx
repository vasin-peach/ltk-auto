import { useRouter } from 'next/router'

export default function Car() {
  const router = useRouter()
  const { slug } = router.query
  return (
    <div>
      <h1>Car</h1>
      <h1>Cars/{slug}</h1>
    </div>
  )
}
