import Employee from '../../modals/employee'
export const add_Employee = 'add_Employee'
export const fetch_Employee = 'fetch_Employee'

export const fetchEmployee = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://indextask.firebaseio.com/Employess.json')
            if (!response.ok) {
                throw new Error('something went wrong')
            }
            resData = await response.json()
            const loadedEmployees = []
            for (const key in resData) {
                loadedEmployees.push(
                    new Employee(
                        key,
                        resData[key].name,
                        resData[key].email,
                        resData[key].phone,
                        resData[key].description,
                        resData[key].profileImg
                    )
                )
            }
            dispatch({ type: fetch_Employee, employees: loadedEmployees })
        } catch (err) {

            console.log('here is error', err)
            throw new Error('SomeThing went wrong')
        }
    }
}


export const createEmployee = ({ name, email, phone, description, profileImg }) => {
    return async dispatch => {
        const response = await fetch('https://indextask.firebaseio.com/Employess.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                description,
                profileImg
            })
        })
        const resData = await response.json()

        dispatch({ type: add_Employee, employeeData: { id: resData.name, name, email, phone, description, profileImg } })
    }
}