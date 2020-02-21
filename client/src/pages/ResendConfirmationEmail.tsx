import React, { useContext } from 'react'
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useForm } from 'react-hook-form'
import { Container, Theme } from '@material-ui/core'
import { useSendConfirmationEmailMutation } from '../generated/graphql'
import { NotificationContext } from '../App'

type FormData = {
  email: string
  password: string
  remember: boolean
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
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export const ResendConfirmationEmail: React.FC<Props> = ({ history }) => {
  const { setNotification } = useContext(NotificationContext)
  const [sendConfirmationEmail] = useSendConfirmationEmailMutation({
    onError: err => {
      console.log(err)
      setNotification({
        show: true,
        type: 'error',
        message: err.message.split(':')[1]
      })
      console.log(err.message)
      if (err.message.includes('already been confirmed')) {
        history.push('/dashboard')
      }
    }
  })
  const classes = useStyles()
  const { register, handleSubmit, errors } = useForm<FormData>()

  const onSubmit = handleSubmit(async ({ email }) => {
    // console.log(email)
    const response = await sendConfirmationEmail({
      variables: { email }
    })

    if (response && response.data && response.data.sendConfirmationEmail) {
      // console.log('Success')
      setNotification({
        show: true,
        type: 'success',
        message: 'Confirmation link has been sent successfully!'
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
          Resend Confirmation Email
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
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
            Send Confirmation Email
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant='body2' component={RouterLink} to='/'>
                Home
              </Link>
            </Grid>
            <Grid item>
              <Link variant='body2' component={RouterLink} to='/dashboard'>
                Email already confirmed? Go to Dashboard
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
