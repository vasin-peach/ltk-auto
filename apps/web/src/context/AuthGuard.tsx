import { RoleEnum } from '@libs/constant'
import { useRouter } from 'next/router'
import { createContext, ReactNode, useContext, useEffect } from 'react'
import PageLoading from 'src/components/Skeleton/PageLoading'
import { AuthContext } from './AuthContext'

export const AuthGuardContext = createContext(null)
export const AuthGuard = ({
  children,
  role,
}: {
  children: ReactNode
  role: RoleEnum[]
}) => {
  /* --------------------------------- States --------------------------------- */
  const router = useRouter()
  const { user } = useContext(AuthContext)

  if (!user || !role.includes(user.role)) {
    router.push('/')
    return <PageLoading />
  } else {
    return (
      <AuthGuardContext.Provider value={null}>
        {children}
      </AuthGuardContext.Provider>
    )
  }
}
