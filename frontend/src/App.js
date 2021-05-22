import React,{Fragment}  from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import './style.css'
import {loadUser} from "./Actions/userActions"
import { useDispatch, useSelector } from "react-redux";

import store from './store'
import Loader from './components/Layout/Loader'


import Nav from './components/User/Login'
import {Home} from './components/User/Home'

function App() {

  const dispatch = useDispatch();
  store.dispatch(loadUser());
  return (
    <Router>
    <Fragment>
<Route path = "/" component = {Nav} exact />
<Route path = "/home" component = {Loader} exact />

    </Fragment>
    </Router>
  );
}

export default App;
