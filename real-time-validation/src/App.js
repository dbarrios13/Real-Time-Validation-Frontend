import React from 'react'
import { Route } from 'react-router-dom'
import Login from './components/Login'
import SignUp from './components/SignUp'

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Login} />
      <Route path='/signup' component={SignUp} />
    </div>
  );
}

export default App