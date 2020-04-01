import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import {
  Grid,
  Switch,
  TextField,
  Button,
  withStyles,
  Typography,
  makeStyles
} from '@material-ui/core'
import { green, orange } from '@material-ui/core/colors'
import {
  LayoutStateContext,
  LayoutDispatchContext,
  DataStateContext
} from '../../../../contexts'
import { useForm, Controller } from 'react-hook-form'

interface Props {}

interface IEditPortfolio {
  name?: string
  exchange?: string
  currency?: string
}

const intitialEditPortfolio: IEditPortfolio = {
  name: '',
  exchange: '',
  currency: ''
}

const AddUpdateSwitch = withStyles({
  switchBase: {
    color: green[500],
    '&$checked': {
      color: orange[500]
    },
    '&$checked + $track': {
      backgroundColor: orange[500]
    }
  },
  checked: {},
  track: { backgroundColor: green[500] }
})(Switch)

const useStyles = makeStyles(theme => ({
  colorCreate: {
    color: green[500]
  },
  colorUpdate: {
    color: orange[500]
  },
  backgroundCreate: {
    backgroundColor: green[500],
    color: 'white'
  },
  backgroundUpdate: {
    backgroundColor: orange[500],
    color: 'white'
  },
  backgroundDelete: {
    backgroundColor: theme.palette.error.dark,
    color: 'white'
  }
}))

export const EditPortfolio: React.FC<Props> = () => {
  const layoutState: any = useContext(LayoutStateContext)
  const layoutDispatch: any = useContext(LayoutDispatchContext)
  const dataState: any = useContext(DataStateContext)
  const [editPortfolio, setEditPortfolio] = useState<IEditPortfolio>(
    intitialEditPortfolio
  )

  const classes = useStyles()

  useEffect(() => {
    console.log('test')
    if (layoutState.edit === 'update') {
      const currentPortfolio: any = dataState.portfolios.find(
        (p: any) => p.id === dataState.activePortfolio
      )
      setEditPortfolio({
        ...editPortfolio,
        name: currentPortfolio.name,
        exchange: currentPortfolio.exchange,
        currency: currentPortfolio.currency
      })
    } else {
      setEditPortfolio(intitialEditPortfolio)
    }
  }, [layoutState.edit, dataState.activePortfolio])

  const handleChange = (event: any) => {
    setEditPortfolio({
      ...editPortfolio,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  return (
    <form>
      <Grid container spacing={3}>
        <Grid
          item
          xs={5}
          style={{
            paddingTop: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            onClick={() => {
              layoutDispatch({ type: 'setEdit', payload: 'create' })
            }}
            className={clsx(
              layoutState.edit === 'create' && classes.colorCreate
            )}
          >
            Create/Add
          </Button>
        </Grid>
        <Grid
          item
          xs={2}
          style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0 }}
        >
          <AddUpdateSwitch
            checked={layoutState.edit === 'update'}
            onChange={event =>
              layoutDispatch({
                type: 'setEdit',
                payload: event.target.checked ? 'update' : 'create'
              })
            }
            color='primary'
          />
        </Grid>
        <Grid
          item
          xs={5}
          style={{
            paddingTop: 0,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Button
            onClick={() => {
              layoutDispatch({ type: 'setEdit', payload: 'update' })
            }}
            className={clsx(
              layoutState.edit === 'update' && classes.colorUpdate
            )}
          >
            Edit/Update
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            name='name'
            fullWidth
            label='Name'
            autoFocus
            value={editPortfolio.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name='exchange'
            fullWidth
            label='Exchange'
            autoFocus
            value={editPortfolio.exchange}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name='currency'
            fullWidth
            label='Currency'
            autoFocus
            value={editPortfolio.currency}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            size='small'
            variant='contained'
            fullWidth
            className={clsx(
              layoutState.edit === 'create'
                ? classes.backgroundCreate
                : classes.backgroundUpdate
            )}
            // value={newAction ? 'add' : 'update'}
            onClick={() => console.log(JSON.stringify(editPortfolio, null, 2))}
          >
            {layoutState.edit === 'create' ? 'create' : 'update'}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            size='small'
            variant='contained'
            fullWidth
            onClick={(event: any) =>
              layoutState.edit === 'create' &&
              setEditPortfolio(intitialEditPortfolio)
            }
          >
            {layoutState.edit === 'create' ? 'clear' : 'detele'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
