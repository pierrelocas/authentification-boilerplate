import React, { useState, useEffect, createContext, Context } from 'react'
import { Routes } from './Routes'
import { setAccessToken } from './accessToken'
import { Notification } from './Notification'

interface Props {}

interface SetNotificationType {
  show: boolean
  type: 'success' | 'info' | 'warning' | 'error' | undefined
  message: string
}

interface NotificationType {
  setNotification: React.Dispatch<
    React.SetStateAction<SetNotificationType>
  > | null
}

const initialNotification: SetNotificationType = {
  show: false,
  type: undefined,
  message: ''
}

export const NotificationContext: any = createContext<NotificationType>({
  setNotification: null
})

export const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(initialNotification)

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
    return <div>Loading...</div>
  }

  return (
    <NotificationContext.Provider value={{ setNotification }}>
      <Notification
        open={notification.show}
        handleClose={() => setNotification({ ...notification, show: false })}
        type={notification.type}
        duration={6000}
      >
        {notification.message}
      </Notification>
      <Routes />
    </NotificationContext.Provider>
  )
}
