import { combineReducers } from 'redux'
import employeeReducer from '../reducers/employee'
import authReducer from './auth'

const rootReducer = combineReducers({
    employee: employeeReducer,
    auth: authReducer
})


export default rootReducer