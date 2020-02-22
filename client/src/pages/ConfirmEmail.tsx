import React, { useEffect, useContext } from 'react'
import { useParams, RouteComponentProps } from 'react-router-dom'
import { useConfirmEmailMutation } from '../generated/graphql'
import { setAccessToken } from '../accessToken'
import { NotificationContext } from '../NotificationContext'

interface Props extends RouteComponentProps {}

export const ConfirmEmail: React.FC<Props> = ({ history }) => {
  const { setNotification } = useContext(NotificationContext)
  const [
    confirmEmailMutation,
    { data, error, loading, client }
  ] = useConfirmEmailMutation({
    onError: err => {
      console.log(err)
      setNotification!({
        show: true,
        type: 'error',
        message: err.message.split(':')[1]
      })
      history.push('/confirm-email')
    },
    update: (_, { data }) => {
      if (data && data.confirmEmail) {
        setNotification!({
          show: true,
          type: 'success',
          message: 'Email successfully confirm. Please login to reflect changes'
        })
        setAccessToken('')
        client!.resetStore()
        history.push('/signin')
      }
    }
  })
  const { token } = useParams()

  useEffect(() => {
    if (token) {
      confirmEmailMutation({ variables: { token } })
    }
  }, [])

  if (error) {
    console.log(error)
  }

  if (loading || !data) {
    return <div>Confrming email... please wait!</div>
  }

  return null
}
