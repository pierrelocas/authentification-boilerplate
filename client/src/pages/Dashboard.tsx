import React, { useContext } from 'react'
import { DataStateContext } from '../contexts'

interface Props {}

const Dashboard: React.FC<Props> = props => {
  const dataState: any = useContext(DataStateContext)
  return (
    <div>
      <div>Dashboard...</div>
      <div>{JSON.stringify(dataState, null, 2)} </div>
    </div>
  )
}

export default Dashboard
