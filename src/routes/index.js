import React from 'react'
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import Home from '../containers/Home'
import Signin from '../containers/Signin'
import Signup from '../containers/Signup'
import Profile from '../containers/Profile'
import Challenges from '../containers/Challenges'
import ChallengeAbout from '../containers/ChallengeAbout'
import Social from '../containers/Social'
import NotFound from '../containers/NotFound'

const App = ({isLogged}) => {
 return (
  <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/signin' component={Signin}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/profile' component={isLogged ? Profile : Signin}/>
        <Route exact path='/challenges' component={Challenges}/>
        <Route exact path='/challenges/:name/:id' component={ChallengeAbout}/>
        <Route exact path='/social' component={isLogged ? Social : Signin}/>
        <Route component={NotFound}/>
      </Switch>
  </BrowserRouter>
 )
}

export default App