import React, { useContext } from 'react'
import {
  useParams,
  RouteComponentProps,
  Link as RouterLink
} from 'react-router-dom'
import { useResetPasswordMutation } from '../generated/graphql'
import {
  Avatar,
  Container,
  Typography,
  TextField,
  CssBaseline,
  Button,
  Grid,
  Link,
  Box,
  makeStyles,
  Theme
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useForm } from 'react-hook-form'
import { NotificationContext } from '../contexts/NotificationProvider'

interface Props extends RouteComponentProps {}

type FormData = {
  password: string
  confirmPassword: string
}

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(8)
  },
  textField: {
    marginTop: theme.spacing(4)
  },
  submit: {
    margin: theme.spacing(5, 0, 2)
  }
}))

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const NewPassword: React.FC<Props> = ({ history }) => {
  const { setNotification } = useContext(NotificationContext)
  const [resetPasswordMutation] = useResetPasswordMutation({
    onError: err => {
      let message = ''
      if (err.message.includes('invalid signature')) {
        message = 'Invalid token, please request another reset password email.'
      }
      setNotification!({
        show: true,
        type: 'error',
        message: message || err.message.split(':')[1]
      })
      history.push('/reset-password')
    }
  })
  const { token } = useParams()
  const classes = useStyles()
  const { register, handleSubmit, errors, setError } = useForm<FormData>()

  const onSubmit = handleSubmit(async ({ password, confirmPassword }) => {
    if (password !== confirmPassword) {
      setError('confirmPassword', 'noMatch', "Password don't match")
      return
    }
    let result
    if (token && password) {
      result = await resetPasswordMutation({ variables: { token, password } })
    }
    if (result && result.data && result.data.resetPassword) {
      setNotification!({
        show: true,
        type: 'success',
        message: 'Password was changed successfully!'
      })
      history.push('/signin')
    }
  })

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Reset Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            fullWidth
            className={classes.textField}
            label='New Password'
            name='password'
            inputRef={register({
              required: { value: true, message: 'Field is required.' },
              minLength: { value: 4, message: 'Minimum of 4 characters.' }
            })}
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
          />
          <TextField
            fullWidth
            className={classes.textField}
            label='Confirm Password'
            name='confirmPassword'
            inputRef={register({
              required: { value: true, message: 'Field is required.' },
              minLength: { value: 4, message: 'Minimum of 4 characters.' }
            })}
            error={!!errors.confirmPassword}
            helperText={
              errors.confirmPassword && errors.confirmPassword.message
            }
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant='body2' component={RouterLink} to='/signin'>
                Sign In
              </Link>
            </Grid>
            <Grid item>
              <Link variant='body2' component={RouterLink} to='/signup'>
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
          <Box mt={5}>
            <Copyright />
          </Box>
        </form>
      </div>
    </Container>
  )
}

export default NewPassword
