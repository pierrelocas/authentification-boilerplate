import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Home } from './pages/Home'
import { Bye } from './pages/Bye'
import { Header } from './Header'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/signin' component={SignIn} />
          <Route path='/signup' component={SignUp} />
          <Route path='/bye' component={Bye} />
          <Route path='/' render={() => <div>404</div>} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
