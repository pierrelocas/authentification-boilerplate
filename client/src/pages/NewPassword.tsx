import React from 'react'
import { useParams } from 'react-router-dom'

interface Props {}

export const NewPassword: React.FC<Props> = () => {
  const { token } = useParams()
  console.log(token)

  return <div>New Password</div>
}
