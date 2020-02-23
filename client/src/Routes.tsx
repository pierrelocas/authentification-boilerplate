import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Spinner } from './Spinner'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const SignUp = lazy(() => import('./pages/SignUp'))
const SignIn = lazy(() => import('./pages/SignIn'))
const Bye = lazy(() => import('./pages/Bye'))
const ConfirmEmail = lazy(() => import('./pages/ConfirmEmail'))
const NewPassword = lazy(() => import('./pages/NewPassword'))
const ResendConfirmationEmail = lazy(() =>
  import('./pages/ResendConfirmationEmail')
)
const ResetPassword = lazy(() => import('./pages/ResetPassword'))

interface Props {}
/****
 * TODO: Need to create 404 page
 */
export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/bye' component={Bye} />
          <Route exact path='/confirm-email/:token' component={ConfirmEmail} />
          <Route exact path='/reset-password/:token' component={NewPassword} />
          <Route
            exact
            path='/confirm-email'
            component={ResendConfirmationEmail}
          />
          <Route exact path='/reset-password' component={ResetPassword} />
          <Route path='/' render={() => <div>404</div>} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  )
}
