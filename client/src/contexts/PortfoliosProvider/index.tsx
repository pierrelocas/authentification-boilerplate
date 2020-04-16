import React, { createContext, useReducer } from 'react'
import { PortfoliosReducer } from './PortfoliosReducer'
import { usePortfoliosQuery, PortfoliosQuery } from '../../generated/graphql'
import { Spinner } from '../../Spinner'

interface Props {
  children?: any
}
interface IPortfolio {
  name: string
  exchange: string
  currency: string
  favorite: string
}
export interface IState extends PortfoliosQuery {}

export const initialState: IState = { portfolios: [] }

export const PortfoliosContext = createContext(initialState)

export const PortfoliosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(PortfoliosReducer, initialState)
  const { data, loading, error } = usePortfoliosQuery()

  if (loading && !data) {
    console.log('loading')
    return <Spinner />
  }

  // Actions using dispatch

  return (
    <PortfoliosContext.Provider value={{ ...state, ...data }}>
      {children}
    </PortfoliosContext.Provider>
  )
}
