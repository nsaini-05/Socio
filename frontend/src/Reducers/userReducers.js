import {LOGIN_REQUEST ,
     LOGIN_FAIL,
     LOGIN_SUCCESS ,
     LOAD_USER_REQUEST,
     LOAD_USER_SUCCESS,
     LOAD_USER_FAIL,
     CLEAR_ERRORS
    } from "../constants/UserConstants";

export const authReducers = function(state = {user:{}},action){
    switch(action.type){
        case LOAD_USER_REQUEST:
        case LOGIN_REQUEST:
            return{
                loading: true,
                isAuthenticated : false
            }
        case LOAD_USER_SUCCESS:    
        case LOGIN_SUCCESS:
            return{
                loading :  false,
                isAuthenticated : true,
                user :action.payload
            }
        
        case LOGIN_FAIL:
            return{
                loading : false,
                isAuthenticated : false,
                error : action.payload
            }
        case LOAD_USER_FAIL:
            return{
                loading : false,
                isAuthenticated : false,
                user : null,
                error : action.payload
            }
        case CLEAR_ERRORS:
            return {
                  ...state,
                  error: null,
                }
          
        default:
                return state;
        }
        
}
