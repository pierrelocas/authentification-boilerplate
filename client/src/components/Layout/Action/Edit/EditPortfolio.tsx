import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import {
  Grid,
  Switch,
  TextField,
  Button,
  withStyles,
  makeStyles,
} from '@material-ui/core'
import { green, orange } from '@material-ui/core/colors'
import { PortfoliosContext } from '../../../../contexts/PortfoliosProvider'
import { GlobalStateContext } from '../../../../contexts/GlobalProvider'
import { NotificationContext } from '../../../../contexts/NotificationProvider'

interface Props {}

interface IStagedPortfolio {
  name: string
  exchange: string
  currency: string
  favorite?: boolean
}

const intitialStagedPortfolio: IStagedPortfolio = {
  name: '',
  exchange: '',
  currency: '',
}

const AddUpdateSwitch = withStyles({
  switchBase: {
    color: green[500],
    '&$checked': {
      color: orange[500],
    },
    '&$checked + $track': {
      backgroundColor: orange[500],
    },
  },
  checked: {},
  track: { backgroundColor: green[500] },
})(Switch)

const useStyles = makeStyles((theme) => ({
  colorCreate: {
    color: green[500],
  },
  colorUpdate: {
    color: orange[500],
  },
  backgroundCreate: {
    backgroundColor: green[500],
    color: 'white',
  },
  backgroundUpdate: {
    backgroundColor: orange[500],
    color: 'white',
  },
  backgroundDelete: {
    backgroundColor: theme.palette.error.dark,
    color: 'white',
  },
}))

export const EditPortfolio: React.FC<Props> = () => {
  const { activePortfolio, setActivePortfolio } = useContext(GlobalStateContext)
  const { portfolios, createPortfolio } = useContext(PortfoliosContext)
  const { setNotification } = useContext(NotificationContext)
  const [editingActivePortfolio, setEditingActivePortfolio] = useState(false)
  const [stagedPortfolio, setStagedPortfolio] = useState<IStagedPortfolio>(
    intitialStagedPortfolio
  )

  const classes = useStyles()

  const handleEditingActivePortfolioChange = (value: boolean) => {
    if (value === editingActivePortfolio) return

    // Create new requested
    if (!value) {
      console.log('new')
      setEditingActivePortfolio(value)
      setStagedPortfolio(intitialStagedPortfolio)
    }
    // Update existing requested
    else {
      setEditingActivePortfolio(true)
      const portfolio = portfolios.find((p) => p.id === activePortfolio)
      console.log(portfolio)
      // const keys: <T, K keyof IStagedPortfolio> = Object.keys(stagedPortfolio)
      // keys.forEach((element) => {
      //   console.log(stagedPortfolio[element])
      // })
    }

    console.log(value)
    console.log(editingActivePortfolio)
  }

  const handleStagedPortfolioChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStagedPortfolio({
      ...stagedPortfolio,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const handleSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    //validate staged data
    console.log('validating input', stagedPortfolio)

    // New portfolio
    if (!editingActivePortfolio) {
      //create a portfolio
      try {
        const result = await createPortfolio!({
          variables: { ...stagedPortfolio },
        })
        //set active portfolio to newly create one
        setActivePortfolio!(result.data?.createPortfolio.id!)
        //set stagedPortfolio to initial value
        setStagedPortfolio(intitialStagedPortfolio)
      } catch (err) {
        // set notification
        setNotification!({
          type: 'error',
          show: true,
          message: 'Failed to create portfoloio, possibly name already exist.',
        })
        console.log(err)
      }
    }

    // Editing existing portfolio
    else if (editingActivePortfolio) {
      // check if there is an active portfolio
      if (!activePortfolio) {
        // set a notification and return
      } else {
      }
    }
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
            justifyContent: 'flex-end',
          }}
        >
          <Button
            onClick={() => handleEditingActivePortfolioChange(false)}
            className={clsx(!editingActivePortfolio && classes.colorCreate)}
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
            checked={editingActivePortfolio}
            onClick={() =>
              handleEditingActivePortfolioChange(!editingActivePortfolio)
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
            alignItems: 'center',
          }}
        >
          <Button
            onClick={() => {
              handleEditingActivePortfolioChange(true)
            }}
            className={clsx(editingActivePortfolio && classes.colorUpdate)}
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
            value={stagedPortfolio.name}
            onChange={(event) => handleStagedPortfolioChange(event)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name='exchange'
            fullWidth
            label='Exchange'
            autoFocus
            value={stagedPortfolio.exchange}
            onChange={(event) => handleStagedPortfolioChange(event)}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name='currency'
            fullWidth
            label='Currency'
            autoFocus
            value={stagedPortfolio.currency}
            onChange={(event) => handleStagedPortfolioChange(event)}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            size='small'
            variant='contained'
            fullWidth
            name={!editingActivePortfolio ? 'create' : 'update'}
            className={clsx(
              !editingActivePortfolio
                ? classes.backgroundCreate
                : classes.backgroundUpdate
            )}
            onClick={(event) => handleSubmit(event)}
          >
            {!editingActivePortfolio ? 'create' : 'update'}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            size='small'
            variant='contained'
            fullWidth
            onClick={(event) => console.log('clear/delete')}
          >
            {editingActivePortfolio ? 'clear' : 'detele'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
