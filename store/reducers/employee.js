import { add_Employee, fetch_Employee } from '../actions/employeeActions'
import Employee from '../../modals/employee'

const initialState = {
    Employees: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case fetch_Employee:
            return {
                ...state,
                Employees: action.employees
            }
        case add_Employee:
            const newEmployee = new Employee(
                action.employeeData.id,
                action.employeeData.name,
                action.employeeData.email,
                action.employeeData.phone,
                action.employeeData.description,
                action.employeeData.profileImg
            )

            return {
                ...state,
                Employees: state.Employees.concat([newEmployee])
            }
        default:
            return state
    }
}