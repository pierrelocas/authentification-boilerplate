import React, { useState, useContext } from 'react'
import {
  Grid,
  Switch,
  TextField,
  Button,
  withStyles,
  Typography
} from '@material-ui/core'
import { green, orange } from '@material-ui/core/colors'
import { LayoutStateContext, LayoutDispatchContext } from '../../../../contexts'

interface Props {}

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

export const EditPortfolio: React.FC<Props> = () => {
  const state: any = useContext(LayoutStateContext)
  const dispatch: any = useContext(LayoutDispatchContext)

  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={5}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <Typography>Create/Add</Typography>
      </Grid>
      <Grid item xs={2} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <AddUpdateSwitch
          checked={state.edit === 'update'}
          onChange={event =>
            dispatch({
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
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Typography>Edit/Update</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          name='name'
          fullWidth
          id='name'
          label='Name'
          autoFocus
          value={'Portfolio name here'}
          onChange={() => console.log('changing name ?')}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name='exchange'
          fullWidth
          id='exchange'
          label='Exchange'
          autoFocus
          value={'exchange value here'}
          onChange={() => console.log('changing exchange...')}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          name='currency'
          fullWidth
          id='currency'
          label='Currency'
          autoFocus
          value={'currency here'}
          onChange={() => console.log('currency')}
        />
      </Grid>
      <Grid item xs={6}>
        <Button
          size='small'
          variant='contained'
          fullWidth
          // className={clsx(state.edit === 'create ? classes.btnCreate : classes.btnUpdate)}
          // value={newAction ? 'add' : 'update'}
          // onClick={handleSubmit}
        >
          {/* {newAction ? 'add' : 'update'} */}
          add or update
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button
          size='small'
          variant='contained'
          fullWidth
          // className={clsx(newAction && classes.btnDelete)}
          // value={newAction ? 'clear' : 'delete'}
          // onClick={handleSubmit}
        >
          clear or delete
        </Button>
      </Grid>
    </Grid>
  )
}
