import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Spinner } from './Spinner'
import { Layout } from './components/Layout'
import { AuthRoute } from './AuthRoutes'
import Portfolios from './pages/Porfolios'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const SignUp = lazy(() => import('./pages/SignUp'))
const SignIn = lazy(() => import('./pages/SignIn'))
const Bye = lazy(() => import('./pages/Bye'))
const ConfirmEmail = lazy(() => import('./pages/ConfirmEmail'))
const NewPassword = lazy(() => import('./pages/NewPassword'))
const ResetPassword = lazy(() => import('./pages/ResetPassword'))
const ResendConfirmationEmail = lazy(() =>
  import('./pages/ResendConfirmationEmail')
)

interface Props {}
/****
 * TODO: Need to create 404 page
 * Maybe pass down user, portfolios and transactions to Layout and pages
 */
export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <AuthRoute exact path='/dashboard'>
            <Layout title='Dashboard' page='dashboard'>
              <Dashboard />
            </Layout>
          </AuthRoute>
          <AuthRoute path='/portfolios'>
            <Layout title='Portfolios' page='portfolios'>
              <Portfolios />
            </Layout>
          </AuthRoute>
          {/* <AuthRoute
            exact
            path='/positions'
            render={props => (
              <Layout
                title='Positions'
                {...props}
                layoutData={'some other data'}
              >
                <div>Positions</div>
              </Layout>
            )}
          />
          <AuthRoute
            exact
            path='/transactions'
            render={props => (
              <Layout
                title='Transactions'
                {...props}
                layoutData={'some other data'}
              >
                <div>Transactions</div>
              </Layout>
            )}
          />
          <AuthRoute
            exact
            path='/statistics'
            render={props => (
              <Layout
                title='Statistics'
                {...props}
                layoutData={'some other data'}
              >
                <div>Statistics</div>
              </Layout>
            )}
          />
          <AuthRoute
            exact
            path='/profile'
            render={props => (
              <Layout title='Profile' {...props} layoutData={'some other data'}>
                <div>Profile</div>
              </Layout>
            )}
          />
          <AuthRoute
            exact
            path='/market'
            render={props => (
              <Layout title='Market' {...props} layoutData={'some other data'}>
                <div>Market</div>
              </Layout>
            )}
          /> */}
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
