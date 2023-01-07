import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react'
import { RoleEnum } from '@libs/constant'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

interface IUser {
  id?: string
  email?: string
  name?: string
  role: RoleEnum
  image?: string
}
const defaultState = {
  user: {
    id: undefined,
    email: undefined,
    name: undefined,
    role: RoleEnum.GUEST,
    image: undefined,
  } as IUser,
  loading: false,
  signout: () => {},
  singin: (accessToken: string) => {},
}

export const AuthContext = createContext(defaultState)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  /* --------------------------------- States --------------------------------- */
  const [loading, setLoading] = useState(defaultState.loading)
  const [accessToken, setAccessToken] = useState<string>()
  const [user, setUser] = useState<IUser>(defaultState.user)
  const [cookies, setCookie, removeCookie] = useCookies([
    'access_token',
    'refresh_token',
  ])
  const router = useRouter()
  const query = router.query

  /* --------------------------------- Methods -------------------------------- */
  const handleFetchUser = useCallback(async () => {
    if (!accessToken) return
    try {
      setLoading(true)
      const stream = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      )
      const res = await stream.json()
      setUser(res.data)
    } catch (e) {
      signout()
    } finally {
      setLoading(false)
    }
  }, [accessToken])

  const handleSaveToken = useCallback(() => {
    if ((!query.access_token && !cookies.access_token) || accessToken) return
    singin((query.access_token || cookies.access_token) as string)
    router.replace('/', undefined, { shallow: true })
  }, [router, query.access_token])

  const signout = async () => {
    if (cookies.access_token) removeCookie('access_token')
    if (user.id) setUser(defaultState.user)
    if (accessToken) setAccessToken(undefined)
    router.push('/signin')
  }

  const singin = async (accessToken: string) => {
    setCookie('access_token', accessToken)
    setAccessToken(accessToken as string)
  }

  /* --------------------------------- Watches -------------------------------- */
  useEffect(() => {
    handleSaveToken()
    handleFetchUser()
  }, [handleFetchUser, handleSaveToken])

  return (
    <AuthContext.Provider value={{ user, loading, signout, singin }}>
      {children}
    </AuthContext.Provider>
  )
}
