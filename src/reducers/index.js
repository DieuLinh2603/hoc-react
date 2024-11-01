import loginReducer from "./login";
import {combineReducers} from "redux"
const allReducers = combineReducers({
    loginReducer
})

export default allReducers;