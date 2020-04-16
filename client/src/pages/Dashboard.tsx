import React, { useContext } from 'react'
import { PortfoliosContext } from '../contexts/PortfoliosProvider'

interface Props {}

const Dashboard: React.FC<Props> = props => {
  const context: any = useContext(PortfoliosContext)
  console.log(context.portfolios)
  return (
    <div>
      <div>Dashboard...</div>
      <div>{JSON.stringify({ ...context.portfolios }, null, 2)} </div>
    </div>
  )
}

export default Dashboard
