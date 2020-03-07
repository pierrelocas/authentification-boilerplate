import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { Portfolio } from './Portfolio'

@ObjectType()
@Entity('transactions')
export class Transaction extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => Int)
  @Column()
  portfolioId: number

  @Field()
  @Column('timestamptz')
  date: Date

  @Field()
  @Column('text')
  stock: string

  @Field(() => Int)
  @Column()
  quantity: number

  @Field()
  @Column('float')
  price: number

  @Field()
  @Column('float4')
  commission: number

  @Field()
  @ManyToOne(() => Portfolio)
  portfolio: Portfolio
}
