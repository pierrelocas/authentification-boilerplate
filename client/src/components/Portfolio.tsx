import { IconButton, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import clsx from 'clsx'
import React, { useContext } from 'react'
import { DataStateContext, DataDispatchContext } from '../contexts'
import {
  useDeletePortfolioMutation,
  PortfoliosDocument,
  PortfoliosQuery
} from '../generated/graphql'
import Title from './Title'
import { GlobalStateContext } from '../contexts/GlobalProvider'

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
  // const dataDispatch: any = useContext(DataDispatchContext)
  const globalContext: any = useContext(GlobalStateContext)

  const [deletePortfolio] = useDeletePortfolioMutation({
    onError: err => console.log(err),
    update: (cache, { data }) => {
      const { portfolios } = cache.readQuery({
        query: PortfoliosDocument
      }) as PortfoliosQuery
      if (!data) {
        return null
      }
      cache.writeQuery<PortfoliosQuery>({
        query: PortfoliosDocument,
        data: {
          portfolios: portfolios.filter(
            (p: any) => p.id !== data.deletePortfolio
          )
        }
      })
      // dataDispatch({ type: 'setEditActionType', payload: 'create' })
      // dataDispatch({ type: 'setActivePortfolio', payload: null })
      console.log('updating cache', cache, data?.deletePortfolio)
    }
  })
  const classes = useStyles()
  const { id, name, exchange, currency } = props

  return (
    <Paper
      className={clsx(
        classes.paper,
        classes.fixedHeight,
        id === globalContext.activePortfolio && classes.active
      )}
      elevation={5}
      onClick={() => globalContext.setActivePortfolio(id)}
    >
      <div className={classes.iconsSection}>
        <IconButton
          size='small'
          onClick={() => {
            console.log('editing requested')
            // layoutDispatch({ type: 'setEditActionType', payload: 'update' })
          }}
          className={classes.actionIcon}
        >
          <EditIcon color='action' />
        </IconButton>
        <IconButton
          size='small'
          onClick={() => {
            console.log('deleting', id)
            //  deletePortfolio({ variables: { portfolioId: id } })
          }}
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
