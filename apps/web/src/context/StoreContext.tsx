import { APIResponse, IBrand, ICar } from '@libs/constant'
import { debounce } from '@mui/material'
import axios from 'axios'
import {
  createContext,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Dispatch } from 'react'

export const minPrice = 0
export const maxPrice = 10000000
export const stepPrice = 1000000
const defaultState = {
  brandLoading: false,
  carLoading: false,
  brands: [] as IBrand[],
  cars: [] as ICar[],
  selectSearch: '',
  selectPrices: [minPrice, stepPrice * 3],
  selectBrands: [] as string[],
  setSelectSearch: (() => {}) as Dispatch<SetStateAction<string>>,
  setSelectPrices: (() => {}) as Dispatch<SetStateAction<number[]>>,
  setSelectBrands: (() => {}) as Dispatch<SetStateAction<string[]>>,
  handleFetchBrands: async () => {},
  handleFetchCars: () => {},
}

export const StoreContext = createContext(defaultState)

/* -------------------------------------------------------------------------- */
/*                                  Provider                                  */
/* -------------------------------------------------------------------------- */
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  /* --------------------------------- States --------------------------------- */
  const [brandLoading, setBrandLoading] = useState(defaultState.brandLoading)
  const [carLoading, setCarLoading] = useState(defaultState.carLoading)

  const [brands, setBrands] = useState(defaultState.brands)
  const [cars, setCars] = useState(defaultState.cars)

  // Select
  const [selectSearch, setSelectSearch] = useState(defaultState.selectSearch)
  const [selectPrices, setSelectPrices] = useState(defaultState.selectPrices)
  const [selectBrands, setSelectBrands] = useState(defaultState.selectBrands)

  /* --------------------------------- Methods -------------------------------- */

  const handleFetchBrands = useCallback(async () => {
    setBrandLoading(true)

    // Fetch data
    const { data } = await axios.get<APIResponse<IBrand[]>>(
      `${process.env.NEXT_PUBLIC_API_URL}/brands`,
    )
    setBrands(data.data)
    setBrandLoading(false)
  }, [])

  const fetchCar = async () => {
    console.log('hi')
    // Generate params
    const searchURI = `search=${encodeURIComponent(
      JSON.stringify(selectSearch),
    )}`
    const pricesURI = `prices=${encodeURIComponent(
      JSON.stringify(selectPrices),
    )}`
    const brandURI = `brands=${encodeURIComponent(
      JSON.stringify(selectBrands),
    )}`
    const params = `?${[searchURI, pricesURI, brandURI].join('&')}`

    // Fetch data
    try {
      const { data } = await axios.get<APIResponse<ICar[]>>(
        `${process.env.NEXT_PUBLIC_API_URL}/cars${params}`,
      )
    } catch (e) {}

    setCarLoading(false)
  }
  const handleFetchCars = useCallback(debounce(fetchCar, 500), [])

  useEffect(() => {
    handleFetchCars()
  }, [selectBrands, selectSearch, selectPrices])

  useEffect(() => {
    handleFetchBrands()
  }, [])

  /* ---------------------------------- Doms ---------------------------------- */
  return (
    <StoreContext.Provider
      value={{
        brandLoading,
        carLoading,
        brands,
        cars,
        selectSearch,
        selectPrices,
        selectBrands,
        setSelectSearch,
        setSelectPrices,
        setSelectBrands,
        handleFetchBrands,
        handleFetchCars,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
