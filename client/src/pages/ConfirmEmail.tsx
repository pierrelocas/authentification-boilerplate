import React, { useEffect, useContext } from 'react'
import { useParams, RouteComponentProps } from 'react-router-dom'
import { useConfirmEmailMutation } from '../generated/graphql'
import { setAccessToken } from '../accessToken'
import { NotificationContext } from '../NotificationContext'
import { Spinner } from '../Spinner'

interface Props extends RouteComponentProps {}

const ConfirmEmail: React.FC<Props> = ({ history }) => {
  const { setNotification } = useContext(NotificationContext)
  const [
    confirmEmailMutation,
    { data, loading, client }
  ] = useConfirmEmailMutation({
    onError: err => {
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
  })

  if (loading || !data) {
    return <Spinner />
  }

  return null
}

export default ConfirmEmail
