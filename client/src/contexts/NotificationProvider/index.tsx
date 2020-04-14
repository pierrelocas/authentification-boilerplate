import React, { createContext, useState } from 'react'
import { Backdrop, makeStyles, Theme } from '@material-ui/core'
import { Notification } from './Notification'

interface Props {
  children?: any
}

export interface NotificationType {
  show: boolean
  type: 'success' | 'info' | 'warning' | 'error' | undefined
  message: string
}

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1
  },
  loading: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

export const NotificationContext: React.Context<{
  setNotification: React.Dispatch<React.SetStateAction<NotificationType>> | null
}> = createContext<{
  setNotification: React.Dispatch<React.SetStateAction<NotificationType>> | null
}>({
  setNotification: null
})

const initialNotification: NotificationType = {
  show: false,
  type: undefined,
  message: ''
}

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [notification, setNotification] = useState(initialNotification)
  const classes = useStyles()
  return (
    <NotificationContext.Provider value={{ setNotification }}>
      <Backdrop className={classes.backdrop} open={notification.show}>
        <Notification
          open={notification.show}
          handleClose={() => setNotification({ ...notification, show: false })}
          type={notification.type}
          duration={5000}
        >
          {notification.message}
        </Notification>
      </Backdrop>
      {children}
    </NotificationContext.Provider>
  )
}
