import React, {useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import { Navigation } from "react-native-navigation";
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import * as authActions from '../store/actions/authActions'
import { gotoAuth } from '../navigation/mainNavigator'




const adminDrawer = props => {
    const imageUrl = useSelector(state => state.auth.image)
    const userName = useSelector(state => state.auth.name)
    const dispatch = useDispatch()
    const Homenavigator = (componentId) => {
        Navigation.mergeOptions(componentId, {
            sideMenu: {
                left: {
                    visible: false
                }
            }
        });
    }


    useEffect(() => {
        dispatch(authActions.loginedUser())

    }, [dispatch,]);


    return (
        <View style={styles.screen}>
            <View style={styles.imageContainer}>
                <TouchableOpacity style={styles.imageHolder} onPress={() => imageHandler()}>
                    <Image style={styles.image} source={imageUrl ? imageUrl : require('../assets/user.jpg')} />
                </TouchableOpacity>
                <Text>{userName}</Text>
            </View>
            <TouchableOpacity style={styles.Tab} onPress={() => Homenavigator(props.componentId)}>
                <Text style={{ fontSize: 20 }}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.Tab} onPress={() => {
                dispatch(authActions.logOut())
                gotoAuth()

            }} >
                <Text style={{ fontSize: 20 }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'

    },
    imageContainer: {
        width: '100%',
        height: 250,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary
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
        width: 205,
        height: 205,
        resizeMode: 'cover'
    },
    Tab: {
        width: '100%',
        height: 50,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 7,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    }
})

export default adminDrawer