import React from 'react';
import styled from "styled-components";


const LoaderStyle = styled.div`

.parent-div {
    position: relative;
    font-family: sans-serif;
    height: 100vh;
    width : 100%;
    text-align : center;
    color : #1877f2;
  }

  .wrapper{
    position: absolute;
    width : 10rem;
      height : 10rem;  
      top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

  }

  .loading-spinner{
      width : 10rem;
      height : 10rem;  

      display : inline-block;
      border : 10px solid #1877f2;
      border-radius : 50%;
      border-top-color : #fff;
      margin-bottom  : 10 rem;
      animation : 0.s spin infinite ease-in-out;
  }


  @keyframes spin{   
        to {transform:rotate(360deg);}     
  }

`

 const Loader = () => {
    return (
        <LoaderStyle>
            <div className="parent-div">
            <div className="wrapper">
                <div className="loading-spinner">
                </div>

                </div>
            </div>
        </LoaderStyle>


    )
}


export default Loader;