import React, { useContext } from 'react'
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useForm, Controller } from 'react-hook-form'
import { useSignUpMutation } from '../generated/graphql'
import { NotificationContext } from '../NotificationContext'

interface FormData {
  firstname: string
  lastname: string
  email: string
  password: string
  promo: boolean
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
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export const SignUp: React.FC<Props> = ({ history }) => {
  const { setNotification } = useContext(NotificationContext)
  const [SignUp, { loading }] = useSignUpMutation({
    onError: err => {
      setNotification!({
        show: true,
        type: 'error',
        message: err.message.split(':')[1]
      })
    }
  })
  const classes = useStyles()
  const { register, control, handleSubmit, errors } = useForm<FormData>()

  const onSubmit = handleSubmit(
    async ({ firstname, lastname, email, password }) => {
      const response = await SignUp({
        variables: { firstname, lastname, email, password }
      })

      if (response && response.data && response.data.signUp) {
        setNotification!({
          show: true,
          type: 'success',
          message:
            'Account created successfully! An email has been sent to you to confirm your email address.'
        })
        history.push('/signin')
      }
    }
  )

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name='firstname'
                fullWidth
                label='First Name'
                inputRef={register({
                  required: { value: true, message: 'Field is required.' },
                  minLength: { value: 2, message: 'Minimum of 2 characters' }
                })}
                error={!!errors.firstname}
                helperText={errors.firstname && errors.firstname.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Last Name'
                name='lastname'
                inputRef={register({
                  required: { value: true, message: 'Field is required.' },
                  minLength: { value: 2, message: 'Minimum of 2 characters.' }
                })}
                error={!!errors.lastname}
                helperText={errors.lastname && errors.lastname.message}
              />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name='password'
                label='Password'
                type='password'
                inputRef={register({
                  required: { value: true, message: 'Field is required.' },
                  minLength: { value: 4, message: 'Minimum of 4 characters.' }
                })}
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                as={
                  <FormControlLabel
                    control={<Checkbox color='primary' />}
                    label='I want to receive inspiration, marketing promotions and updates via email.'
                  />
                }
                name='promo'
                control={control}
                defaultValue={false}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link variant='body2' component={RouterLink} to='/signin'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  )
}
