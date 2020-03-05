import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Spinner } from './Spinner'
import { Layout } from './components/Layout'
import { AuthRoute } from './AuthRoutes'

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
          <AuthRoute
            exact
            path='/dashboard'
            render={props => (
              <Layout title='Dashboard' {...props}>
                <div>Dashboard</div>
              </Layout>
            )}
          />
          <AuthRoute
            exact
            path='/portfolios'
            render={props => (
              <Layout title='Portfolios' {...props}>
                <div>Portfolios</div>
              </Layout>
            )}
          />
          <AuthRoute
            exact
            path='/positions'
            render={props => (
              <Layout title='Positions' {...props}>
                <div>Positions</div>
              </Layout>
            )}
          />
          <AuthRoute
            exact
            path='/transactions'
            render={props => (
              <Layout title='Transactions' {...props}>
                <div>Transactions</div>
              </Layout>
            )}
          />
          <AuthRoute
            exact
            path='/statistics'
            render={props => (
              <Layout title='Statistics' {...props}>
                <div>Statistics</div>
              </Layout>
            )}
          />
          <AuthRoute
            exact
            path='/profile'
            render={props => (
              <Layout title='Profile' {...props}>
                <div>Profile</div>
              </Layout>
            )}
          />
          <AuthRoute
            exact
            path='/market'
            render={props => (
              <Layout title='Market' {...props}>
                <div>Market</div>
              </Layout>
            )}
          />
          <AuthRoute exact path='/bye' component={Bye} />
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
