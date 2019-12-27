import React, { useEffect, useState, useCallback } from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList, Text, ActivityIndicator } from 'react-native'
import { Navigation } from "react-native-navigation";
import Colors from '../constants/Colors'
import EmployeeCard from '../components/employeeCard'
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useSelector, useDispatch } from 'react-redux'
import * as employeeActions from '../store/actions/employeeActions'


const employeeOverView = props => {

  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const Employees = useSelector(state => state.employee.Employees)

  const loadEmployess = useCallback(async () => {
    setIsLoading(true)
    try {
      await dispatch(employeeActions.fetchEmployee())
      setIsLoading(false)
    } catch (err) {
      throw new Error
    }

  }, [dispatch, setIsLoading])
  useEffect(() => {
    loadEmployess()
  }, [loadEmployess])



  const navigationHandler = (screen, itemID) => {
    Navigation.push(props.componentId, {
      component: {
        name: screen,
        passProps: {
          id: itemID
        }

      }
    })
  }
  Promise.all([
    MaterialIcons.getImageSource('menu', 25),
  ]).then(([menuIcon]) => {
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        leftButtons: [{
          id: 'sideMenu',
          icon: menuIcon,
        }],

      }
    });
  })
  if (isLoading) {
    return (
      <View><ActivityIndicator size='large' color={Colors.primary} /></View>
    )
  }

  
  Navigation.events().registerNavigationButtonPressedListener((event) => {
    Navigation.mergeOptions('main', {
      sideMenu: {
        left: {
          visible: true,
        },
      },
    })
  })


  if (!isLoading && Employees.length === 0) {
    return (
      <View style={styles.screen}>
        <View style={styles.centered}><Text>No employees yet , Start add some</Text></View>
        <TouchableOpacity onPress={() => navigationHandler('add')} style={styles.icon}>
          <Icon name="ios-add" size={80} color='white' />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <FlatList data={Employees.reverse()} keyExtractor={item => item.id} renderItem={(itemData) => <EmployeeCard
        name={itemData.item.name} email={itemData.item.email} phone={itemData.item.phone} profileImg={itemData.item.profileImg}
        onPress={() => navigationHandler('Details', itemData.item.id)} />} />

      <TouchableOpacity onPress={() => navigationHandler('add')} style={styles.icon}>
        <Icon name="ios-add" size={80} color='white' />
      </TouchableOpacity>

    </View>

  )
}



const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  icon: {
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: Colors.primary,
    borderRadius: 100,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default employeeOverView







