import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Int,
  Field,
  InputType
} from 'type-graphql'
import { InsertResult } from 'typeorm'
import { Transaction } from '../entity/Transaction'

@InputType()
class TransactionInputType implements Partial<Transaction> {
  @Field({ nullable: true })
  stock?: string

  @Field({ nullable: true })
  quantity?: number

  @Field({ nullable: true })
  price?: number

  @Field({ nullable: true })
  commission?: number
}

@Resolver()
export class TransactionResolver {
  @Query(() => String)
  hey() {
    return 'Hey'
  }
  // must check if belongs to user
  /**
   * Implement isAuth middleware and get userId from context.
   * (remove user Id as a parameter)
   */
  @Query(() => Transaction, { nullable: true })
  async transaction(
    @Arg('transactionId') transactionId: number
  ): Promise<Transaction | undefined> {
    return await Transaction.findOne({ id: transactionId })
  }
  /**
   * Implement isAuth middleware and get userId from context.
   * (remove user Id as a parameter)
   */
  @Query(() => [Transaction])
  async transactions(@Arg('portfolioId') portfolioId: number): Promise<any> {
    const transactions = await Transaction.find({
      where: { portfolioId },
      relations: ['portfolio']
    })
    return transactions
  }

  @Mutation(() => Boolean)
  async createTransaction(
    @Arg('portfolioId', () => Int) portfolioId: number,
    @Arg('date', () => Date) date: Date,
    @Arg('stock') stock: string,
    @Arg('quantity', () => Int) quantity: number,
    @Arg('price') price: number,
    @Arg('commission') commission: number
  ): Promise<Boolean> {
    console.log(portfolioId, date, stock, quantity, price, commission)
    let response: InsertResult
    try {
      response = await Transaction.insert({
        portfolioId,
        date,
        stock,
        quantity,
        price,
        commission
      })
    } catch (err) {
      console.log(err)
      throw new Error(err)
    }
    console.log(response)
    return true
  }

  @Mutation(() => Boolean)
  async updateTransaction(
    @Arg('transactionId', () => Int) id: number,
    @Arg('data') data: TransactionInputType
  ): Promise<Boolean> {
    const result = await Transaction.update({ id }, { ...data })
    return !!result.affected
  }

  @Mutation(() => Boolean)
  async deleteTransaction(@Arg('transactionId', () => Int) id: number) {
    const result = await Transaction.delete({ id })
    return !!result.affected
  }
}
