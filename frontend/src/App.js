import React  from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import './style.css'
import Login from './components/User/Login'
import {loadUser} from "./Actions/userActions"
import { useDispatch, useSelector } from "react-redux";

import store from './store'

function App() {

  const dispatch = useDispatch();
  store.dispatch(loadUser());
  return (
    <Router>
    <div>
<Route path = "/" component = {Login} exact />
    </div>
    </Router>
  );
}

export default App;
