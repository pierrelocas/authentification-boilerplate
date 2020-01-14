import React from 'react'
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useForm, Controller } from 'react-hook-form'
import { Container, Theme } from '@material-ui/core'
import { MeQuery, MeDocument, useSignInMutation } from '../generated/graphql'
import { setAccessToken } from '../accessToken'

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

export const SignIn: React.FC<Props> = ({ history }) => {
  const [signIn] = useSignInMutation()
  const classes = useStyles()
  const { register, control, handleSubmit, errors } = useForm<FormData>()

  const onSubmit = handleSubmit(async ({ email, password, remember }) => {
    const { data } = await signIn({
      variables: { email, password },
      update: (store, { data }) => {
        if (!data) {
          return null
        }
        store.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: data.signIn.user
          }
        })
      }
    })
    console.log(email, password, remember)
    if (data && data.signIn) {
      setAccessToken(data.signIn.accessToken)
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
          Sign In
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
          <Controller
            as={
              <FormControlLabel
                control={<Checkbox color='primary' />}
                label='Remember me'
              />
            }
            name='remember'
            control={control}
            defaultValue={false}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
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
