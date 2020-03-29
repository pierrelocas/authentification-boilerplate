import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import { makeStyles, Theme } from '@material-ui/core/styles'

interface Props {
  open: boolean
  handleClose: any
  type: 'success' | 'info' | 'warning' | 'error' | undefined
  duration: number
  children: React.ReactNode | undefined
}

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

export const Notification: React.FC<Props> = ({
  open,
  handleClose,
  type,
  duration,
  children
}) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {children}
        </Alert>
      </Snackbar>
    </div>
  )
}
