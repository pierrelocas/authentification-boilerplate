import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { DataStateContext, DataDispatchContext } from '../../../../contexts'

const useStyles = makeStyles((theme) => ({
  root: {
    flexBasis: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    marginTop: 0,
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingTop: 0,
    flexBasis: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

interface Props {}

export const PortfolioAction: React.FC<Props> = () => {
  const dataState: any = useContext(DataStateContext)
  const dataDispatch: any = useContext(DataDispatchContext)
  const classes = useStyles()

  return (
    <form className={classes.root} autoComplete='off'>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor='portfolio-select'>
          Portfolio
        </InputLabel>
        <Select
          value={dataState.activePortfolio || ''}
          input={<Input name='portfolio' id='portfolio-select' />}
          displayEmpty
          name='portfolio'
          className={classes.selectEmpty}
          onChange={(event) =>
            dataDispatch({
              type: 'setActivePortfolio',
              payload: event.target.value,
            })
          }
        >
          {dataState.portfolios.map((p: any) => (
            <MenuItem key={p.id} value={p.id}>
              {p.name}
              <span
                style={{ fontSize: '0.8rem' }}
              >{` - (${p.exchange.toUpperCase()}/${p.currency.toUpperCase()})  `}</span>
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select the active portfolio</FormHelperText>
      </FormControl>
    </form>
  )
}
