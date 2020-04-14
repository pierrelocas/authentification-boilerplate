import React, { useContext } from 'react'
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
import TransactionAction from '../../TransactionAction'
import { EditAction } from './Edit/'
import { ACTIONBAR_WIDTH, ACTIONBAR_COMPACT_WIDTH } from '../../../config'
import { PortfolioAction } from './Portfolio'
import { LayoutStateContext } from '../../../contexts/LayoutProvider'

const useStyles = makeStyles(theme => ({
  root: {
    width: ACTIONBAR_WIDTH
  },
  appBarSpacer: theme.mixins.toolbar,
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

interface Props {}

export const Actionbar: React.FC<Props> = () => {
  const context: any = useContext(LayoutStateContext)
  // const dispatch: any = useContext(LayoutDispatchContext)

  const classes = useStyles()

  return (
    <section
      className={clsx(
        classes.actionBar,
        !context.openActionBar && classes.actionBarClosed
      )}
    >
      <div className={classes.appBarSpacer} />
      <div className={classes.root}>
        <Paper
          className={clsx(
            classes.paper,
            !context.openActionBar && classes.paperCompact
          )}
        >
          <Typography component='h2' variant='h6' color='primary'>
            Actions
          </Typography>
          <IconButton
            size='small'
            color='primary'
            onClick={() => context.toggleAction()}
          >
            {context.openActionBar ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </Paper>
        <ExpansionPanel
          expanded={context.actionSection.portfolio}
          onChange={() => context.toggleActionSection('portfolio')}
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
          expanded={context.actionSection.transaction}
          onChange={() => context.toggleActionSection('transaction')}
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
          expanded={context.actionSection.edit}
          onChange={() => context.toggleActionSection('edit')}
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
          expanded={context.actionSection.setting}
          onChange={() => context.toggleActionSection('setting')}
        >
          <ExpansionPanelSummary
            className={classes.expSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <IconButton size='small'>
              <SettingsIcon color='action' />
            </IconButton>
            <Typography className={classes.heading}>
              Advanced Settings
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
              sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </section>
  )
}
