import React from 'react'
import { RouteProps, Redirect, useLocation, Route } from 'react-router-dom'
import { useMeQuery } from './generated/graphql'
import { Spinner } from './Spinner'

export const AuthRoute: React.FC<RouteProps> = props => {
  const location = useLocation()
  const { loading, data } = useMeQuery({ fetchPolicy: 'network-only' })

  if (loading || !data) return <Spinner />

  if (!data.me) {
    return <Redirect to={{ pathname: '/signin', state: { from: location } }} />
  }

  return <Route {...props} />
}
