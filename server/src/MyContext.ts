import { Request, Response } from 'express'

export interface ITokenPayload {
  userId: number
  confirmed: boolean
}

export interface MyContext {
  req: Request
  res: Response
  payload?: ITokenPayload
}
