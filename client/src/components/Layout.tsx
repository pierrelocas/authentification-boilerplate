import React, { useState, createContext } from 'react'
import clsx from 'clsx'
import { Topbar } from './Topbar'
import { Menubar } from './Menubar'
import { Actionbar } from './Actionbar'
import { CssBaseline, makeStyles, Theme, createStyles } from '@material-ui/core'
import { ACTIONBAR_WIDTH, ACTIONBAR_COMPACT_WIDTH } from '../config'
import { RouteComponentProps } from 'react-router-dom'
import { Spinner } from '../Spinner'
import { useFetchData } from '../useFetchData'

interface Props extends RouteComponentProps {
  title: string
  children: any
}

export const DataContext = createContext({})
export const ActivePortfolioContext = createContext({})

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

export const Layout: React.FC<any> = ({ title, children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [actionBarOpen, setActionBarOpen] = useState(true)
  // when null is provided to fetch transaction it select the favorite portfolio or the first one
  const [portfolioId, setPortfolioId] = useState<any>(null)
  const { loading, data } = useFetchData(portfolioId)

  console.log({ loading, data })
  const classes = useStyles()
  if (loading) {
    return <Spinner />
  }
  return (
    <ActivePortfolioContext.Provider value={{ portfolioId, setPortfolioId }}>
      <DataContext.Provider value={data}>
        <div className={classes.root}>
          <CssBaseline />
          <Topbar
            handleDrawerOpen={() => setDrawerOpen(true)}
            title={title}
            open={drawerOpen}
          />
          <Menubar
            handleDrawerClose={() => setDrawerOpen(false)}
            open={drawerOpen}
            title={title}
          />
          <main
            className={clsx(
              classes.content,
              !actionBarOpen && classes.contentWide
            )}
          >
            <div className={classes.appBarSpacer} />
            {children}
          </main>
          <section
            className={clsx(
              classes.actionBar,
              !actionBarOpen && classes.actionBarClosed
            )}
          >
            <div className={classes.appBarSpacer} />
            <Actionbar
              setActionBarOpen={setActionBarOpen}
              actionBarOpen={actionBarOpen}
            />
          </section>
        </div>
      </DataContext.Provider>
    </ActivePortfolioContext.Provider>
  )
}
