import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import Paper from '@material-ui/core/Paper'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SwapHorizontalBold from 'mdi-material-ui/SwapHorizontalBold'
import CartArrowDown from 'mdi-material-ui/CartArrowDown'
import EditIcon from '@material-ui/icons/Edit'
import SettingsIcon from '@material-ui/icons/Settings'
import { PortfolioAction } from './PortfolioAction'
import TransactionAction from './TransactionAction'
// import EditPortfolioAction from './EditAction/EditPortfolioAction'
// import EditTransactionAction from './EditAction/EditTransactionAction'
import { EditAction } from './EditAction'

import { ACTIONBAR_WIDTH } from '../config'
import { LayoutStateContext, LayoutDispatchContext } from '../contexts'

const useStyles = makeStyles(theme => ({
  root: {
    width: ACTIONBAR_WIDTH
  },
  paper: {
    height: theme.spacing(7),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  paperCompact: {
    flexDirection: 'row-reverse' // Only reverse when in compact mode
  },
  expSummary: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '100%',
    flexShrink: 0,
    margin: 'auto',
    paddingLeft: theme.spacing(2)
  },
  zeroSpacingTop: {
    marginTop: 0,
    padingTop: 0
  }
}))

interface Props {
  title: string
}

const initialExpanded = {
  portfolio: false,
  edit: false,
  transaction: false,
  setting: false
}
export const Actionbar: React.FC<Props> = () => {
  const state: any = useContext(LayoutStateContext)
  const dispatch: any = useContext(LayoutDispatchContext)

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper
        className={clsx(
          classes.paper,
          !state.openActionBar && classes.paperCompact
        )}
      >
        <Typography component='h2' variant='h6' color='primary'>
          Actions
        </Typography>
        <IconButton
          size='small'
          color='primary'
          onClick={() => dispatch({ type: 'toggleActionBar' })}
        >
          {state.openActionBar ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </Paper>
      <ExpansionPanel
        expanded={state.actionSection.portfolio}
        onChange={() =>
          dispatch({ type: 'toggleActionSection', payload: 'portfolio' })
        }
      >
        <ExpansionPanelSummary
          className={classes.expSummary}
          expandIcon={<ExpandMoreIcon />}
        >
          <IconButton size='small'>
            <SwapHorizontalBold color='action' />
          </IconButton>
          <Typography className={classes.heading}>Portfolios</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.zeroSpacingTop}>
          <PortfolioAction />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={state.actionSection.transaction}
        onChange={() =>
          dispatch({
            type: 'toggleActionSection',
            payload: 'transaction'
          })
        }
      >
        <ExpansionPanelSummary
          className={classes.expSummary}
          expandIcon={<ExpandMoreIcon />}
        >
          <IconButton size='small'>
            <CartArrowDown color='action' />
          </IconButton>

          <Typography className={classes.heading}>Transaction</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TransactionAction
          // activePortfolio={activePortfolio}
          // QUERY={QUERY}
          // transactions={transactions}
          // selectedTransactionId={selectedTransactionId}
          />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={state.actionSection.edit}
        onChange={() =>
          dispatch({
            type: 'toggleActionSection',
            payload: 'edit'
          })
        }
      >
        <ExpansionPanelSummary
          className={classes.expSummary}
          expandIcon={<ExpandMoreIcon />}
        >
          <IconButton size='small'>
            <EditIcon color='action' />
          </IconButton>
          <Typography className={classes.heading}>Edit</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <EditAction />
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel
        expanded={state.actionSection.setting}
        onChange={() =>
          dispatch({
            type: 'toggleActionSection',
            payload: 'setting'
          })
        }
      >
        <ExpansionPanelSummary
          className={classes.expSummary}
          expandIcon={<ExpandMoreIcon />}
        >
          <IconButton size='small'>
            <SettingsIcon color='action' />
          </IconButton>
          <Typography className={classes.heading}>Advanced Settings</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}
