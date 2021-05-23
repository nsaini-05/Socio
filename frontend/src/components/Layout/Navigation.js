import React from "react";
import styled from "styled-components";
import {logout} from '../../Actions/userActions'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";



const NavStyle = styled.div`
  @import url("http://fonts.cdnfonts.com/css/sofia-pro");

  .parent-div {
    height: 50px;
    background-color: #fdf8f5;
    display: flex;
    justify-content: space-between;
    padding-right: 50px;
    padding-left: 50px;
    position: sticky;
    flex-direction: row;
    align-items: center;
    font-family: "Sofia Pro", sans-serif;
  }

  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-around;

    div {
      margin-right: 20px;
    }

    .profile-pic {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .username {
      font-size: 12px;
      color: #4f4846;
      letter-spacing: 1px;
      font-weight: bold;
      text-transform: uppercase;
    }

    .icon {
      width: 25px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      font-size: 20px;
     
    }

    button {
      background-color: #266150;
      border: none;
      color: white;
      height: 40px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      cursor: pointer;
      border-radius: 10px;
      padding: 10px;
      font-size: 14px;
      font-family: "Sofia Pro", sans-serif;
    }

    
  }
`;





const Nav = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {user} = useSelector((state)=>state.auth);
  
  function submitHandler(event){
    dispatch(logout());   
    alert.success('Logged Out Successfully')
    }


  return (
    <NavStyle>
      <div className="parent-div">
        <div>
          <img src="https://see.fontimg.com/api/renderfont4/RpBEW/eyJyIjoiZnMiLCJoIjoyOCwidyI6MTAwMCwiZnMiOjI4LCJmZ2MiOiIjMDAwMDAwIiwiYmdjIjoiIzgyMDAwMCIsInQiOjF9/U09DSU8/kevin-ghal.png" />
        </div>

        <div className="user-info">
          <div className="sample">
            <img
              className="profile-pic"
              src="https://smartcdn.prod.postmedia.digital/montrealgazette/wp-content/uploads/2016/10/montreal-has-its-own-official-flower-created-in-quebec-in-c.jpeg"
            />
          </div>

          <div>
            <h2 className="username">{user.name}</h2>
          </div>

          <div className="icon">
            <i class="fa fa-bell"></i>
          </div>

          <div>
            <button onClick={submitHandler}>Logout</button>
          </div>
        </div>
      </div>
    </NavStyle>
  );
};

export default Nav;
