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
import { createAccessToken, createRefreshToken } from './auth'
import { sendRefreshToken } from './sendRefreshToken'
import { getConnection } from 'typeorm'
import { isAuth } from './isAuth'
import { verify } from 'jsonwebtoken'

@ObjectType()
class LoginResponse {
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
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!)
      return User.findOne({ id: payload.userId })
    } catch (err) {
      console.log(err)
      return null
    }
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    console.log(payload)
    return `your user id is : ${payload!.userId}`
  }

  @Query(() => [User])
  async users() {
    return User.find()
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokenForUser(@Arg('userId', () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, 'tokenVersion', 1)

    return true
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, '')
    return true
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<Boolean> {
    const hashPassword = await hash(password, 12)

    await User.insert({ email, password: hashPassword })
    return true
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
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

    const refreshToken = createRefreshToken(user)

    sendRefreshToken(res, refreshToken)

    return { accessToken, user }
  }
}
