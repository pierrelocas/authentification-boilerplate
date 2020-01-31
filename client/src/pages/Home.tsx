import React from 'react'
import { useUsersQuery } from '../generated/graphql'

interface Props {}

export const Home: React.FC<Props> = () => {
  const { data, loading } = useUsersQuery({ fetchPolicy: 'network-only' })

  if (loading || !data) return <div>Loading...</div>

  return (
    <>
      <div>Home Page</div>
      <ul>
        {data.users.map(u => {
          return (
            <li key={u.id}>
              <p>{u.firstname}</p>
              <p>{u.lastname}</p>
              <p>{u.email}</p>
            </li>
          )
        })}
      </ul>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  )
}
