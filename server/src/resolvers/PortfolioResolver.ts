import {
  Query,
  Resolver,
  Arg,
  Mutation,
  Field,
  InputType,
  Int,
  Ctx,
  UseMiddleware,
} from 'type-graphql'
import { InsertResult } from 'typeorm'
import { Portfolio } from '../entity/Portfolio'
import { MyContext } from '../MyContext'
import { isAuth } from '../isAuth'
// import { User } from '../entity/User'

@InputType()
class PortfolioInputType implements Partial<Portfolio> {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  exchange?: string

  @Field({ nullable: true })
  currency?: string

  @Field({ nullable: true })
  favorite?: boolean
}

@Resolver()
export class PortfolioResolver {
  @Query(() => String)
  hey() {
    return 'Hey you !'
  }

  // must check if belongs to user
  /**
   * Implement isAuth middleware and get userId from context.
   * (remove user Id as a parameter)
   */
  @Query(() => Portfolio, { nullable: true })
  async portfolio(
    @Arg('portfolioId') portfolioId: number
  ): Promise<Portfolio | undefined> {
    return await Portfolio.findOne({ id: portfolioId })
  }
  /**
   * Implement isAuth middleware and get userId from context.
   * (remove user Id as a parameter)
   */
  @Query(() => [Portfolio])
  @UseMiddleware(isAuth)
  async portfolios(@Ctx() { payload }: MyContext): Promise<any> {
    console.log({ payload })
    const portfolios = await Portfolio.find({
      where: { userId: payload!.userId },
      relations: ['user'],
    })
    return portfolios
  }

  /**
   * Implement isAuth middleware and get userId from context.
   * (remove user Id as a parameter)
   */
  @Mutation(() => Portfolio)
  @UseMiddleware(isAuth)
  async createPortfolio(
    @Ctx() { payload }: MyContext,
    @Arg('name') name: string,
    @Arg('exchange') exchange: string,
    @Arg('currency') currency: string,
    @Arg('favorite', { defaultValue: false }) favorite?: boolean
  ): Promise<Portfolio> {
    let response: InsertResult

    // @TODO : Handle favorite/default portfolio, first one should be true, the subsequent ones should be false
    const portfolios = await Portfolio.find()
    // console.log('count', await Portfolio.count())
    try {
      response = await Portfolio.insert({
        name,
        exchange,
        currency,
        favorite: !!portfolios.length ? favorite : true,
        userId: payload!.userId,
      })
    } catch (err) {
      console.log(err)
      throw new Error('oops, something went terribly wrong! : ' + err.message)
    }

    console.log(response)
    const newPortfolio = await Portfolio.findOne({
      id: response.identifiers[0].id,
    })
    if (newPortfolio) return newPortfolio
    else throw new Error('ooops, I did it again')
  }

  /**
   * Add check to see if portfolio belongs to logged in user
   */
  @Mutation(() => Boolean)
  async updatePortfolio(
    @Arg('portfolioId', () => Int) id: number,
    @Arg('data') data: PortfolioInputType
  ): Promise<Boolean> {
    const result = await Portfolio.update({ id }, { ...data })
    return !!result.affected
  }

  @Mutation(() => Int)
  @UseMiddleware(isAuth)
  async deletePortfolio(
    @Arg('portfolioId', () => Int) id: number,
    @Ctx() { payload }: MyContext
  ) {
    const portfolio = await Portfolio.findOne({ id })
    if (portfolio!.userId !== payload!.userId) {
      throw new Error('Portfolio does not belongs to user.')
    }
    const result = await Portfolio.delete({ id })
    if (result.affected === 0) {
      throw new Error('Oooops, nothing was deleted, failed.')
    }
    return id
  }
}
