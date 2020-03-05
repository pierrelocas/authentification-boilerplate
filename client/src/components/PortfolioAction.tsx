import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import FilledInput from '@material-ui/core/FilledInput'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles(theme => ({
  root: {
    flexBasis: '100%',
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    flexBasis: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}))

interface Props {}

export const PortfolioAction: React.FC<Props> = () => {
  const classes = useStyles()

  return (
    <form className={classes.root} autoComplete='off'>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor='portfolio-select'>
          Portfolio
        </InputLabel>
        <Select
          value='test'
          input={<Input name='portfolio' id='portfolio-select' />}
          displayEmpty
          name='portfolio'
          className={classes.selectEmpty}
        >
          {['test', 'allo', 'salut'].map(p => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select the active portfolio</FormHelperText>
      </FormControl>
    </form>
  )
}
