import { MiddlewareFn } from 'type-graphql'
import { MyContext } from './MyContext'
import { verify } from 'jsonwebtoken'

interface PayloadType {
  userId: string
  confirmed: boolean
}

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers['authorization']
  if (!authorization) {
    throw new Error('Not authenticated')
  }
  let payload: PayloadType
  try {
    const token = authorization.split(' ')[1]
    payload = <PayloadType>verify(token, process.env.ACCESS_TOKEN_SECRET!)
  } catch (err) {
    throw new Error('Not authenticated')
  }
  if (!payload.confirmed) {
    throw new Error('Email not confirmed')
  }
  context.payload = payload
  return next()
}
