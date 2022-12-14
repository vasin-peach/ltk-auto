import { ApiMethodEnum } from '@libs/constant'
import { ArgumentsHost, ExecutionContext, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

export const createMessageName = (
  context: ExecutionContext | ArgumentsHost,
  status?: HttpStatus,
  exception?: string,
) => {
  const ctx = context.switchToHttp()
  const request = ctx.getRequest<Request>()
  const response = ctx.getResponse<Response>()

  const path = request.path
  const name = path.substring(1).split('/')[0]
  const method = request.method
  const statusCode = status ? status : response.statusCode
  const action = Object.entries(HttpStatus).find(([, s]) => s === statusCode)
  const param = Object.keys(request.params)[0]
  const exceptionMsg = exception
    ? `_${exception
        .match(/[A-Z][a-z]+/g)
        .join('_')
        .toUpperCase()}`
    : undefined

  const nameMsg = (name !== '' ? `_${name}` : '').toUpperCase()
  const actionMsg =
    exceptionMsg || (action ? `_${action[0]}` : '').toUpperCase()
  const paramMsg = (param ? `_BY_${param}` : '').toUpperCase()
  const methodMsg = (
    name === 'auth'
      ? 'sign_in'
      : ApiMethodEnum[method]
      ? ApiMethodEnum[method]
      : 'error'
  ).toUpperCase()

  return `${methodMsg}${nameMsg}${paramMsg}${actionMsg}`
}
