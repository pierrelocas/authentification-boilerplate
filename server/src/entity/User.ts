import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field(() => String)
  @Column('text')
  firstname: string

  @Field(() => String)
  @Column('text')
  lastname: string

  @Field(() => String)
  @Column('text', { unique: true })
  email: string

  @Column('text')
  password: string

  @Column('text', { default: 'user' })
  role: string

  @Column('int', { default: 0 })
  tokenVersion: number

  // can remove nullable, just to work with existing data
  @Column('boolean', { nullable: true, default: false })
  confirmed: boolean
}
