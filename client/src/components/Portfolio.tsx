import { IconButton, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import clsx from 'clsx'
import React, { useContext } from 'react'
import { DataStateContext, DataDispatchContext } from '../contexts'
import { LayoutDispatchContext } from '../contexts'
import Title from './Title'

const useStyles = makeStyles(theme => ({
  portfolioContext: {
    flex: 1
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: 240,
    overflow: 'hidden'
  },
  active: {
    borderBottomStyle: 'solid',
    borderBottomWidth: 3,
    borderBottomColor: theme.palette.primary.main
  },
  iconsSection: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  actionIcon: {
    marginLeft: '2px'
  }
}))

interface Props {}

export const Portfolio: React.FC<Props> = (props: any) => {
  const dataState: any = useContext(DataStateContext)
  const dataDispatch: any = useContext(DataDispatchContext)
  const { id, name, exchange, currency } = props
  const classes = useStyles()

  return (
    <Paper
      className={clsx(
        classes.paper,
        classes.fixedHeight,
        id === dataState.activePortfolio && classes.active
      )}
      elevation={5}
      onClick={() =>
        dataDispatch({
          type: 'setActivePortfolio',
          payload: id
        })
      }
    >
      <div className={classes.iconsSection}>
        <IconButton
          size='small'
          onClick={() => console.log('go to edit')}
          className={classes.actionIcon}
        >
          <EditIcon color='action' />
        </IconButton>
        <IconButton
          size='small'
          onClick={() => console.log('Delete')}
          className={classes.actionIcon}
        >
          <DeleteIcon color='action' />
        </IconButton>
      </div>
      <Title>{name}</Title>
      <Typography component='p' variant='h4'>
        $3,024.00
      </Typography>
      <Typography color='textSecondary' className={classes.portfolioContext}>
        on 15 March, 2019
      </Typography>
      <Typography color='textSecondary' className={classes.portfolioContext}>
        {exchange}
      </Typography>
      <Typography color='textSecondary' className={classes.portfolioContext}>
        {currency}
      </Typography>
      <div>
        <h4>view balance</h4>
      </div>
    </Paper>
  )
}
