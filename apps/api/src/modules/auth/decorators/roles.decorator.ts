import { RoleEnum } from '@libs/constant'
import { SetMetadata } from '@nestjs/common'

export const ROLE_KEY = 'role'
export const Role = (role: RoleEnum) => SetMetadata(ROLE_KEY, role)
