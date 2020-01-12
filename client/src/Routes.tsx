import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { Home } from './pages/Home'
import { Bye } from './pages/Bye'
import { Header } from './Header'

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/bye' component={Bye} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
