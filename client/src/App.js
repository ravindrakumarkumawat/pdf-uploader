import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import './App.css'

import Upload from './components/upload/Upload'
import Home from './pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Header from './components/layout/Header'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/upload" component={Upload} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </BrowserRouter>    
  )
}

export default App;
