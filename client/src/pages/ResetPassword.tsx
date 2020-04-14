import { Container, Theme } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom'
import { useSendResetPasswordEmailMutation } from '../generated/graphql'
import { NotificationContext } from '../contexts/NotificationProvider'

type FormData = {
  email: string
}

interface Props extends RouteComponentProps {}

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
    marginTop: theme.spacing(1)
  },
  textfield: {
    marginTop: theme.spacing(4)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

const ResetPassword: React.FC<Props> = ({ history }) => {
  const { setNotification } = useContext(NotificationContext)
  const [sendResetPassword] = useSendResetPasswordEmailMutation({
    onError: err => {
      console.log(err)
      setNotification!({
        show: true,
        type: 'error',
        message: err.message.split(':')[1]
      })
    }
  })
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm<FormData>()

  const onSubmit = handleSubmit(async ({ email }) => {
    console.log(email)
    const response = await sendResetPassword({
      variables: { email }
    })
    console.log(email)
    if (response && response.data && response.data.sendResetPasswordEmail) {
      // console.log('Success')
      setNotification!({
        show: true,
        type: 'success',
        message:
          'Please check your emails and follow the procedure to change your email.'
      })
      history.push('/')
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
            className={classes.textfield}
            fullWidth
            label='Email Address'
            name='email'
            inputRef={register({
              required: { value: true, message: 'Field is required.' },
              pattern: {
                value: /.+@.+\..+/,
                message: 'Invalid email.'
              }
            })}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Send Reset Password Email
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

export default ResetPassword
