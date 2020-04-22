import React, { createContext, useReducer, useState } from 'react'
import { PortfoliosReducer } from './PortfoliosReducer'
import {
  usePortfoliosQuery,
  PortfoliosQuery,
  useCreatePortfolioMutation,
  PortfoliosDocument,
  CreatePortfolioMutationFn,
} from '../../generated/graphql'
import { Spinner } from '../../Spinner'
import { MutationTuple } from '@apollo/react-hooks'

interface Props {
  children?: any
}

interface IPortfolio {
  name: string
  exchange: string
  currency: string
  favorite?: string
}

const initialPortfolioStaging: IPortfolio = {
  name: '',
  exchange: '',
  currency: '',
}

export interface IState extends PortfoliosQuery {
  createPortfolio?: CreatePortfolioMutationFn
}

export const initialState: IState = { portfolios: [] }

export const PortfoliosContext = createContext(initialState)

export const PortfoliosProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(PortfoliosReducer, initialState)

  const { data, loading, error } = usePortfoliosQuery()

  const [createPortfolio] = useCreatePortfolioMutation({
    onError: (err) => console.log(err),
    update: (cache, { data }) => {
      const { portfolios } = cache.readQuery({
        query: PortfoliosDocument,
      }) as PortfoliosQuery
      if (!data) {
        return null
      }
      cache.writeQuery<PortfoliosQuery>({
        query: PortfoliosDocument,
        data: {
          portfolios: portfolios.concat([data.createPortfolio]),
        },
      })
    },
  })

  if (loading && !data) {
    console.log('loading')
    return <Spinner />
  }

  // Actions

  return (
    <PortfoliosContext.Provider value={{ ...state, ...data, createPortfolio }}>
      {children}
    </PortfoliosContext.Provider>
  )
}
