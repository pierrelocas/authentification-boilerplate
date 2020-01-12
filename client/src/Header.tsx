import React from 'react'
import { Link } from 'react-router-dom'
import { useMeQuery, useLogoutMutation } from './generated/graphql'
import { setAccessToken } from './accessToken'

interface Props {}

export const Header: React.FC<Props> = () => {
  const { data, loading, error } = useMeQuery()
  const [logout, { client }] = useLogoutMutation()
  if (loading) {
    console.log('loading!')
  }
  if (error) {
    console.log(error.message)
  }
  return (
    <header>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/register'>Register</Link>
      </div>
      <div>
        <Link to='/login'>Login</Link>
      </div>
      <div>
        <Link to='/bye'>Bye</Link>
      </div>
      <div>
        {data && data.me ? `You are logged as : ${data.me.email}` : null}
      </div>
      <div>
        {!loading && data && data.me ? (
          <button
            onClick={async () => {
              const { data, errors } = await logout()
              console.log('test', data, errors)
              setAccessToken('')
              try {
                await client!.resetStore()
              } catch (err) {
                console.log(err)
              }
            }}
          >
            logout
          </button>
        ) : (
          'not logged in'
        )}
      </div>
    </header>
  )
}
