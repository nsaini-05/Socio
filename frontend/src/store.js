import {createStore , combineReducers , applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import {authReducers} from "./Reducers/userReducers"



let initialState = {
    
}

const reducers = combineReducers({auth : authReducers});
const middleware = [thunk]
const store = createStore(reducers,initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store;
