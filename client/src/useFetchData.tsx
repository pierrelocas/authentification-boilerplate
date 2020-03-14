import React from 'react'
import {
  usePortfoliosQuery,
  useTransactionsQuery,
  useMeQuery
} from './generated/graphql'

interface Props {
  portfolioId?: any
}

export const useFetchData: any = (
  portfolioId: any = 7
): { loading: boolean; data: any } => {
  let loading: boolean = true
  let data: any = { me: null, portfolios: null, transactions: null }
  console.log(portfolioId)
  const { data: meData, loading: meLoading } = useMeQuery({
    fetchPolicy: 'network-only'
  })
  const {
    loading: portfolioLoading,
    data: portfoliosData
  } = usePortfoliosQuery({
    onError: err => console.log(err)
  })
  const {
    loading: transactionsLoading,
    data: transactionsData
  } = useTransactionsQuery({
    variables: { portfolioId },
    onError: err => console.log(err)
  })

  if (
    meData &&
    meData.me &&
    portfoliosData &&
    portfoliosData.portfolios &&
    transactionsData &&
    transactionsData.transactions
  ) {
    data.me = meData.me
    data.portfolios = portfoliosData.portfolios
    data.transactions = transactionsData.transactions
    loading = false
  }

  return { loading, data }
}
