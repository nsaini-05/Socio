import React, { useState, useEffect,Fragment } from "react";
import { login } from "../../Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import styled from "styled-components";
import Loader from '../Layout/Loader'

const LoginStyle = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
  .parent-div {
    position: relative;
    font-family: sans-serif;
    height: 100vh;
  }

  form {
    width: 360px;
    position: absolute;
    background-color: #f2f2f2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.1), 0 5px 5px 0 rgba(0, 0, 0, 0.1);
    z-index: 1;
    border-radius: 7px;
  }

  h1 {
    text-align: center;
    font-size: 40px;
    text-transform: uppercase;
  }

  p {
    font-size: 16px;
    margin: 15px 0 5px 0;
  }

  input {
    font-size: 16px;
    width: 100%;
    padding: 15px 10px;
    border: 0;
    outline: 0;
    border-radius: 5px;
    background-color: #ffffff;
    font-weight: 300;
    margin : 10px 0;
      }

  .login {
    width: 100%;
    background-color: #1877f2;
    margin: 20px 0;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 18px;
    color: white;
    font-family: "Poppins", sans-serif;
    border: 0;
    cursor: pointer;
  }

  .signup {
    width: 100%;
    background-color: #36a420;
    margin: 20px 0 20px 0;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 18px;
    color: white;
    font-family: "Poppins", sans-serif;
    border: 0;
    cursor: pointer;
  }
  a {
    font-size: 15px;
    text-align: right;
    text-decoration: none;
    color: blue;
  }
`;

const Login = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, error, loading, user } = useSelector(
    (state) => state.auth
  );

  

  useEffect(() => {

    if (isAuthenticated) {
      history.push("/home");
    }

    if (error) {
      if(error !== "Login to access this resource")
            alert.error(error)
      }
      




    });

  function submitHandler(event) {
    event.preventDefault();
    dispatch(login(email, password));
  }

  return (

<Fragment>
{loading ? <Loader/> : <Fragment>
    <LoginStyle>
      <div className="parent-div">
        <form>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />
          <button type="submit" className="login" onClick={submitHandler}>
            Login
          </button>
          <a href="">Forget Password</a>
          <hr></hr>
          <button type="submit" className="signup">
            Create Account
          </button>
        </form>
      </div>
    </LoginStyle>
    </Fragment> }
    
    </Fragment>
 
  );
};

export default Login;
