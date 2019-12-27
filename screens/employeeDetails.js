import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'


const employeeDetails = props => {

    const employeeId = props.id
    const employee = useSelector(state => state.employee.Employees.find(employee => employee.id === employeeId))

    return (

        <ScrollView style={styles.screen}>
            <View style={styles.imageContainer}>
                <View style={styles.imageHolder}>
                    <Image source={employee.profileImg ? employee.profileImg : require('../assets/user.jpg')} style={styles.image} />
                </View>
            </View>
            <View style={styles.textContainer}>
                <View style={styles.text}><Text style={{ fontSize: 18, fontWeight: 'bold' }} >{employee.name}</Text></View>
                <View style={styles.text}><Text style={{ fontSize: 14, fontWeight: 'bold' }}>{employee.email}</Text></View>
                <View style={styles.text}><Text style={{ fontSize: 12 }} >{employee.phone}</Text></View>
            </View>
            <View style={styles.descriptionContainer}>
                <Text style={{ textAlign: 'center' }}>{employee.description}</Text>
            </View>
        </ScrollView>

    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageHolder: {
        width: 205,
        height: 205,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#ccc',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'

    },
    image: {
        resizeMode: 'stretch',
        width: 205,
        height: 205
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    descriptionContainer: {
        paddingTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    text: {
        padding: 10,

    }
})



export default employeeDetails