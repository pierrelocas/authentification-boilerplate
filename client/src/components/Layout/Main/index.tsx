import React, { useContext } from 'react'
import { makeStyles, createStyles } from '@material-ui/core'

import clsx from 'clsx'
import { ACTIONBAR_WIDTH, ACTIONBAR_COMPACT_WIDTH } from '../../../config'
import { LayoutStateContext } from '../../../contexts/LayoutProvider'

interface Props {
  children?: any
}

const useStyles = makeStyles(theme =>
  createStyles({
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
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
    }
  })
)
export const Main: React.FC<Props> = ({ children }) => {
  const context: any = useContext(LayoutStateContext)
  const classes = useStyles()
  return (
    <main
      className={clsx(
        classes.content,
        !context.openActionBar && classes.contentWide
      )}
    >
      <div className={classes.appBarSpacer} />
      {children}
    </main>
  )
}
