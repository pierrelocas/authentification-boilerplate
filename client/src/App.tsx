import React, { useState, useEffect, createContext, Context } from 'react'
import { Routes } from './Routes'
import { setAccessToken } from './accessToken'
import { Notification } from './Notification'
import { Backdrop } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

interface Props {}

interface NotificationType {
  show: boolean
  type: 'success' | 'info' | 'warning' | 'error' | undefined
  message: string
}

const initialNotification: NotificationType = {
  show: false,
  type: undefined,
  message: ''
}

export const NotificationContext: any = createContext({})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1
    }
  })
)

export const App: React.FC<Props> = () => {
  const classes = useStyles()
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
      <Backdrop className={classes.backdrop} open={notification.show}>
        <Notification
          open={notification.show}
          handleClose={() => setNotification({ ...notification, show: false })}
          type={notification.type}
          duration={6000}
        >
          {notification.message}
        </Notification>
      </Backdrop>
      <Routes />
    </NotificationContext.Provider>
  )
}
