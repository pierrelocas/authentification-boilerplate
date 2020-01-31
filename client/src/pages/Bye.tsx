import React, { useState, useEffect, useContext } from 'react'
import { useByeQuery } from '../generated/graphql'
import { RouteComponentProps } from 'react-router-dom'
import { Notification } from '../Notification'
import { NotificationContext } from '../App'

interface Props extends RouteComponentProps {}

export const Bye: React.FC<Props> = ({ history }) => {
  const { setNotification } = useContext(NotificationContext)
  const { loading, data, error } = useByeQuery({
    fetchPolicy: 'network-only'
  })
  useEffect(() => {
    if (error) {
      let message
      if (error.message.includes('Not authenticated')) {
        message = 'Not authenticated'
        // history.push('/signin')
      } else if (error.message.includes('Email not confirmed')) {
        message = 'Email not confirmed'
        // history.push('/confirm-email')
      }
      setNotification({
        show: true,
        type: 'error',
        message
      })
      history.push('/signin')
    }
  }, [error])

  if (loading) {
    console.log('loading')
  }

  if (data && data.bye) {
    return <div>{JSON.stringify(data.bye, null, 2)}</div>
  }
  return null
}
