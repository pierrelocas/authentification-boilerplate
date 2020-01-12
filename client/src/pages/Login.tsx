import React from 'react'
import { useForm } from 'react-hook-form'
import { useLoginMutation, MeDocument, MeQuery } from '../generated/graphql'
import { RouteComponentProps } from 'react-router-dom'
import { setAccessToken, getAccessToken } from '../accessToken'

type FormData = {
  email: string
  password: string
}

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [login] = useLoginMutation()
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit(async ({ email, password }) => {
    const response = await login({
      variables: { email, password },
      update: (store, { data }) => {
        if (!data) {
          return null
        }
        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: data.login.user
          }
        })
      }
    })
    console.log(email, password)
    console.log(response)

    if (response && response.data) {
      setAccessToken(response.data.login.accessToken)
      history.push('/')
    }
  })

  return (
    <>
      <div>Login Page</div>
      <form onSubmit={onSubmit}>
        <input ref={register} name='email' placeholder='Email' />
        <input
          type='password'
          ref={register}
          name='password'
          placeholder='Password'
        />
        <input type='submit' value='Login' />
      </form>
    </>
  )
}
