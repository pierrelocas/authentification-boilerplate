import React, { useContext, useEffect, useState } from 'react'
import clsx from 'clsx'
import {
  Grid,
  Switch,
  TextField,
  Button,
  withStyles,
  makeStyles
} from '@material-ui/core'
import { green, orange } from '@material-ui/core/colors'
import { DataStateContext } from '../../../../contexts'
import {
  useCreatePortfolioMutation,
  PortfoliosQuery,
  PortfoliosDocument
} from '../../../../generated/graphql'

interface Props {}

interface IPortfolioStage {
  name: string
  exchange: string
  currency: string
}

const intitialPortfolioStage: IPortfolioStage = {
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
  const dataState: any = useContext(DataStateContext)
  const [editing, setEditing] = useState(false)
  const [portfolioStaging, setPortfolioStaging] = useState<IPortfolioStage>(
    intitialPortfolioStage
  )
  const [createPortfolio] = useCreatePortfolioMutation({
    variables: {
      ...portfolioStaging
    },

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
          portfolios: portfolios.concat([data.createPortfolio])
        }
      })
    }
  })

  const classes = useStyles()

  // useEffect(() => {
  //   if (layoutState.editActionType === 'update') {
  //     const currentPortfolio: any = dataState.portfolios.find(
  //       (p: any) => p.id === dataState.activePortfolio
  //     )
  //     if (!dataState.activePortfolio) {
  //       alert('Select a portfolio to edit')
  //     } else {
  //       setEditPortfolio({
  //         ...editPortfolio,
  //         name: currentPortfolio.name,
  //         exchange: currentPortfolio.exchange,
  //         currency: currentPortfolio.currency,
  //       })
  //     }
  //   } else {
  //     setEditPortfolio(intitialEditPortfolio)
  //   }
  // }, [layoutState.editActionType, dataState.activePortfolio])

  const handleChange = (event: any) => {
    setPortfolioStaging({
      ...portfolioStaging,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }
  const handleSubmit: any = (event: any) => {
    // if (layoutState.editActionType === 'create') {
    //   console.log('create')
    //   createPortfolio()
    // } else if (layoutState.editActionType === 'update') {
    //   console.log('update')
    // }
  }

  const handleEditingType = (editing: boolean) => {
    console.log(editing)
    setEditing(() => {
      if (!editing) {
        setPortfolioStaging(intitialPortfolioStage)
        return false
      }
      if (dataState.activePortfolio) {
        const currentPortfolio: any = dataState.portfolios.find(
          (p: any) => p.id === dataState.activePortfolio
        )
        setPortfolioStaging(currentPortfolio)
        return true
      }
      alert('Please select portfolio to update')
      return false
    })
    // if (action === 'create') {
    //   layoutDispatch({ type: 'setEditActionType', payload: 'create' })
    // } else if (action === 'update') {
    //   if (dataState.activePortfolio) {
    //     layoutDispatch({ type: 'setEditActionType', payload: 'update' })
    //   } else {
    //     // show message to select a portfolio first
    //   }
    // }
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
            onClick={e => {
              console.log(e)
              handleEditingType(false)
            }}
            className={clsx(
              // layoutState.editActionType === 'create' && classes.colorCreate
              !editing && classes.colorCreate
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
            checked={
              editing
              // dataState.activePortfolio &&
              // // layoutState.editActionType === 'update'
            }
            onClick={(event: any) => {
              handleEditingType(event.target.checked)
              // console.log(event.target.checked)
              // setEditing(previous => !previous)
              // handleActionTypeChange(event.target.checked ? 'update' : 'create')
            }}
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
            onClick={e => {
              console.log(e)
              handleEditingType(true)
            }}
            className={clsx(
              editing && classes.colorUpdate
              // layoutState.editActionType === 'update' && classes.colorUpdate
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
            value={portfolioStaging.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name='exchange'
            fullWidth
            label='Exchange'
            autoFocus
            value={portfolioStaging.exchange}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name='currency'
            fullWidth
            label='Currency'
            autoFocus
            value={portfolioStaging.currency}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            size='small'
            variant='contained'
            fullWidth
            className={clsx(
              // layoutState.editActionType === 'create'
              !editing ? classes.backgroundCreate : classes.backgroundUpdate
            )}
            // value={newAction ? 'add' : 'update'}
            onClick={handleSubmit}
          >
            {/* {layoutState.editActionType === 'create' ? 'create' : 'update'} */}
            {editing ? 'create' : 'update'}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            size='small'
            variant='contained'
            fullWidth
            onClick={
              (event: any) => console.log('clear/delete')
              // layoutState.editActionType === 'create' &&
              // !editing && setPortfolioStaging(intitialPortfolioStage)
            }
          >
            {/* {layoutState.editActionType === 'create' ? 'clear' : 'detele'} */}
            {editing ? 'clear' : 'detele'}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}
