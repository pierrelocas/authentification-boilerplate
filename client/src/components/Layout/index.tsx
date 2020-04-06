import React, { useState, createContext, useReducer, useEffect } from 'react'
import clsx from 'clsx'
import { Topbar } from './Topbar'
import { Menubar } from './Menu'
import { Actionbar } from './Action'
import { CssBaseline, makeStyles, Theme, createStyles } from '@material-ui/core'
import { ACTIONBAR_WIDTH, ACTIONBAR_COMPACT_WIDTH } from '../../config'
import { Spinner } from '../../Spinner'
import {
  LayoutDispatchContext,
  LayoutStateContext,
  DataDispatchContext,
  DataStateContext,
} from '../../contexts'
import { DataReducer, initialDataState } from '../../reducers/DataReducer'
import { LayoutReducer, intialLayoutState } from '../../reducers/LayoutReducer'
import {
  useMeQuery,
  usePortfoliosQuery,
  useTransactionsQuery,
} from '../../generated/graphql'

interface Props {
  title: string
  page: string
  children?: any
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      // overflow: 'auto',
      marginRight: ACTIONBAR_WIDTH,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    contentWide: {
      marginRight: ACTIONBAR_COMPACT_WIDTH,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    actionBar: {
      position: 'absolute',
      right: 0,
      transition: theme.transitions.create('right', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    actionBarClosed: {
      right: -(ACTIONBAR_WIDTH - ACTIONBAR_COMPACT_WIDTH),
      transition: theme.transitions.create('right', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
  })
)

export const Layout: React.FC<Props> = ({ title, page, children }) => {
  const [layoutState, layoutDispatch] = useReducer(
    LayoutReducer,
    intialLayoutState
  )
  const [dataState, dataDispatch] = useReducer(DataReducer, initialDataState)

  const { data: meData, loading: meLoading } = useMeQuery({
    fetchPolicy: 'network-only',
    onError: (err) => {
      console.log(err)
    },
  })
  const {
    loading: portfolioLoading,
    data: portfoliosData,
  } = usePortfoliosQuery({
    onError: (err) => {
      console.log(err)
    },
  })
  const {
    loading: transactionsLoading,
    data: transactionsData,
  } = useTransactionsQuery({
    variables: { portfolioId: dataState.activePortfolio },
    onError: (err) => {
      console.log(err)
    },
  })

  // when null is provided to fetch transaction it select the favorite portfolio
  // const { loading, error, data } = useFetchData(dataState.activePortfolio)

  useEffect(() => {
    ;(() => {
      layoutDispatch({ type: 'setTitle', payload: title })
      layoutDispatch({ type: 'setPage', payload: page })
    })()
  }, [title, page])

  const classes = useStyles()

  if (meLoading || portfolioLoading || transactionsLoading) {
    console.log('loading')
    return <Spinner />
  }

  console.log(portfoliosData)
  return (
    <LayoutDispatchContext.Provider value={layoutDispatch}>
      <LayoutStateContext.Provider value={layoutState}>
        <DataDispatchContext.Provider value={dataDispatch}>
          <DataStateContext.Provider
            value={{
              ...dataState,
              ...meData,
              ...portfoliosData,
              ...transactionsData,
            }}
          >
            {console.log(dataState)}
            <div className={classes.root}>
              <CssBaseline />
              <Topbar />
              <Menubar />
              <main
                className={clsx(
                  classes.content,
                  !layoutState.openActionBar && classes.contentWide
                )}
              >
                <div className={classes.appBarSpacer} />
                {children}
              </main>

              <section
                className={clsx(
                  classes.actionBar,
                  !layoutState.openActionBar && classes.actionBarClosed
                )}
              >
                <div className={classes.appBarSpacer} />
                <Actionbar />
              </section>
            </div>
          </DataStateContext.Provider>
        </DataDispatchContext.Provider>
      </LayoutStateContext.Provider>
    </LayoutDispatchContext.Provider>
  )
}
