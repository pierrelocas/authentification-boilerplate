export interface NotificationType {
  show: boolean
  type: 'success' | 'info' | 'warning' | 'error' | undefined
  message: string
}
