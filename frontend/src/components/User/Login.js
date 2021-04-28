import React,{Fragment} from 'react'
import MetaData from '../Layout/MetaData'
export const Login = () => {
    return (
        <Fragment>
        <MetaData title = 'Login'/>
             <div class = "login-form">
        <h1>Welcome back</h1>
        <form action = "#" method = "post">
            <p>Email</p>
            <input type = "email" name="email" placeholder="Email" required/>
            <p>Password</p>
            <input type = "password" name = 'password' placeholder= "password" required/>
            <button type = "submit">Login</button>
        </form>
    </div>
        </Fragment>
    )
}


export default Login;