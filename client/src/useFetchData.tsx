import React, { useEffect, useState } from 'react'
import {
  usePortfoliosQuery,
  useTransactionsQuery,
  useMeQuery
} from './generated/graphql'

interface Props {
  portfolioId?: any
}

export const useFetchData: any = (
  portfolioId: any
): { loading: boolean; data: any; error: any } => {
  let loading = true
  let error = null
  let data: any = {
    me: null,
    portfolios: null,
    transactions: null
  }

  const { data: meData, loading: meLoading } = useMeQuery({
    fetchPolicy: 'network-only',
    onError: err => {
      console.log(err)
      error = err
    }
  })

  const {
    loading: portfolioLoading,
    data: portfoliosData
  } = usePortfoliosQuery({
    onError: err => {
      console.log(err)
      error = err
    }
  })

  const {
    loading: transactionsLoading,
    data: transactionsData
  } = useTransactionsQuery({
    variables: { portfolioId },
    onError: err => {
      console.log(err)
      error = err
    }
  })

  if (
    meData?.me &&
    portfoliosData?.portfolios &&
    transactionsData?.transactions
  ) {
    data.me = meData.me
    data.portfolios = portfoliosData.portfolios
    data.transactions = transactionsData.transactions
    loading = false
  }

  return { loading, error, data }
}
