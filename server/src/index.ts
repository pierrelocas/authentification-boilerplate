import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { verify } from 'jsonwebtoken'
import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { createAccessToken, createRefreshToken } from './auth'
import { User } from './entity/User'
import { ErrorInterceptor } from './ErrorInterceptor'
import { sendRefreshToken } from './sendRefreshToken'
import { UserResolver } from './resolvers/UserResolver'
import { PortfolioResolver } from './resolvers/PortfolioResolver'
import { TransactionResolver } from './resolvers/TransactionResolver'

const { CLIENT_HOST, CLIENT_PORT, REFRESH_TOKEN_SECRET } = process.env
;(async () => {
  const app = express()

  app.use(
    cors({
      origin: `http://${CLIENT_HOST}:${CLIENT_PORT}`,
      credentials: true
    })
  )

  app.use('/refresh-token', cookieParser())

  app.post('/refresh-token', async (req, res) => {
    const token: string = req.cookies.jid
    if (!token) {
      return res.send({ ok: false, accessToken: '' })
    }

    // verify token, create and send an accessToken
    let payload: any = null
    try {
      payload = verify(token, REFRESH_TOKEN_SECRET!)
    } catch (err) {
      return res.send({ ok: false, accessToken: '' })
    }

    // token is valid we send back an access token
    const user = await User.findOne({ id: payload.userId })
    if (!user) {
      return res.send({ ok: false, accessToken: '' })
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' })
    }

    sendRefreshToken(res, createRefreshToken(user))

    return res.send({ ok: true, accessToken: createAccessToken(user) })
  })

  await createConnection()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PortfolioResolver, TransactionResolver],
      globalMiddlewares: [ErrorInterceptor]
    }),
    context: ({ req, res }) => ({ req, res })
  })

  apolloServer.applyMiddleware({ app, cors: false })

  app.listen(4000, () => console.log('express started'))
})()
