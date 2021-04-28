import React from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import './style.css'
import Login from './components/User/Login'

function App() {
  return (
    <Router>
    <div>
<Route path = "/" component = {Login} exact />
    </div>
    </Router>
  );
}

export default App;
