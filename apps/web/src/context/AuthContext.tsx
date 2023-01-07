import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { RoleEnum } from '@libs/constant'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'

interface IUser {
  id?: string
  email?: string
  name?: string
  role: RoleEnum
}
const defaultState = {
  user: {
    id: undefined,
    email: undefined,
    name: undefined,
    role: RoleEnum.GUEST,
  } as IUser,
  loading: false,
}

export const AuthContext = createContext(defaultState)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  /* --------------------------------- States --------------------------------- */
  const [loading, setLoading] = useState(defaultState.loading)
  const [accessToken, setAccessToken] = useState<string>()
  const [user, setUser] = useState<IUser>(defaultState.user)
  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token'])
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
    } finally {
      setLoading(false)
    }
  }, [accessToken])

  const handleSaveToken = useCallback(() => {
    if (query.access_token) setCookie('access_token', query.access_token)
    setAccessToken(cookies.access_token)
  }, [])

  /* --------------------------------- Watches -------------------------------- */
  useEffect(() => {
    handleSaveToken()
    handleFetchUser()
  }, [handleFetchUser, handleSaveToken])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
