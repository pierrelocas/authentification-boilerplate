import { Response } from 'express'
export const sendRefreshToken = (res: Response, token: string) => {
  let expirationDate = new Date()
  expirationDate.setFullYear(expirationDate.getFullYear() + 1)
  res.cookie('jid', token, {
    httpOnly: true,
    path: '/refresh-token',
    expires: expirationDate
  })
}
