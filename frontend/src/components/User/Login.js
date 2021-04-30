import React,{Fragment,useEffect,useState} from 'react'
import MetaData from '../Layout/MetaData'
import {login ,clearErrors} from "../../Actions/userActions"
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert'
import Loader from '../Layout/Loader'




export const Login = ({history}) => {

    const {isAuthenticated , error , loading} =  useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const alert = useAlert();


    useEffect(() => {        
    if(isAuthenticated){
        history.push('/home')
    }

    if(error){
        if(error!== 'Login to access this resource')
        { alert.error(error);
        dispatch(clearErrors());
        }
        dispatch(clearErrors());
    }

    } , [dispatch , isAuthenticated , error ,history])

    const [email ,setEmail] = useState("");
    const [password , setPassword] = useState("");

    function submitHandler(event){
        event.preventDefault();
        dispatch(login(email,password));        
    }
    return (
        <Fragment>
        {(loading) ? <div className = "parent_div">        
<Loader/> </div> :
        <Fragment>
        <MetaData title = 'Login'/>
        <div className = "parent_div">        
        <div className = "login-form">
        <form>
            <p>Email</p>
            <input type = "email" name="email" placeholder="Email" onChange ={(event)=>setEmail(event.target.value)}  value = {email} required/>
            <p>Password</p>
            <input type = "password" name = 'password' placeholder= "Password" onChange ={(event)=>setPassword(event.target.value)} value = {password} required/>
            <button type = "submit" onClick = {submitHandler}>Login</button>
        </form>
    </div>
    </div>
        </Fragment>
        }
        </Fragment>
    )
}


export default Login;