import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  Int,
  UseMiddleware
} from 'type-graphql'
import { hash, compare } from 'bcryptjs'
import { User } from './entity/User'
import { MyContext } from './MyContext'
import {
  createAccessToken,
  createRefreshToken,
  createConfirmToken,
  createResetToken
} from './auth'
import { sendRefreshToken } from './sendRefreshToken'
import { getConnection, InsertResult } from 'typeorm'
import { isAuth } from './isAuth'
import { verify } from 'jsonwebtoken'
import { transporter } from './utils/transporter'

const {
  CLIENT_HOST,
  CLIENT_PORT,
  EMAIL_USER,
  EMAIL_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET,
  RESET_TOKEN_SECRET
} = process.env

@ObjectType()
class signInResponse {
  @Field()
  accessToken: string
  @Field(() => User)
  user: User
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi'
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() context: MyContext) {
    const authorization = context.req.headers['authorization']
    if (!authorization) {
      return null
    }

    try {
      const token = authorization.split(' ')[1]
      const payload: any = verify(token, ACCESS_TOKEN_SECRET!)
      return await User.findOne({ id: payload.userId })
    } catch (err) {
      console.log(err)
      return null
    }
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext): String {
    return `your user id is : ${payload!.userId}`
  }

  @Query(() => [User])
  async users() {
    return await User.find()
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(
    @Arg('userId', () => Int) userId: number
  ): Promise<Boolean> {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, 'tokenVersion', 1)

    return true
  }

  @Mutation(() => Boolean)
  signOut(@Ctx() { res }: MyContext): Boolean {
    sendRefreshToken(res, '')
    return true
  }

  @Mutation(() => Boolean)
  async signUp(
    @Arg('firstname') firstname: string,
    @Arg('lastname') lastname: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<Boolean> {
    const hashPassword = await hash(password, 12)

    // insert will throw exception if dupplicate email.
    let response: InsertResult
    try {
      response = await User.insert({
        firstname,
        lastname,
        email,
        password: hashPassword
      })
    } catch (err) {
      if (err.message.includes('duplicate key value')) {
        throw new Error('You are already registered!, please login instead.')
      } else {
        throw new Error(err)
      }
    }

    const userId = await response.identifiers[0]

    const user = await User.findOne(userId)

    if (!user) {
      throw new Error('User not found!')
    }
    const token = createConfirmToken(user)
    // Don't want to send email during testing!
    console.log(token)
    // await sendConfirmationEmail(token, user)
    return true
  }

  @Mutation(() => signInResponse)
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<signInResponse> {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw new Error('User not found!')
    }

    const validPassword = await compare(password, user.password)
    if (!validPassword) {
      throw new Error('Bad password!')
    }

    // Successful login
    const accessToken = createAccessToken(user)

    sendRefreshToken(res, createRefreshToken(user))

    return { accessToken, user }
  }

  @Mutation(() => Boolean)
  async sendConfirmationEmail(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw new Error('User not found!')
    }
    if (user.confirmed) {
      throw new Error('Email has already been confirmed.')
    }
    console.log(user)
    const token = createConfirmToken(user)

    console.log(token)
    const mailOptions = {
      from: EMAIL_USER,
      to: user.email,
      subject: 'Email Confirmation',
      html: `
      <p>Hello ${user.firstname} ${user.lastname},</p> 
      <p>Please confirm your email by clicking on the following link: </p>
      <a href="http://${CLIENT_HOST}:${CLIENT_PORT}/confirm-email/${token}"> click here </a>
      <p>Thank you for your registration.</p>`,
      text: `Hello ${user.firstname} ${user.lastname}, 
      Please confirm your email by clicking on the following link: 
      http://${CLIENT_HOST}:${CLIENT_PORT}/confirm-email/${token}
      Thank you for your registration.`
    }

    console.log(mailOptions)

    const info = await transporter.sendMail(mailOptions)
    console.log(`Email confirmation sent: ${info.messageId}`)
    return true
  }

  @Mutation(() => Boolean)
  async confirmEmail(
    @Arg('token') token: string,
    @Ctx() { res }: MyContext
  ): Promise<boolean> {
    const tokenPayload: any = verify(token, EMAIL_TOKEN_SECRET!)
    const { affected } = await User.update(
      { id: tokenPayload.userId },
      { confirmed: true }
    )
    if (affected === 0) {
      throw new Error('User id not found')
    }
    // logout the user
    sendRefreshToken(res, '')
    return true
  }

  @Mutation(() => Boolean)
  async sendResetPasswordEmail(@Arg('email') email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } })
    if (!user) {
      throw new Error('User not found!')
    }
    // console.log(user)
    const token = createResetToken(user)

    console.log(token)

    const mailOptions = {
      from: EMAIL_USER,
      to: user.email,
      subject: 'Reset Password',
      html: `
      <p>Hello ${user.firstname} ${user.lastname},</p> 
      <p>Please follow the link below in order to reset your password. </p>
      <a href="http://${CLIENT_HOST}:${CLIENT_PORT}/reset-password/${token}">
        click here
      </a>
      <p>Salutations</p>`,
      text: `
      Hello ${user.firstname} ${user.lastname}, 
      Please follow the link below in order to reset your password. 
      http://${CLIENT_HOST}:${CLIENT_PORT}/reset-password/${token}
      Salutations.`
    }

    // console.log(mailOptions)

    const info = await transporter.sendMail(mailOptions)
    console.log(info)
    console.log(
      `Reset password link has been successfully sent: ${info.messageId}`
    )
    return true
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg('token') token: string,
    @Arg('password') password: string
  ): Promise<boolean> {
    const { userId }: any = verify(token, RESET_TOKEN_SECRET!)
    console.log(userId)
    const hashPassword = await hash(password, 12)
    const { affected } = await User.update(
      { id: userId },
      { password: hashPassword }
    )
    if (affected === 0) {
      throw new Error('User id not found')
    }
    return true
  }
}
