import React, { useContext } from 'react'
import { DataContext } from '../components/Layout'

interface Props {}

const Dashboard: React.FC<Props> = props => {
  const data = useContext(DataContext)
  return (
    <div>
      <div>Dashboard...</div>
      <div>{JSON.stringify(data, null, 2)} </div>
    </div>
  )
}

export default Dashboard
