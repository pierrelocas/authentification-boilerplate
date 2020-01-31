import React, { useEffect } from 'react'
import { useParams, RouteChildrenProps } from 'react-router-dom'
import { useConfirmEmailMutation } from '../generated/graphql'
import { setAccessToken } from '../accessToken'

interface Props extends RouteChildrenProps {}

export const ConfirmEmail: React.FC<Props> = ({ history }) => {
  const [confirm, { data, error, loading, client }] = useConfirmEmailMutation({
    onError: (err: any) => console.log(err)
  })
  const { token } = useParams()

  useEffect(() => {
    token && confirm({ variables: { token } })
  }, [])

  if (error) {
    return <div>Something went wrong:</div>
  }

  if (loading || !data) {
    return <div>Confrming email... please wait!</div>
  }

  if (data && data.confirmEmail) {
    setAccessToken('')
    try {
      client!.resetStore()
    } catch (err) {
      console.log(err)
    }
    alert('Email successfully confirmed, next login will refect changes')
    history.push('/signin')
  }
  return null
}
