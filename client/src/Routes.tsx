import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Bye } from './pages/Bye'
import { Header } from './Header'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { ConfirmEmail } from './pages/ConfirmEmail'
import { NewPassword } from './pages/NewPassword'
import { ResendConfirmationEmail } from './pages/ResendConfirmationEmail'
import { ResetPassword } from './pages/ResetPassword'
import { Dashboard } from './pages/Dashboard'

interface Props {}
/****
 * TODO: Need to create 404 page
 */
export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <>
        <Header />
        {/* {data && data.me && history.push('/dashboard')} */}
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
      </>
    </BrowserRouter>
  )
}
