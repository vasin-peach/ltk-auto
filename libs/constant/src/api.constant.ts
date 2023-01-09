export enum ApiPaginationEnum {
  pagination = 'PAGINATION',
}

export enum ApiMethodEnum {
  GET = 'GET',
  POST = 'CREATE',
  PUT = 2,
  DELETE = 'REMOVE',
  PATCH = 'UPDATE',
  ALL = 5,
  OPTIONS = 6,
  HEAD = 7,
}

export enum ApiUsersEnum {
  create = 'CREATE_USER',
  getUsers = 'GET_USERS',
  getUser = 'GET_USER',
  patchUser = 'PATCH_USER',
  remove = 'REMOVE_USER',
}

export type ResponseMeta = {
  total: number
  page: number
  offset: number
  hasPrevPage?: boolean
  hasNextPage?: boolean
}

export type Meta = Pick<ResponseMeta, 'page' | 'offset'>

export type APIResponse<T> = {
  statusCode?: number
  error?: string[] | string
  errorCode?: string
  meta?: ResponseMeta
  data: T
  timestamp?: string
}
