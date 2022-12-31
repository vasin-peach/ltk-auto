export default function Cars() {
  const cars = ['car1', 'car2', 'car3']
  return (
    <div>
      <h1>Cars</h1>
      <div>
        {cars?.map((car) => {
          return (
            <a href={`/cars/${car}`}>
              <div>{car}</div>
            </a>
          )
        })}
      </div>
    </div>
  )
}
