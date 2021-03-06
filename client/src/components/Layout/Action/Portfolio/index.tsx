import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { makeStyles } from '@material-ui/core/styles'
import React, { useContext } from 'react'
import { DataDispatchContext, DataStateContext } from '../../../../contexts'
import { GlobalStateContext } from '../../../../contexts/GlobalProvider'
import { PortfoliosContext } from '../../../../contexts/PortfoliosProvider'

const useStyles = makeStyles(theme => ({
  root: {
    flexBasis: '100%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    marginTop: 0,
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    paddingTop: 0,
    flexBasis: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

interface Props {}

export const PortfolioAction: React.FC<Props> = () => {
  const context: any = useContext(PortfoliosContext)
  const globalState: any = useContext(GlobalStateContext)
  const classes = useStyles()

  return (
    <form className={classes.root} autoComplete='off'>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor='portfolio-select'>
          Portfolio
        </InputLabel>
        <Select
          value={globalState.activePortfolio || ''}
          input={<Input name='portfolio' id='portfolio-select' />}
          displayEmpty
          name='portfolio'
          className={classes.selectEmpty}
          onChange={event => globalState.setActivePortfolio(event.target.value)}
        >
          {context.portfolios.map((p: any) => (
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
