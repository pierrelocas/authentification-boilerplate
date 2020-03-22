import React, { useState, createContext, useReducer, useEffect } from 'react'
import clsx from 'clsx'
import { Topbar } from './Topbar'
import { Menubar } from './Menubar'
import { Actionbar } from './Actionbar'
import { CssBaseline, makeStyles, Theme, createStyles } from '@material-ui/core'
import { ACTIONBAR_WIDTH, ACTIONBAR_COMPACT_WIDTH } from '../config'
import { RouteComponentProps } from 'react-router-dom'
import { Spinner } from '../Spinner'
import { useFetchData } from '../useFetchData'
import {
  LayoutDispatchContext,
  LayoutStateContext,
  ActivePortfolioContext,
  DataContext,
  DataDispatchContext,
  DataStateContext
} from '../contexts'
import { DataReducer, initialDataState } from '../reducers/DataReducer'
import { LayoutReducer, intialLayoutState } from '../reducers/LayoutReducer'

interface Props {
  title: string
  children?: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      // overflow: 'auto',
      marginRight: ACTIONBAR_WIDTH,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    contentWide: {
      marginRight: ACTIONBAR_COMPACT_WIDTH,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    },
    actionBar: {
      position: 'absolute',
      right: 0,
      transition: theme.transitions.create('right', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    },
    actionBarClosed: {
      right: -(ACTIONBAR_WIDTH - ACTIONBAR_COMPACT_WIDTH),
      transition: theme.transitions.create('right', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      })
    }
  })
)

export const Layout: React.FC<Props> = ({ title, children }) => {
  const [layoutState, layoutDispatch] = useReducer(
    LayoutReducer,
    intialLayoutState
  )
  const [dataState, dataDispatch] = useReducer(DataReducer, initialDataState)

  // when null is provided to fetch transaction it select the favorite portfolio or the first one
  const { loading, error, data } = useFetchData(dataState.activePortfolio)

  // Fectch initial data using the default/favorite portfolio
  // Check if useEffect could be inside useFetchData and not returning anything.
  useEffect(() => {
    console.log('in effect')
    ;(async () =>
      await dataDispatch({
        type: 'setData',
        payload: { loading, data }
      }))()
  }, [loading, dataState.activePortfolio])

  const classes = useStyles()

  if (dataState.loading) {
    return <Spinner />
  }

  if (error) {
    console.log(error.message)
  }
  return (
    <LayoutDispatchContext.Provider value={layoutDispatch}>
      <LayoutStateContext.Provider value={layoutState}>
        <DataDispatchContext.Provider value={dataDispatch}>
          <DataStateContext.Provider value={dataState}>
            <div className={classes.root}>
              <CssBaseline />
              <Topbar title={title} />
              <Menubar title={title} />
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
                <Actionbar title={title} />
              </section>
            </div>
          </DataStateContext.Provider>
        </DataDispatchContext.Provider>
      </LayoutStateContext.Provider>
    </LayoutDispatchContext.Provider>
  )
}
