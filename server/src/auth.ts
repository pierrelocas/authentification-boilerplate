import { User } from './entity/User'
import { sign } from 'jsonwebtoken'

export const createAccessToken = (user: User): string => {
  return sign(
    { userId: user.id, confirmed: user.confirmed },
    process.env.ACCESS_TOKEN_SECRET!,
    {
      expiresIn: '15m'
    }
  )
}

export const createRefreshToken = (user: User): string => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d'
    }
  )
}

export const createConfirmToken = (user: User): string => {
  return sign({ userId: user.id }, process.env.EMAIL_TOKEN_SECRET!, {
    expiresIn: '2d'
  })
}

export const createResetToken = (user: User): string => {
  return sign({ userId: user.id }, process.env.RESET_TOKEN_SECRET!, {
    expiresIn: '2d'
  })
}
