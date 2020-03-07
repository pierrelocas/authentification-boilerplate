import {
  Query,
  Resolver,
  Arg,
  Mutation,
  Field,
  InputType,
  Int
} from 'type-graphql'
import { InsertResult } from 'typeorm'
import { Portfolio } from '../entity/Portfolio'
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
  async portfolios(@Arg('userId') userId: number): Promise<any> {
    const portfolios = await Portfolio.find({
      where: { userId },
      relations: ['user']
    })
    return portfolios
  }

  /**
   * Implement isAuth middleware and get userId from context.
   * (remove user Id as a parameter)
   */
  @Mutation(() => Boolean)
  async createPortfolio(
    @Arg('userId') userId: number,
    @Arg('name') name: string,
    @Arg('exchange') exchange: string,
    @Arg('currency') currency: string,
    @Arg('favorite', { defaultValue: false }) favorite?: boolean
  ): Promise<Boolean> {
    let response: InsertResult

    try {
      response = await Portfolio.insert({
        name,
        exchange,
        currency,
        favorite,
        userId
      })
    } catch (err) {
      console.log(err)
      throw new Error('oops, something went terribly wrong!')
    }

    console.log(response)

    return true
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

  @Mutation(() => Boolean)
  async deletePortfolio(@Arg('portfolioId', () => Int) id: number) {
    const result = await Portfolio.delete({ id })
    return !!result.affected
  }
}
