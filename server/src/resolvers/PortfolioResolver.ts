import { Query, Resolver, Arg, Mutation } from 'type-graphql'
import { InsertResult } from 'typeorm'
import { Portfolio } from '../entity/Portfolio'
// import { User } from '../entity/User'

@Resolver()
export class PortfolioResolver {
  @Query(() => String)
  hey() {
    return 'Hey you !'
  }

  // must check if belongs to user
  @Query(() => Portfolio, { nullable: true })
  async portfolio(
    @Arg('portfolioId') portfolioId: number
  ): Promise<Portfolio | undefined> {
    return await Portfolio.findOne({ id: portfolioId })
  }

  @Query(() => [Portfolio])
  async portfolios(@Arg('userId') userId: number): Promise<Portfolio[]> {
    console.log(userId)

    const portfolios = await Portfolio.find({ relations: ['user'] })
    console.log(portfolios)
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
    @Arg('favorite') favorite: boolean
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
}
