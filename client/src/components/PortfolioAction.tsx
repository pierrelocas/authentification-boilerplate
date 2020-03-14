import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { DataContext, ActivePortfolioContext } from './Layout'

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
  const data: any = useContext(DataContext)
  const portfolioContext: any = useContext(ActivePortfolioContext)
  const classes = useStyles()

  return (
    <form className={classes.root} autoComplete='off'>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor='portfolio-select'>
          Portfolio
        </InputLabel>
        <Select
          value={portfolioContext.portfolioId || ''}
          input={<Input name='portfolio' id='portfolio-select' />}
          displayEmpty
          name='portfolio'
          className={classes.selectEmpty}
          onChange={event =>
            portfolioContext.setPortfolioId(event.target.value)
          }
        >
          {data.portfolios.map((p: any) => (
            <MenuItem key={p.id} value={p.id}>
              {p.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select the active portfolio</FormHelperText>
      </FormControl>
    </form>
  )
}
