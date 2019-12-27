import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import Colors from '../constants/Colors'


const EmployeeCard = props => {

    return (
        <TouchableOpacity style={styles.mainContainer} onPress={props.onPress} >
            <View style={styles.imageContainer}>
                <Image source={props.profileImg || require('../assets/user.jpg')} style={{ resizeMode: 'cover', width: "100%", height: "100%" }} />
            </View>
            <View style={styles.dumInfo}>
                <View style={styles.textContainer}><Text style={{ fontWeight: 'bold' }}>name</Text></View>
                <View style={styles.textContainer}><Text style={{ fontWeight: 'bold' }}>E-mail</Text></View>
                <View style={styles.textContainer}><Text style={{ fontWeight: 'bold' }}>Phone</Text></View>
            </View>
            <View style={styles.serInfo} >

                <View style={styles.textContainer}><Text>{props.name}</Text></View>
                <View style={styles.textContainer}><Text>{props.email}</Text></View>
                <View style={styles.textContainer}><Text>{props.phone}</Text></View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        padding: 10,
        flexDirection: 'row',
        height: 120,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    imageContainer: {
        width: 100,
        height: 100,
        marginRight: 20,
        borderColor: Colors.accent,
        borderRadius: 50,
        overflow: 'hidden'
    },
    dumInfo: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        width: '15%'
    },
    textContainer: {
        paddingVertical: 5
    },
    serInfo: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }
})


export default EmployeeCard 