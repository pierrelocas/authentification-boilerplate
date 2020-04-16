import React, { useReducer } from 'react'
import { Topbar } from './Topbar'
import { Menubar } from './Menu'
import { Actionbar } from './Action'
import { Spinner } from '../../Spinner'
import { DataDispatchContext, DataStateContext } from '../../contexts'
// import { DataReducer, initialDataState } from '../../reducers/DataReducer'
import {
  useMeQuery,
  usePortfoliosQuery,
  useTransactionsQuery
} from '../../generated/graphql'
import { LayoutProvider } from '../../contexts/LayoutProvider'
import { Main } from './Main'
import { CssBaseline } from '@material-ui/core'
import { GlobalProvider } from '../../contexts/GlobalProvider'
import { PortfoliosProvider } from '../../contexts/PortfoliosProvider'

interface Props {
  title: string
  page: string
  children?: any
}

export const Layout: React.FC<Props> = ({ title, page, children }) => {
  // const [dataState, dataDispatch] = useReducer(DataReducer, initialDataState)

  // const { data: meData, loading: meLoading } = useMeQuery({
  //   fetchPolicy: 'network-only',
  //   onError: err => {
  //     console.log(err)
  //   }
  // })
  // const {
  //   loading: portfolioLoading,
  //   data: portfoliosData
  // } = usePortfoliosQuery({
  //   onError: err => {
  //     console.log(err)
  //   }
  // })
  // const {
  //   loading: transactionsLoading,
  //   data: transactionsData
  // } = useTransactionsQuery({
  //   variables: { portfolioId: dataState.activePortfolio },
  //   onError: err => {
  //     console.log(err)
  //   }
  // })

  // when null is provided to fetch transaction it select the favorite portfolio
  // const { loading, error, data } = useFetchData(dataState.activePortfolio)

  // if (meLoading || portfolioLoading || transactionsLoading) {
  //   return <Spinner />
  // }

  return (
    <LayoutProvider>
      <GlobalProvider title={title} page={page}>
        <PortfoliosProvider>
          <div style={{ display: 'flex' }}>
            <CssBaseline />
            <Topbar />
            <Menubar />
            <Main>{children}</Main>
            <Actionbar />
          </div>
        </PortfoliosProvider>
      </GlobalProvider>
    </LayoutProvider>
  )
}
