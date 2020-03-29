import React, { createContext } from 'react'
import { NotificationType } from './components/Notification/Type'

export const DataContext = createContext({})
export const ActivePortfolioContext = createContext({})
export const LayoutStateContext = createContext({})
export const LayoutDispatchContext = createContext({})
export const DataStateContext = createContext({})
export const DataDispatchContext = createContext({})
export const NotificationContext: React.Context<{
  setNotification: React.Dispatch<React.SetStateAction<NotificationType>> | null
}> = createContext<{
  setNotification: React.Dispatch<React.SetStateAction<NotificationType>> | null
}>({
  setNotification: null
})
