import React, { useState } from 'react'
import clsx from 'clsx'
import { Topbar } from './Topbar'
import { Menubar } from './Menubar'
import Actionbar from './Actionbar'
import { CssBaseline, makeStyles, Theme, createStyles } from '@material-ui/core'

import { ACTIONBAR_WIDTH, ACTIONBAR_COMPACT_WIDTH } from '../config'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps {
  title: string
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
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [actionBarOpen, setActionBarOpen] = useState(true)
  const classes = useStyles()

  return (
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
        className={clsx(classes.content, !actionBarOpen && classes.contentWide)}
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
  )
}
