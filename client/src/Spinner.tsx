import React from 'react'
import { CircularProgress, makeStyles, Theme } from '@material-ui/core'

interface Props {}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  loading: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

export const Spinner: React.FC<Props> = () => {
  const classes = useStyles()
  return (
    <div className={classes.loading}>
      <CircularProgress />
    </div>
  )
}
