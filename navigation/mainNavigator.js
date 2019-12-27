

import employeeOverView from '../screens/employeeOverView'
import employeeDetails from '../screens/employeeDetails'
import addEmployee from '../screens/addEmployee'
import Colors from '../constants/Colors'
import adminDrawer from '../screens/adminDrawer'
import rootReducer from '../store/reducers/rootReducer'
import { createStore, applyMiddleware } from 'redux'
import REDUXTHUNK from 'redux-thunk'
import { Provider } from 'react-redux'
import { Navigation } from "react-native-navigation"

const store = createStore(rootReducer, {
  employee: {
    Employees: []
  }
}, applyMiddleware(REDUXTHUNK))

// Navigation.registerComponentWithRedux(`userAuth`, () => userAuth, Provider, store);
Navigation.registerComponentWithRedux(`overView`, () => employeeOverView, Provider, store);
Navigation.registerComponentWithRedux(`Details`, () => employeeDetails, Provider, store);
Navigation.registerComponentWithRedux(`add`, () => addEmployee, Provider, store);
Navigation.registerComponentWithRedux(`admin`, () => adminDrawer, Provider, store);


export const gotoMain = () => {
  Navigation.setRoot({
    root: {
      sideMenu: {
        id: 'main',
        left: {
          component: {
            name: 'admin',
          },
        },
        center: {
          stack: {
            id: 'MainApp',
            children: [{
              component: {
                name: 'overView',
              },
            }],
            options: {
              topBar: {
                background: {
                  color: Colors.primary,
                  translucent: true
                },
                title: {
                  text: 'Home',
                },
              },
            },
          },
        },
      },
    }
  });
}


export const gotoAuth = () => {
  Navigation.setRoot({
    root: {
      component: {
        name: "userAuth"
      }
    }
  });
};
