import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { User } from './User'

@ObjectType()
@Entity('portfolios')
export class Portfolio extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => Int)
  @Column({ nullable: true })
  userId: number

  @Field()
  @Column({ type: 'text', unique: true })
  name: string

  @Field()
  @Column('text')
  exchange: string

  @Field()
  @Column('text')
  currency: string

  @Field()
  @Column('boolean', { default: false })
  favorite: boolean

  @Field()
  @ManyToOne(() => User)
  user: User
}
