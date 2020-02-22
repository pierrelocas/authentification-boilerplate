import { NotificationType } from './NotificationType'
import { createContext } from 'react'

export const NotificationContext: React.Context<{
  setNotification: React.Dispatch<React.SetStateAction<NotificationType>> | null
}> = createContext<{
  setNotification: React.Dispatch<React.SetStateAction<NotificationType>> | null
}>({
  setNotification: null
})
