import React from 'react'
import { useByeQuery } from '../generated/graphql'
import { RouteComponentProps } from 'react-router-dom'
import { Spinner } from '../Spinner'
// import { NotificationContext } from '../App'

interface Props extends RouteComponentProps {}

const Bye: React.FC<Props> = ({ history }) => {
  // const { setNotification } = useContext(NotificationContext)
  const { loading, data, error } = useByeQuery({
    fetchPolicy: 'network-only',
    errorPolicy: 'none'
    // onError: err => {
    //   let message = ''
    //   let redirect = '/'
    //   if (err.message.includes('Not authenticated')) {
    //     message = 'Not authenticated'
    //     redirect = '/signin'
    //   } else if (err.message.includes('Email not confirmed')) {
    //     message = 'Email not confirmed'
    //     redirect = '/confirm-email'
    //   } else {
    //     message = err.message.split(':')[1]
    //   }
    //   setNotification({
    //     show: true,
    //     type: 'error',
    //     message
    //   })
    //   history.push(redirect)
    // }
  })

  if (loading) {
    return <Spinner />
  }

  if (data && data.bye) {
    return <div>{JSON.stringify(data.bye, null, 2)}</div>
  }
  return (
    <div>
      mmmm, something is not right ! {error && error.message.split(':')[1]}
    </div>
  )
}

export default Bye
