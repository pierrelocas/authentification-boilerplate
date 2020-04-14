import React, { useState, useEffect } from 'react'
import { Routes } from './Routes'
import { setAccessToken } from './accessToken'

import { Spinner } from './Spinner'
import { NotificationProvider } from './contexts/NotificationProvider'

interface Props {}

export const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true)

  /**
   * On first load or refresh fetch an access token with httpOnly cookie 'refresh token'
   */
  useEffect(() => {
    fetch('http://localhost:4000/refresh-token', {
      credentials: 'include',
      method: 'POST'
    }).then(async res => {
      const data = await res.json()
      if (data && data.ok) {
        setAccessToken(data.accessToken)
      }
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <Spinner />
  }

  return (
    <NotificationProvider>
      <Routes />
    </NotificationProvider>
  )
}
