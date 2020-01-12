import React from 'react'
import { useByeQuery } from '../generated/graphql'

interface Props {}

export const Bye: React.FC<Props> = () => {
  const { loading, data, error } = useByeQuery({ fetchPolicy: 'network-only' })

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.log(error)
    return <div>{JSON.stringify(error.message, null, 2)}</div>
  }

  if (!data) {
    return <div>no data</div>
  }

  return <div>{JSON.stringify(data.bye, null, 2)}</div>
}
