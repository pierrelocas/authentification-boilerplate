import React from 'react'
import { useForm } from 'react-hook-form'
import { useRegisterMutation } from '../generated/graphql'
import { RouteComponentProps } from 'react-router-dom'

type FormData = {
  email: string
  password: string
}

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [signUp] = useRegisterMutation()
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const { data } = await signUp({ variables: { email, password } })
    console.log(email, password)
    console.log(data)

    if (data && data.register) {
      history.push('/')
    }
  })

  return (
    <>
      <div>Register Page</div>
      <form onSubmit={onSubmit}>
        <input ref={register} name='email' placeholder='Email' />
        <input
          type='password'
          ref={register}
          name='password'
          placeholder='Password'
        />
        <input type='submit' value='Register' />
      </form>
    </>
  )
}
